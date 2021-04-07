import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Navigation from "./components/Nav";
import Profile from "./components/Profile";
import { GlobalProvider } from "./context/GlobalState";
import useGapi from "./hooks/useGapi";

function App() {
  useGapi(process.env.REACT_APP_GAPI_CLIENT_ID as string);
  return (
    <GlobalProvider>
      <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/register" exact component={Registration} />
            <Route path="/signin" exact component={Login} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
        </Router>
      </div>
    </GlobalProvider>
  );
}

export default App;
