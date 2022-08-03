import { pinJSONToIPFS } from "./pinata.js";

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(alchemyKey);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={"https://metamask.io/download.html"}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "Write a message",
        };
      } else {
        return {
          address: "",
          status: "Connect to Metamask using the top right button",
        };
      }
    } catch (error) {
      return { address: "", status: error.message };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            <a target="_blank" href={"https://metamask.io/download.html"}></a>
            You must install metamask, a virtual Ethereum wallet in your browser
          </p>
        </span>
      ),
    };
  }
};
