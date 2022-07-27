import "./App.css";
import Home from "./components/home";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Mynfts from "./components/Mynfts";
import Listnft from "./components/Listnft";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/mynfts">
            <Mynfts />
          </Route>
          <Route exact path="/listnft">
            <Listnft />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
