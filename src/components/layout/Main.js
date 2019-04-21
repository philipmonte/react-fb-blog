import React from "react";
import Sidebar from "./Sidebar";
import Posts from "../posts/Posts";

export default () => {
  return (
    <main role="main">
      <div className="row">
        <div className="col-md-8 blog-main">
          <Posts />
        </div>
        <aside className="col-md-4 blog-sidebar">
          <Sidebar />
        </aside>
      </div>
    </main>
  );
};
