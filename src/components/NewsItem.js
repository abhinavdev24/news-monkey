const NewsItem = (props) => {
  let { title, description, imageUrl, url, author, publishedAt, source } =
    props;
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span
            className="badge rounded-pill bg-danger"
            style={{ left: "90%", zIndex: "1" }}
          >
            {source}
          </span>
        </div>
        {imageUrl && <img src={imageUrl} className="card-img-top" alt="..." />}

        <div className="card-body">
          <h5 className="card-title">{title} ...</h5>
          <p className="card-text">{description} ...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unkown"} on{" "}
              {new Date(publishedAt).toGMTString()}
            </small>
          </p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
