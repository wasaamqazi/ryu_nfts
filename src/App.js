import "./App.css";
import Home from "./components/home";
import ErrorBoundary from "./ErrorBoundary";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Mynfts from "./components/Mynfts";
import Listnft from "./components/Listnft";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
const admin_wallet_address = process.env.REACT_APP_ADMIN_WALLET;
function App() {
  const [adminAuth, setAdminAuth] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    setWalletAddress(window.ethereum.selectedAddress);
    if (window.ethereum.selectedAddress.toString().toLowerCase() == admin_wallet_address.toString().toLowerCase()) {
      setAdminAuth(true);
    } else {
      setAdminAuth(false);
    }
  }, [walletAddress]);
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
