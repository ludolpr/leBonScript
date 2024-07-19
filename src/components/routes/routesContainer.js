import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Admin from "../../pages/Admin/Admin";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import { logout } from "../../pages/Auth/Service";
import { UserProvider } from "../UserContext";

// import { createBrowserHistory } from "history";

// const history = createBrowserHistory();

const routeContainer = () => {
  return (
    // <Router history={history}>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/admin" exact Component={Admin} />
          <Route path="/register" exact Component={Register} />
          <Route path="/login" exact Component={Login} />
          <Route path="/logout" exact Component={logout} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default routeContainer;
