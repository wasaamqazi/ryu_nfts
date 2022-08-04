import React, { useState, useEffect } from "react";
import { pinJSONToIPFS } from "../utils/pinata";
import Footer from "./Footer";
import Header from "./Header";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");

//ENV Variables
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

//List NFT
const Listnft = () => {
  //States
  const [errorMessage, setErrorMessage] = useState("");
  const [domainName, setDomainName] = useState("");
  const [price, setprice] = useState("");
  const [url, seturl] = useState("");
  const [description, setDescription] = useState("");

  const onListForSellClicked = async () => {
    const metadata = new Object();
    const url_pinata = `https://api.pinata.cloud/data/pinList?status=pinned`;

    axios
      .get(url_pinata, {
        headers: {
          pinata_api_key: key,
          pinata_secret_api_key: secret,
        },
      })
      .then(async function (response) {
        await console.log(response.data.count);
        console.log(response.data);
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
        const pinataResponse = await pinJSONToIPFS(metadata);
        if (!pinataResponse) {
          toast.error("🦄 Error! Something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return {
            success: false,
            message: "Something went wrong while uploading your token",
          };
        } else {
          toast.success("🦄 File Uploaded Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // console.log(metadata);
  };
  const test = () => {
    console.log("test");
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
