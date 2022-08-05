import React, { useState, useEffect } from "react";
import { pinJSONToIPFS } from "../utils/pinata";
import Footer from "./Footer";
import Header from "./Header";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");

//ENV Variables
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

//List NFT
const Listnft = () => {
  const history = useHistory();

  //States
  const [loadingState, setLoadingState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [domainName, setDomainName] = useState("");
  const [price, setprice] = useState("");
  const [url, seturl] = useState("");
  const [description, setDescription] = useState("");

  //Checking for validation if form fields are properly filled or not....
  function checkValidation() {
    if (
      domainName == "" ||
      domainName == null ||
      domainName == " " ||
      domainName == undefined
    ) {
      return false;
    } else if (
      price == "" ||
      price == null ||
      price == " " ||
      price == undefined
    ) {
      return false;
    } else if (url == "" || url == null || url == " " || url == undefined) {
      return false;
    } else if (
      description == "" ||
      description == null ||
      description == " " ||
      description == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  //List for Sell Pressed
  const onListForSellClicked = async () => {
    if (loadingState) {
      toast.info("🦄 Please Wait!", {
        toastId: "info1",
      });
    } else {
      if (checkValidation() == false) {
        toast.error(" All fields are mandatory and must be valid!", {
          toastId: "errorValidation",
        });
      } else {
        const metadata = new Object();
        const url_pinata = `https://api.pinata.cloud/data/pinList?status=pinned`;
        setLoadingState(true);

        //Getting total counts of previoulsy listed nfts
        axios
          .get(url_pinata, {
            headers: {
              pinata_api_key: key,
              pinata_secret_api_key: secret,
            },
          })
          .then(async function (response) {
            //Creating new metadata to be saved in ipfs in JSON format
            metadata.pinataMetadata = {
              name: response.data.count + 1 + ".json",
            };
            metadata.pinataContent = {
              id: response.data.count + 1,
              name: domainName,
              price: price,
              url: url,
              image: "",
              description: description,
            };

            //Saving listed NFT to pinata
            const pinataResponse = await pinJSONToIPFS(metadata);

            //on error
            if (!pinataResponse) {
              setLoadingState(false);
              toast.error("🦄 Error! Something went wrong");
              return {
                success: false,
                message: "Something went wrong while uploading your token",
              };
            } else {
              //Successfully uploaded to ipfs
              setLoadingState(false);
              toast.success("🦄 File Uploaded Successfully!");
              history.push("/");
            }
          })
          .catch(function (error) {
            //Error
            setLoadingState(false);
            toast.error("🦄 Error! Something went wrong");
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      <Header />
      <div className="second-back">
        <section>
          <div className="container">
            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col-sm-8">
                <div className="upload-txt-wrap" data-aos="zoom-in">
                  <h1 className="first-heading">Welcome to Domain World</h1>
                  <h2 className="second-heading mynfts">Upload Domain</h2>
                  <div className="rect-par"></div>
                </div>
              </div>
              <div className="col-sm-2"></div>
            </div>
          </div>
        </section>
        <section className="uploadnft-sect">
          <div className="container">
            <div className="uploadnftbg">
              <div className="row upload-nft-form justify-content-center row1">
                <div className="col-sm-4">
                  <label htmlFor="" className="upload-nft-label">
                    Domain Name :
                  </label>
                </div>
                <div className="col-sm-8">
                  <input
                    className="text-input"
                    type="text"
                    onChange={(e) => {
                      setDomainName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row upload-nft-form justify-content-center row2">
                <div className="col-sm-4">
                  <label htmlFor="" className="upload-nft-label">
                    Price :
                  </label>
                </div>
                <div className="col-sm-8">
                  <input
                    className="text-input"
                    type="text"
                    pattern="^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$"
                    id="price"
                    value={price}
                    onChange={(e) => {
                      setprice((p) =>
                        e.target.validity.valid ? e.target.value : p
                      );
                    }}
                  />
                </div>
              </div>
              <div className="row upload-nft-form justify-content-center row3">
                <div className="loader-container">
                  {loadingState ? <div className="loader"></div> : <></>}
                </div>
                <div className="col-sm-4">
                  <label htmlFor="" className="upload-nft-label">
                    URL :
                  </label>
                </div>
                <div className="col-sm-8">
                  <input
                    className="text-input"
                    type="text"
                    id="url"
                    onChange={(e) => {
                      seturl(e.target.value);
                      if (validator.isURL(e.target.value)) {
                        setErrorMessage("Is Valid URL");
                      } else {
                        setErrorMessage("Is Not Valid URL");
                      }
                    }}
                  />{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      color: validator.isURL(url) ? "green" : "red",
                    }}
                  >
                    {errorMessage}
                  </span>
                </div>
              </div>
              <div className="row upload-nft-form justify-content-center row4">
                <div className="description-text-area-wrap">
                  <label className="upload-nft-label" htmlFor="">
                    Description
                  </label>
                  <textarea
                    className="descriptiontext-area"
                    name="description"
                    rows="7"
                    id="description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="listforsellwrap">
              <button
                className="buy-btn listforsellbtn"
                onClick={onListForSellClicked}
              >
                List For Sell
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default Listnft;
