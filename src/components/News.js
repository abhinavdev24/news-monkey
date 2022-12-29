import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
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
      totalResults: 0,
    };
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a1a23064c6c6460184091e5767cf1683&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    await this.updateNews();
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
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      await this.updateNews(this.state.page + 1);
    }
  };

  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat(Array.from({ length: 20 })),
    //   });
    // }, 1500);
    // this.setState({ loading: true });
    console.log(
      "============================================================================="
    );
    console.log(`Total Articles = ${this.state.totalResults}`);
    console.log(`Current Page = ${this.state.page}`);
    console.log(`articles[] length= ${this.state.articles.length}`);
    // this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=a1a23064c6c6460184091e5767cf1683&pageSize=${
      this.props.pageSize
    }&page=${this.state.page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: this.state.page + 1,
    });
    console.log(this.state.articles);
    console.log(`Updated Page = ${this.state.page}`);
    console.log(`Updated articles[] length= ${this.state.articles.length}`);
    console.log(
      "============================================================================="
    );
  };

  render() {
    return (
      <>
        <h1 className="text-center my-3">
          NewsMonkey -{" "}
          {this.props.category[0].toUpperCase() + this.props.category.slice(1)}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row justify-content-between">
              {this.state.articles.map((newsElement) => {
                return (
                  <div className="col-md-4" key={newsElement.url}>
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
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
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
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
