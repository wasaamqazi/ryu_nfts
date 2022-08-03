import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import hambg from "../assets/imgs/hamburger.png";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact";
const Header = (props) => {
  const [status, setStatus] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWalletAddress(address);
    setStatus(status);
  });
  const connectWalletPressed = async () => {
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

                <li className="list-items">
                  <a className="nav-links" href="/listdomain">
                    List Domain
                  </a>
                </li>
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
