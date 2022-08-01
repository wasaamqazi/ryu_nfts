import React, { Component } from "react";
import bannerimg from "../assets/imgs/banner.png";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Home = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [count, setCount] = useState(1000);
  // const [shows, setShows] = useState(false);
  // const handleShows = () => setShows(true);
  // const handleCloseS = () => setShows(false);
  const domaindetails = [
    { domain_name: "Ryusurs.avax", price: "0.09 ETH" },
    { domain_name: "Ryusurs.avax", price: "0.09 ETH" },
    { domain_name: "Ryusurs.avax", price: "0.09 ETH" },
    { domain_name: "Ryusurs.avax", price: "0.09 ETH" },
    { domain_name: "Ryusurs.avax", price: "0.09 ETH" },
    { domain_name: "Ryusurs.avax", price: "0.09 ETH" },
    { domain_name: "Ryusurs.avax", price: "0.09 ETH" },
    { domain_name: "Ryusurs.avax", price: "0.09 ETH" },
    { domain_name: "Ryusurs.avax", price: "0.09 ETH" },
    { domain_name: "Ryusurs.avax", price: "0.09 ETH" },
    { domain_name: "Ryusurs.avax", price: "0.09 ETH" },
    { domain_name: "Ryusurs.avax", price: "0.09 ETH" },
  ];

  return (
    <>
      {/* Pop up */}
      <Modal show={show} onHide={handleClose}>
        <div className="popup-wrap">
          <div className="desc-wrapp">
            <h3 className="description-popup">Full Details</h3>
          </div>
          <div className="dpu-wrap">
            <div className="dpu">
              <div className="row">
                <div className="col-sm">
                  <h3 className="domain-name">
                    <span className="domain-name-span">domain name:</span>
                    Ryusaur
                  </h3>
                </div>
                <div className="col-sm">
                  <h3 className="domain-name">
                    <span className="domain-name-span">Price :</span> ETH 0.08
                  </h3>
                </div>
                <div className="col-sm">
                  <h3 className="domain-name">
                    <span className="domain-name-span">URL :</span>
                    www.ryunft.com
                  </h3>
                </div>
              </div>
            </div>
            <div className="dpu second">
              <p className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Tincidunt elit morbi a nec felis consectetur tristique nulla in.
                Velit dolor, quis euismod volutpat, imperdiet mollis. Aliquet
                enim risus nisi, eget. Lacus vitae in commodo ornare ullamcorper
                cras. Tincidunt elit morbi a nec felis consectetur tristique
                nulla in. Velit dolor, quis euismod volutpat.
              </p>
            </div>

            <div className="buy-btn-wrap">
              <button className="buy-btn" onClick={handleClose}>
                Buy
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Header />

      <div id="Hero-section" className="mycontainer">
        <img className="img-fluid banner-img" src={bannerimg} alt="" />

        <div className="texxt-wrapper">
          <div className="for-animations" data-aos="fade-up">
            <h1 className="first-heading">A New Era For Web3 </h1>
            <h2 className="second-heading">Domain Names</h2>
            <div className="rect-par"></div>
            <div className="explorebtn-wrap">
              <a className="Explorebtn" href="#collection">
                Explore
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="full-bg">
        <main id="main">
          <section id="collection" className="cards-section-nfts">
            <div className="container-fluid nopadding">
              <div className="row" data-aos="fade-down">
                <h2 className="main-title">Domain Marketplace</h2>
                <h3 className="main-sub-title">Domains you would love</h3>
              </div>
            </div>

            <div className="card-wrapp">
              <div className="container">
                <div className="row">
                  {domaindetails.length > 0 ? (
                    domaindetails.map((item, index) => {
                      return (
                        <div
                          className="col-sm"
                          data-aos="flip-left"
                          data-aos-duration={count}
                        >
                          <div className="carb-body">
                            <div className="card-upper">
                              <h4 className="tit">{item.domain_name}</h4>
                              <p className="with-bg">{item.price}</p>
                            </div>
                            <div className="card-upper second">
                              <div className="viewd-btn-wrap">
                                <button
                                  className="viewd-btn"
                                  onClick={handleShow}
                                >
                                  Full Details
                                </button>
                              </div>
                              <div className="buy-btn-wrap">
                                <button className="buy-btn">Buy</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};
export default Home;
