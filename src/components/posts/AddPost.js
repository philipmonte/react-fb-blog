import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";

class AddPost extends Component {
  state = {
    uid: "",
    title: "",
    description: "",
    author: "",
    dateAdded: ""
  };

  constructor() {
    super();

    const DATE_OPTIONS = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };

    this.state.dateAdded = new Date().toLocaleDateString("en-US", DATE_OPTIONS);
  }

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return {
        uid: auth.uid,
        author: auth.email.substring(0, auth.email.indexOf("@"))
      };
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const newPost = this.state;
    const { firestore, history } = this.props;

    firestore
      .add({ collection: "posts" }, newPost)
      .then(() => history.push("/"));
  };

  setDate = () => {};

  render() {
    const { title, description, author, dateAdded } = this.state;

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
          <hr />
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    className="form-control"
                    name="author"
                    disabled
                    value={author}
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
                    disabled
                    value={dateAdded}
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
                value={title}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                onChange={this.onChange}
                value={description}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AddPost);
