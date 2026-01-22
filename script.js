// Prices per night
const prices = {
  "1 Bedroom Apartment": 350,
  "2 Bedroom Apartment": 500,
  "3 Bedroom Apartment": 700
};

// When Reserve button is clicked
function selectApartment(apartmentName) {
  document.getElementById("apartment").value = apartmentName;

  // Scroll to booking form
  document.getElementById("booking").scrollIntoView({
    behavior: "smooth"
  });
}

// Handle booking form submission
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop page refresh

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const apartment = document.getElementById("apartment").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;

  if (!name || !email || !apartment || !checkin || !checkout) {
    alert("Please fill all fields");
    return;
  }

  const nights =
    (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24);

  if (nights <= 0) {
    alert("Invalid check-in or check-out date");
    return;
  }

  const amount = prices[apartment] * nights;

  // SAVE BOOKING DATA
  const booking = {
    name,
    email,
    apartment,
    nights,
    amount
  };

  sessionStorage.setItem("booking", JSON.stringify(booking));

  // GO TO PAYMENT PAGE
  window.location.href = "payment.html";
});
