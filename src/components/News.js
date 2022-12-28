import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 8,
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
  }

  async updateNews(pageNo) {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a1a23064c6c6460184091e5767cf1683&pageSize=${this.props.pageSize}&page=${pageNo}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
      page: pageNo,
    });
  }

  async componentDidMount() {
    await this.updateNews(1);
  }

  handlePrevClick = async () => {
    console.log("Previous");
    if (this.state.page > 1) {
      await this.updateNews(this.state.page - 1);
    }
  };

  handleNextClick = async () => {
    console.log("Next");
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalArticles / this.props.pageSize)
    ) {
      await this.updateNews(this.state.page + 1);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">
          NewsMonkey -{" "}
          {this.props.category[0].toUpperCase() + this.props.category.slice(1)}
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row justify-content-between">
          {!this.state.loading &&
            this.state.articles.map((newsElement) => {
              return (
                <NewsItem
                  key={newsElement.url}
                  url={newsElement.url}
                  title={
                    newsElement.title ? newsElement.title.slice(0, 45) : ""
                  }
                  description={
                    newsElement.description
                      ? newsElement.description.slice(0, 88)
                      : ""
                  }
                  imageUrl={newsElement.urlToImage}
                  author={newsElement.author}
                  publishedAt={newsElement.publishedAt}
                  source={newsElement.source.name}
                />
              );
            })}
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
            disabled={this.state.page <= 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
