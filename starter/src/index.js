import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Search from "./components/SearchBooks";

import "./index.css";

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App/>}/>
      <Route path="/search" element={<Search/>}/>
    </Routes>
  </Router>,
  document.getElementById("root")
);
