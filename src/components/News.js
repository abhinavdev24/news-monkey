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
      page: 1,
      totalResults: 0,
      hasMore: true,
    };
  }

  captitalizeFirst = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2368e5e384949f091edb90079eb7ea5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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
    document.title = `${this.captitalizeFirst(
      this.props.category
    )} - NewsMonkey`;
    await this.updateNews();
  }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=a2368e5e384949f091edb90079eb7ea5&pageSize=${
      this.props.pageSize
    }&page=${this.state.page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    let hasMore =
      this.state.articles.length >= this.state.totalResults ? false : true;
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: this.state.page + 1,
      hasMore: hasMore,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center my-3">
          NewsMonkey - {this.captitalizeFirst(this.props.category)}
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
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
      </>
    );
  }
}

export default News;
