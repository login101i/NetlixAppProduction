import "./app.scss";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";

import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";

import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { AuthContext } from "./authContext/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  // const user="roman"

  console.log(user)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/register" />}
          </Route>

          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            <Register />
          </Route>

          {user && (
            <>
              <Route path="/movies">
                <Home type={"movie"} />
              </Route>
              <Route path="/series">
                <Home type={"series"} />
              </Route>
              <Route path="/watch">
                <Watch />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
