import React, { Component, useEffect } from "react";
import bannerimg from "../assets/imgs/banner.png";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const axios = require("axios");

//ENV Variables
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
function isJsonString(str) {
  try {
    JSON.parse(str);
    // console.log(JSON.parse(str))
  } catch (e) {
    return false;
  }
  return true;
}
const Home = (props) => {
  const [domainListArray, updatedomainListArray] = useState([]);

  //calling gateway pinata on page load
  useEffect(async () => {
    updatedomainListArray([]);
    axios
      .get(`https://api.pinata.cloud/data/pinList?status=pinned`, {
        headers: {
          pinata_api_key: key,
          pinata_secret_api_key: secret,
        },
      })
      .then(async function (response) {
        // await console.log(response.data.count);
        // console.log(response.data.rows);
        let domainCIDs = response.data.rows;
        domainCIDs.map(async (e) => {
          let url_pinata = "https://gateway.pinata.cloud/ipfs/";
          url_pinata = url_pinata + e.ipfs_pin_hash;
          console.log(url_pinata);
          axios
            .post("/getDomainList", {
              url: url_pinata,
            })
            .then(async function (response) {
              // await console.log(response.data);
              if (isJsonString(response.data)) {
                updatedomainListArray((existingItems) => {
                  return [...existingItems, JSON.parse(response.data)];
                  // return existingItems.concat([getRandomNumber()]);
                });
                // console.log(domainListArray);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e, data) => {
    console.log(e);
    console.log(data);
    setModalData(data);
    setShow(true);
  };
  const [modalData, setModalData] = useState({
    id: "0",
    name: "",
    price: "",
    description: "",
    url: "",
  });
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
  const showDomainList = () => {
    console.log(domainListArray);
  };
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
                    {modalData.name}
                  </h3>
                </div>
                <div className="col-sm">
                  <h3 className="domain-name">
                    <span className="domain-name-span">Price :</span> AVAX{" "}
                    {modalData.price}
                  </h3>
                </div>
                <div className="col-sm">
                  <h3 className="domain-name">
                    <span className="domain-name-span">URL :</span>
                    {modalData.url}
                  </h3>
                </div>
              </div>
            </div>
            <div className="dpu second">
              <p className="text">{modalData.description}</p>
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
                    domainListArray.map((item, index) => {
                      return (
                        <div
                          className="col-sm"
                          data-aos="flip-left"
                          data-aos-duration={count}
                          id={item.id}
                        >
                          <div className="carb-body">
                            <div className="card-upper">
                              <h4 className="tit">{item.name}</h4>
                              <p className="with-bg">{item.price + " AVAX"}</p>
                            </div>
                            <div className="card-upper second">
                              <div className="viewd-btn-wrap">
                                <button
                                  className="viewd-btn"
                                  onClick={(e) => handleShow(e, item)}
                                >
                                  Full Details
                                </button>
                              </div>
                              <div className="buy-btn-wrap">
                                <button
                                  className="buy-btn"
                                  onClick={showDomainList}
                                >
                                  Buy
                                </button>
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
