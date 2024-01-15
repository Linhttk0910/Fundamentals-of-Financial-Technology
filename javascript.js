// Generates a random private key that is not shown on the webpage
const privateKey = nimble.PrivateKey.fromRandom();

// From the private key, constructs a corresponding public key, and address
const address = privateKey.toAddress().toString();
const addressLink = 'https://whatsonchain.com/address/' + address;
document.getElementById("publicKey").value = privateKey.toPublicKey().toString();
document.getElementById("address").value = address;
document.getElementById("addressLink").innerHTML = addressLink;

// From the address, generates an associated QR code for receiving money
QRCode.toCanvas(document.getElementById('canvas'), address)
document.getElementById("addressAnchor").href = addressLink;

// Finally, your wallet must also include a link to some live information that calls from an API service, like a cryptocurrency price, and presents this information on your wallet website
balanceUpdate();
exchangeRateUpdate();
setInterval(exchangeRateUpdate, 10000);

function balanceUpdate() {
  axios.get(`https://api.whatsonchain.com/v1/bsv/main/address/${address}/balance`)
    .then(res => {
      document.getElementById("balance").value = res.data.confirmed;
      document.getElementById("balanceTime").innerHTML = new Date().toString();
    })
}

function exchangeRateUpdate() {
  axios.get(`https://api.whatsonchain.com/v1/bsv/main/exchangerate`)
    .then(res => {
      document.getElementById("exchangeRate").value = res.data.rate;
      document.getElementById("exchangeRateTime").innerHTML = new Date().toString();
    })
}
