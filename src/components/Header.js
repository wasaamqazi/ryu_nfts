import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import hambg from "../assets/imgs/hamburger.png";
const Header = () => {
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
                  <a className="nav-links" href="/listnft">
                    Domain
                  </a>
                </li>
                <li className="list-items">
                  <a className="nav-links" href="/mynfts">
                    Domains
                  </a>
                </li>
              </div>
              <li className="connect-wallet">
                <button className="nav-links" href="#">
                  Connect Wallet
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
