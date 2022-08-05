// const key = process.env.REACT_APP_PINATA_KEY;
// const secret = process.env.REACT_APP_PINATA_SECRET;

const key = "2b0109d7bec55ce6703a";
const secret = "c0747691dff26870caf2b45d64282a1d0bf35f66d224c3ed0bd32da2491e004f";

const axios = require("axios");

export const pinJSONToIPFS = async (JSONBody) => {
  console.log(JSONBody);
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data)
  //     );
  //axios POST Request to pinata
  //   return axios
  //     .post("/api", JSONBody)
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  var data = {
    hashToPin: "QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn",
    name: JSONBody.name,
    pinataMetadata: {
      name: "MyCustomName",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
  };
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //axios POST Request to pinata
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      console.log(response);
      console.log(response.data.IpfsHash);
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
