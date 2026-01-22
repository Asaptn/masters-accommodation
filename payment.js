// ================== GET BOOKING DATA ==================
const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const email = params.get("email");
const apartment = params.get("apartment");
const nights = parseInt(params.get("nights"));

const prices = {
  "1 Bedroom Apartment": 350,
  "2 Bedroom Apartment": 500,
  "3 Bedroom Apartment": 700
};

const pricePerNight = prices[apartment];
const totalAmount = pricePerNight * nights;

// ================== SHOW SUMMARY ==================
document.getElementById("summary").innerHTML = `
Name: ${name}<br>
Email: ${email}<br>
Apartment: ${apartment}<br>
Nights: ${nights}<br>
<strong>Total: $${totalAmount}</strong>
`;

// ================== CARD PAYMENT ==================
document.getElementById("payNow").onclick = function () {
  FlutterwaveCheckout({
    public_key: "FLWPUBK-eedd3e4e11cc685c3c851a3173222836-X",
    tx_ref: "TX-" + Date.now(),
    amount: totalAmount,
    currency: "USD",
    customer: {
      email: email,
      name: name
    },
    callback: function (response) {
      if (response.status === "successful") {
        window.location.href = "success.html";
      }
    }
  });
};

// ================== CRYPTO SETUP ==================
const wallets = {
  USDT: {
    address: "0x5869e8f91ef708af50218699e2573d08DfAF1eA1",
    symbol: "USDT",
    rate: 1
  },
  BTC: {
    address: "bc1qvyzc33xz36c3l47my7hcj92g6cdsr2wet2gjm4",
    symbol: "BTC",
    rate: 65000
  },
  ETH: {
    address: "0x5869e8f91ef708af50218699e2573d08DfAF1eA1",
    symbol: "ETH",
    rate: 3500
  }
};

function updateCrypto() {
  const crypto = document.getElementById("cryptoSelect").value;
  const wallet = wallets[crypto];

  document.getElementById("cryptoWallet").value = wallet.address;

  const amount =
    crypto === "USDT"
      ? totalAmount
      : (totalAmount / wallet.rate).toFixed(6);

  document.getElementById("cryptoAmount").innerText =
    amount + " " + wallet.symbol;
}

updateCrypto();

// ================== SMS CONFIRMATION ==================
function confirmCrypto() {
  const crypto = document.getElementById("cryptoSelect").value;
  const wallet = wallets[crypto];

  const amount =
    crypto === "USDT"
      ? totalAmount
      : (totalAmount / wallet.rate).toFixed(6);

  const ref = "BK-" + Date.now();

  const message = `
Hello Masters Accommodation,

I paid using ${crypto}.

Name: ${name}
Apartment: ${apartment}
Nights: ${nights}
Amount: ${amount} ${wallet.symbol}
Booking Ref: ${ref}

Transaction Hash:
`;

  const phoneNumber = "14434839785"; // YOUR PHONE NUMBER

  const smsURL =
    "sms:" + phoneNumber + "?body=" + encodeURIComponent(message);

  window.location.href = smsURL;
}
