import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const captitalizeFirst = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(60);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${captitalizeFirst(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&pageSize=${
      props.pageSize
    }&page=${page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(page + 1);
    setHasMore(articles.length >= totalResults ? false : true);
  };

  return (
    <>
      <h1 className="text-center my-3">
        NewsMonkey - {captitalizeFirst(props.category)}
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row justify-content-between">
            {articles.map((newsElement) => {
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
};

export default News;

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 8,
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
  setProgress: PropTypes.func,
};
