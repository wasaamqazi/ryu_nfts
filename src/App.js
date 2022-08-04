import "./App.css";
import Home from "./components/home";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Mynfts from "./components/Mynfts";
import Listnft from "./components/Listnft";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/mydomains">
            <Mynfts />
          </Route>
          <Route exact path="/listdomain">
            <Listnft />
          </Route>
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />  
    </>
  );
}

export default App;
