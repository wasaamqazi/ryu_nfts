import React, { Component, useEffect } from "react";
import bannerimg from "../assets/imgs/bannerMYNFTs.webp";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { toast } from "react-toastify";
import Web3 from "web3/dist/web3.min.js";

//ABIs
const contractABI = require("../abi/contract-abi.json");
const contractAddress = "0xaca900166845Cb92D93D3C6D808B713A7aC7141b";

const axios = require("axios");

const Mynfts = (props) => {
  //States
  const [userNFTData, setUserNFTData] = useState([]);

  //Clicking on Full Details update modalData variable with its item details...
  const [modalData, setModalData] = useState({
    id: "0",
    name: "",
    price: "",
    description: "",
    url: "",
  });
  const [loadingState, setLoadingState] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e, data) => {
    setModalData(data);
    setShow(true);
  };

  //Function to get user's nfts
  const getData = async () => {
    //Loading Show
    setLoadingState(true);

    //Geting NFTs
    setUserNFTData([]);
    const web3 = new Web3(window.ethereum);
    var nftData = [];
    try {
      window.contract = await new web3.eth.Contract(
        contractABI,
        contractAddress
      );
      const nfts_data = await window.contract.methods
        .Check_TokenID(window.ethereum.selectedAddress)
        .call();
      //loop for fetching tokenIDs
      for (var i = 0; i < nfts_data.length; i++) {
        const url = await window.contract.methods.tokenURI(nfts_data[i]).call();
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        //Settings data
        const temp_data = {
          description: data.description,
          id: data.id,
          image: data.image,
          name: data.name,
          price: data.price,
          url: data.url,
        };
        nftData.push(temp_data);
        setUserNFTData((existingItems) => {
          return [...existingItems, temp_data];
        });
        setLoadingState(false);
      }
    } catch (err) {
      setLoadingState(false);
      toast.error("Something went wrong!", {
        toastId: "error1",
      });
      console.log(err);
    }
  };
  useEffect(async () => {
    getData();
  }, []);

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
                  {" "}
                  <div className="loader-container">
                    {loadingState ? <div className="loader"></div> : <></>}
                  </div>
                  {userNFTData.length > 0 ? (
                    userNFTData.map((item, index) => {
                      return (
                        <div
                          className="col-sm"
                          data-aos="flip-right"
                          data-aos-duration="1000"
                          key={item.id}
                        >
                          <div className="carb-body mynfts-card-body">
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
