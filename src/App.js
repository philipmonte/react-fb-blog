import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import AppNavbar from "./components/layout/AppNavbar";
import Main from "./components/layout/Main";
import AddPost from "./components/posts/AddPost";
import UserPosts from "./components/posts/UserPosts";

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
                <Route exact path="/posts/add" component={AddPost} />
                <Route exact path="/posts/:user" component={UserPosts} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
