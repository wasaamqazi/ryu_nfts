import React from "react";
import Footer from "./Footer";
import Header from "./Header";
const Listnft = () => {
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
              <div className="col-sm-3"></div>
              <div className="col-sm-6">
                <div className="upload-txt-wrap" data-aos="zoom-in">
                  <h1 className="first-heading">Welcome to NFT World</h1>
                  <h2 className="second-heading mynfts">Upload NFT</h2>
                  <div className="rect-par"></div>
                </div>
              </div>
              <div className="col-sm-3"></div>
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
                  <input className="text-input" type="text" />
                </div>
              </div>
              <div className="row upload-nft-form justify-content-center row2">
                <div className="col-sm-4">
                  <label htmlFor="" className="upload-nft-label">
                    Price :
                  </label>
                </div>
                <div className="col-sm-8">
                  <input className="text-input" type="text" />
                </div>
              </div>
              <div className="row upload-nft-form justify-content-center row3">
                <div className="col-sm-4">
                  <label htmlFor="" className="upload-nft-label">
                    URL :
                  </label>
                </div>
                <div className="col-sm-8">
                  <input className="text-input" type="text" />
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
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="listforsellwrap">
              <button className="buy-btn listforsellbtn">List For Sell</button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default Listnft;
