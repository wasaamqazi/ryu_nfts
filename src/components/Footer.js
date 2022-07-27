import React from "react";
import logo from "../assets/imgs/logo.png";
import v1 from "../assets/imgs/footer-icons/v1.png";
import v2 from "../assets/imgs/footer-icons/v2.png";
import v3 from "../assets/imgs/footer-icons/v3.png";
import v4 from "../assets/imgs/footer-icons/v4.png";

const Footer = () => {
  return (
    <footer>
      <div className="container" data-aos="zoom-in">
        <div className="row align-items-center">
          <div className="col-xl-5 col-lg-5 ">
            <img className="footerlogo" src={logo} alt="" />
          </div>
          <div className="col-xl-4 col-lg-4">
            <h3 className="website-link">
              <a
                className="web-link"
                href="https://www.ryunft.com"
                target="_blank"
              >
                www.ryunft.com
              </a>
            </h3>
          </div>
          <div className="col-xl-3 col-lg-3">
            <div className="social-wrap">
              <a className="single-social-link" href="#" target="_blank">
                <img className="single-social" src={v1} alt="" />
              </a>
              <a className="single-social-link" href="#" target="_blank">
                <img className="single-social" src={v2} alt="" />
              </a>
              <a
                className="single-social-link"
                href="https://twitter.com/RyuNFT"
                target="_blank"
              >
                <img className="single-social" src={v3} alt="" />
              </a>
              <a
                className="single-social-link"
                href="https://www.discord.gg/TqwtdcCTdz"
                target="_blank"
              >
                <img className="single-social" src={v4} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
