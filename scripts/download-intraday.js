const axios = require("axios");
const FormData = require("form-data");

const downloadUrl =
  "https://arquivos.b3.com.br/apinegocios/tickercsv/2020-06-12";
const uploadUrl = "http://ipfs.b3:5001/api/v0/add";

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

async function main() {
  const downStream = await axios({
    method: "GET",
    responseType: "stream",
    url: downloadUrl,
  });

  const formData = new FormData();
  formData.append("file", downStream.data);

  const headers = formData.getHeaders();

  const upStream = await axios({
    method: "post",
    url: uploadUrl,
    headers: headers,
    data: formData,
    maxContentLength: 1000000000,
  }).then((resp) => {
    const filename = resp.data.Name.split("?")[0];
    return { filename, hash: resp.data.Hash };
  });

  await axios({
    method: "post",
    url: `http://ipfs.b3:5001/api/v0/files/cp?arg=%2Fipfs%2F${upStream.hash}&arg=%2Fb3%2Fquotes%2F${upStream.filename}`,
  });
}

main();
