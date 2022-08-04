import React, { Component, useEffect } from "react";
import bannerimg from "../assets/imgs/bannerMYNFTs.webp";
import { Modal } from "react-bootstrap";
import { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";

const axios = require("axios");

//ENV Variables
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

const Mynfts = (props) => {
  // Function to collect data

  useEffect(async () => {
    let url_pinata = "https://gateway.pinata.cloud/ipfs/";
    url_pinata = url_pinata + "QmYLnJ5jh4QwAg8zwZ5bQa87YcedgUS3mmdpf3Pufa8CXG";

    axios
      .post("/getDomainList", { url: url_pinata, key: key, secret: secret })
      .then(async function (response) {
        await console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  //calling gateway pinata on page load
  // useEffect(async () => {
  //   console.log("hello");
  //   let url_pinata = "https://gateway.pinata.cloud/ipfs";
  //   url_pinata = url_pinata + "QmYLnJ5jh4QwAg8zwZ5bQa87YcedgUS3mmdpf3Pufa8CXG";
  //   axios
  //     .get(
  //       url_pinata,
  //       { crossdomain: true },
  //       {
  //         headers: {
  //           "Access-Control-Allow-Origin": "*",
  //           pinata_api_key: key,
  //           pinata_secret_api_key: secret,
  //         },
  //       }
  //     )
  //     .then(async function (response) {
  //       await console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      {/* Pop up  */}
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
                Back
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Header />

      <div className="mycontainer">
        <img className="img-fluid banner-img" src={bannerimg} alt="" />

        <div className="texxt-wrapper mynfts">
          <div className="for-animation" data-aos="fade-up">
            <h1 className="first-heading">Welcome To Domain World</h1>
            <h2 className="second-heading">MY Domains</h2>
            <div className="rect-par"></div>
          </div>
        </div>
      </div>

      <div className="full-bg mynfts">
        <main id="main">
          <section className="cards-section-nfts">
            <div className="container-fluid nopadding">
              <div className="row" data-aos="fade-down">
                <h2 className="main-title">MY Domains</h2>
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
                          data-aos="flip-right"
                          data-aos-duration="1000"
                        >
                          <div className="carb-body mynfts-card-body">
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
                              {/* <div className="buy-btn-wrap">
                                <button className="buy-btn">Buy</button>
                              </div> */}
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
export default Mynfts;
