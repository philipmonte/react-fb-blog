import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class UserPosts extends Component {
  render() {
    const { posts } = this.props;

    if (posts) {
      return (
        <div>
          <div className="col-md-8 mx-auto">
            <div className="row">
              <div className="col-md-6">
                <h3 className="font-italic  ">My Posts</h3>
              </div>
              <div className="col-md-6">
                <div className="btn-group float-right">
                  <Link to="/posts/add" className="btn btn-success">
                    <i className="fas fa-plus-circle" /> New
                  </Link>
                </div>
              </div>
            </div>
            <hr />
            <table className="table table-striped">
              <thead className="thead-inverse">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>
                      <Link
                        to={`/posts/${post.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        <i className="fas fa-pencil-alt" />
                      </Link>
                      <button className="btn btn-danger-sm">
                        <i className="fas fa-times" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

UserPosts.propTypes = {
  firestore: PropTypes.object.isRequired,
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
)(UserPosts);
