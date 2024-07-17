import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Admin from "../../pages/Admin/Admin";

// import { createBrowserHistory } from "history";

// const history = createBrowserHistory();

const routeContainer = () => {
  return (
    // <Router history={history}>
    <Router>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/admin" exact Component={Admin} />
      </Routes>
    </Router>
  );
};

export default routeContainer;
