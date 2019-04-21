import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";

import { Provider } from "react-redux";
import store from "./store";

import AppNavbar from "./components/layout/AppNavbar";
import Main from "./components/layout/Main";
import AddPost from "./components/posts/AddPost";
import UserPosts from "./components/posts/UserPosts";
import EditPost from "./components/posts/EditPost";
import Login from "./components/auth/Login";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Main} />
                <Route
                  exact
                  path="/posts/add"
                  component={UserIsAuthenticated(AddPost)}
                />
                <Route
                  exact
                  path="/posts"
                  component={UserIsAuthenticated(UserPosts)}
                />
                <Route
                  exact
                  path="/posts/edit/:id"
                  component={UserIsAuthenticated(EditPost)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
