import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";

class AddPost extends Component {
  state = {
    title: "",
    description: "",
    author: "",
    dateAdded: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const newPost = this.state;
    const { firestore, history } = this.props;

    firestore
      .add({ collection: "posts" }, newPost)
      .then(() => history.push("/"));
  };

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
                    onChange={this.onChange}
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
                    onChange={this.onChange}
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

export default firestoreConnect()(AddPost);
