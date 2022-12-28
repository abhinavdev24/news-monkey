import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a1a23064c6c6460184091e5767cf1683&pageSize=20&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
    });
  }

  handlePrevClick = async () => {
    console.log("Previous");
    if (this.state.page > 1) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a1a23064c6c6460184091e5767cf1683&pageSize=20&page=${
        this.state.page - 1
      }`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
      });
    }
  };

  handleNextClick = async () => {
    console.log("Next");
    if (this.state.page + 1 <= Math.ceil(this.state.totalArticles / 20)) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a1a23064c6c6460184091e5767cf1683&pageSize=20&page=${
        this.state.page + 1
      }`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        <div className="row justify-content-between">
          {this.state.articles.map((newsElement) => {
            return (
              <NewsItem
                key={newsElement.url}
                url={newsElement.url}
                title={newsElement.title ? newsElement.title.slice(0, 45) : ""}
                description={
                  newsElement.description
                    ? newsElement.description.slice(0, 88)
                    : ""
                }
                imageUrl={newsElement.urlToImage}
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
              this.state.page + 1 > Math.ceil(this.state.totalArticles / 20)
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
