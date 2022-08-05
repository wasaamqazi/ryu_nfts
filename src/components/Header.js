import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import hambg from "../assets/imgs/hamburger.png";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = (props) => {
  //States
  const [adminAuth, setAdminAuth] = useState(false);
  const [status, setStatus] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  //Checking Selected Address....
  useEffect(() => {
    if (
      window.ethereum.selectedAddress ==
      "0x2ed9cbb06ef4289dacded6f00f72a58b12f6bee7"
    ) {
      setAdminAuth(true);
    } else {
      setAdminAuth(false);
    }
  }, [walletAddress]);

  //On Metamask Wallet Connection...
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWalletAddress("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
        window.location.reload();
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  //On Metamask Account Changed....
  function addAccountChangedListener() {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (_chainId) => {
        window.location.reload();
        if (_chainId === "0xa869") {
        } else {
          toast.error("Please connect to Avalanche test network", {
            toastId: "error1",
          });
        }
      });
    } else {
      toast.error(
        "You must install Metamask, a virtual Ethereum wallet, in your browser."
      );
    }
  }

  //Checking Current Connected Wallet Chain ID....
  useEffect(async () => {
    if (window.ethereum.chainId === "0xa869") {
      const { address, status } = await getCurrentWalletConnected();
      setWalletAddress(address);
      setStatus(status);
    } else {
      setWalletAddress("");
    }
    addAccountChangedListener();
    addWalletListener();
  });

  //On Connect Wallet Pressed...
  const connectWalletPressed = async () => {
    if (window.ethereum.chainId === "0xa869") {
    } else {
      toast.error("Please connect to Avalanche test network", {
        toastId: "error1",
      });
    }
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  };
  const handleHamburger = () => {
    document.getElementById("navigation-ham").classList.toggle("mystyle");
  };
  return (
    <header className="main-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            <a href="/">
              <img className="logo" src={logo} alt="" />
            </a>
          </div>
          <div className="col-sm-10">
            <ul id="navigation-ham" className="navigation">
              <div className="all-list-items">
                <li className="list-items">
                  <a className="nav-links" href="/">
                    Marketplace
                  </a>
                </li>
                {adminAuth ? (
                  <li className="list-items">
                    <a className="nav-links" href="/listdomain">
                      List Domain
                    </a>
                  </li>
                ) : (
                  <></>
                )}
                <li className="list-items">
                  <a className="nav-links" href="/mydomains">
                    My Domains
                  </a>
                </li>
              </div>
              <li className="connect-wallet">
                <button
                  className="nav-links"
                  href="#"
                  id="connectWallet"
                  onClick={connectWalletPressed}
                >
                  {walletAddress.length > 0 ? (
                    "Connected: " +
                    String(walletAddress).substring(0, 6) +
                    "..." +
                    String(walletAddress).substring(38)
                  ) : (
                    <span>Connect Wallet</span>
                  )}
                </button>
              </li>
            </ul>
          </div>

          <img
            className="hambg"
            src={hambg}
            alt=""
            onClick={() => handleHamburger()}
          />
        </div>
      </div>
    </header>
  );
};
export default Header;
