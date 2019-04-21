import React from "react";

export default props => {
  const { title, description, author, dateAdded } = props.post;
  return (
    <div>
      <div className="blog-post">
        <h2 className="blog-post-title">{title}</h2>
        <p className="blog-post-meta">
          {dateAdded} by <a href="#">{author}</a>
        </p>

        <p>{description}</p>
        <hr />
      </div>
    </div>
  );
};
