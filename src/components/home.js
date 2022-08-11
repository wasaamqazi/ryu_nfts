import React, { Component, useEffect } from "react";
import { useHistory } from "react-router-dom";
import bannerimg from "../assets/imgs/banner.png";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { mintNFT } from "../utils/interact.js";
import { toast } from "react-toastify";
import MultiRangeSlider from "multi-range-slider-react";

const axios = require("axios");

//ENV Variables
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

//Checking if string is in JSON format or Not...
function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

//Home Component
const Home = (props) => {
  const history = useHistory();
  const [loadingState, setLoadingState] = useState(false);
  const [domainListArray, updatedomainListArray] = useState([]);
  //Clicking on Full Details update modalData variable with its item details...
  const [modalData, setModalData] = useState({
    id: "0",
    name: "",
    price: "",
    description: "",
    url: "",
  });
  const [count, setCount] = useState(1000);
  const [searchField, setSearchField] = useState("");
  const [searchPattern, setSearchPattern] = useState("(.*?)");
  const [filteredArray, setFilteredArray] = useState([]);
  const [minValue, set_minValue] = useState(0.0001);
  const [maxValue, set_maxValue] = useState(100);
  //calling gateway pinata on page load
  useEffect(async () => {
    // //Getting NFTs from ipfs for marketplace
    setLoadingState(true);
    await getData();
  }, []);
  useEffect(async () => {
    setFilteredArray(domainListArray);
  }, [domainListArray]);
  //GetData
  const getData = async () => {
    
    axios
      .get(`https://api.pinata.cloud/data/pinList?status=pinned`, {
        headers: {
          pinata_api_key: key,
          pinata_secret_api_key: secret,
        },
      })
      .then(async function (response) {
        //NFTs received...
        let domainCIDs = response.data.rows;
        domainCIDs.map(async (e) => {
          let url_pinata = "https://gateway.pinata.cloud/ipfs/";
          url_pinata = url_pinata + e.ipfs_pin_hash;
          const response = await fetch(url_pinata);
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
          setLoadingState(false);

          const data = await response.json();
          data.ipfsHash =
            "https://gateway.pinata.cloud/ipfs/" + e.ipfs_pin_hash;

          //Setting data into data state
          updatedomainListArray((existingItems) => {
            return [...existingItems, data];
          });

          //Node Server Logic ( Currently not being used).....
          // axios
          //   .post("/getDomainList", {
          //     url: url_pinata,
          //   })
          //   .then(async function (response) {
          //     if (isJsonString(response.data)) {
          //       //Mapping NFTs to cards...
          //       let responseJson = await JSON.parse(response.data);
          //       responseJson.ipfsHash =
          //         "https://gateway.pinata.cloud/ipfs/" + e.ipfs_pin_hash;
          //       updatedomainListArray((existingItems) => {
          //         return [...existingItems, responseJson];
          //       });
          //     }
          //     setLoadingState(false);
          //   })
          //   .catch(function (error) {
          //     //On error...
          //     setLoadingState(false);
          //     toast.error("Something went wrong!", {
          //       toastId: "error1",
          //     });
          //     console.log(error);
          //   });
        });
      })
      .catch(function (error) {
        //On error...
        setLoadingState(false);
        toast.error("Something went wrong!", {
          toastId: "error1",
        });
        console.log(error);
      });
  };

  const [status, setStatus] = useState("");

  //Buy and Mint button clicked...
  const buyAndMint = async (e, data) => {
    const { status } = await mintNFT(data.ipfsHash, data.price);
    await this.timeout(1000);
    history.push("/mydomains");
    setStatus(status);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //Show full details modal...
  const handleShow = (e, data) => {
    setModalData(data);
    setShow(true);
  };
  // Triggered when the value gets updated while scrolling the slider:

  const multiRangeHandleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  const filterDataWithName = async (searchField) => {
    if (loadingState) {
      toast.info("🦄 Please Wait!", {
        toastId: "info1",
      });
    } else {
      setFilteredArray(
        await domainListArray.filter((obj) => {
          return (
            obj.name.includes(searchField.toString().toLowerCase()) &&
            obj.price >= minValue &&
            obj.price <= maxValue
          );
        })
      );
    }
  };
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await filterDataWithName(searchField);
    }
  };

  //Return Function
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
              <button
                className="buy-btn"
                onClick={(e) => buyAndMint(e, modalData)}
              >
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
                  {" "}
                  {/* Filter  */}
                  <div className="col-sm customSearchDiv">
                    <input
                      placeholder="Search"
                      className="text-input searchFilterContents customSearchBar"
                      type="text"
                      pattern={searchPattern}
                      value={searchField}
                      onKeyDown={handleKeyPress}
                      onChange={(e) => {
                        setSearchField((p) =>
                          e.target.validity.valid ? e.target.value : p
                        );
                      }}
                    />
                    {/* Price Range */}
                    <MultiRangeSlider
                      baseClassName="multi-range-slider customMultiRange searchFilterContents"
                      min={0.0001}
                      max={100}
                      step={0.001}
                      ruler={false}
                      label={true}
                      preventWheel={false}
                      minValue={minValue}
                      maxValue={maxValue}
                      onInput={(e) => {
                        multiRangeHandleInput(e);
                      }}
                    />
                    <label className="customLabel searchFilterContents">
                      Min Price:
                    </label>
                    <input
                      className="text-input searchFilterContents minAndMax"
                      type="text"
                      pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
                      value={minValue}
                      onChange={(e) => {
                        set_minValue((p) =>
                          e.target.validity.valid ? e.target.value : p
                        );
                      }}
                    />{" "}
                    <label className="customLabel searchFilterContents">
                      Max Price:
                    </label>
                    <input
                      className="text-input searchFilterContents minAndMax"
                      type="text"
                      pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
                      value={maxValue}
                      onChange={(e) => {
                        set_maxValue((p) =>
                          e.target.validity.valid ? e.target.value : p
                        );
                      }}
                    />
                    <button
                      className="buy-btn searchFilterContents customSearchBtn"
                      onClick={(e) => filterDataWithName(searchField)}
                    >
                      Search
                    </button>
                  </div>
                  <div className="loader-container">
                    {loadingState ? <div className="loader"></div> : <></>}
                  </div>
                  {filteredArray.length > 0 ? (
                    filteredArray.map((item, index) => {
                      return (
                        <div
                          className="col-sm"
                          data-aos="flip-left"
                          data-aos-duration={count}
                          key={index}
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
                                  onClick={(e) => buyAndMint(e, item)}
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
                    <div>
                      <h3 className="main-sub-title">NO DOMAINS LISTED</h3>
                    </div>
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
