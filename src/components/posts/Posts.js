import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Post from "./Post";
import Spinner from "../layout/Spinner";

class Posts extends Component {
  render() {
    const { posts } = this.props;

    if (posts) {
      return (
        <React.Fragment>
          <h3 className="pb-3 mb-4 font-italic border-bottom">Posts</h3>
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};

export default compose(
  firestoreConnect([
    {
      collection: "posts"
    }
  ]),
  connect((state, props) => ({
    posts: state.firestore.ordered.posts
  }))
)(Posts);
