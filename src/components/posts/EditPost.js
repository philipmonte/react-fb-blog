import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class EditPost extends Component {
  constructor() {
    super();

    this.authorInput = React.createRef();
    this.dateAddedInput = React.createRef();
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const postUpdate = {
      author: this.authorInput.current.value,
      dateAdded: this.dateAddedInput.current.value,
      title: this.titleInput.current.value,
      description: this.descriptionInput.current.value
    };

    const { history, firestore } = this.props;

    firestore
      .update(
        {
          collection: "posts",
          doc: this.props.match.params.id
        },
        postUpdate
      )
      .then(history.push("/"));
  };

  render() {
    const { post } = this.props;

    if (post) {
      const { title, description, author, dateAdded } = post;
      return (
        <div>
          <div className="col-md-8 mx-auto">
            <div className="row">
              <div className="col-md-6">
                <h3 className="font-italic  ">Add New Post</h3>
              </div>
              <div className="col-md-6">
                <div className="btn-group float-right">
                  <button onClick={this.onSubmit} className="btn btn-success">
                    Save
                  </button>
                </div>
              </div>
            </div>

            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Author</label>
                    <input
                      type="text"
                      className="form-control"
                      name="author"
                      onChange={this.onChange}
                      defaultValue={author}
                      ref={this.authorInput}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="text"
                      className="form-control"
                      name="dateAdded"
                      onChange={this.onChange}
                      defaultValue={dateAdded}
                      ref={this.dateAddedInput}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={this.onChange}
                  defaultValue={title}
                  ref={this.titleInput}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  onChange={this.onChange}
                  defaultValue={description}
                  ref={this.descriptionInput}
                />
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditPost.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "posts",
      storeAs: "post",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }) => ({
    post: ordered.post && ordered.post[0]
  }))
)(EditPost);
