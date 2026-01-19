document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get inputs
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const apartment = document.getElementById("apartment").value;
    const checkIn = document.getElementById("checkin").value;
    const checkOut = document.getElementById("checkout").value;

    // Validate basic fields
    if (!name || !email || !apartment) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate dates (mobile safe)
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      alert("Invalid date selection");
      return;
    }

    if (checkOutDate <= checkInDate) {
      alert("Checkout date must be after check-in date");
      return;
    }

    // Calculate nights
    const nights =
      (checkOutDate.getTime() - checkInDate.getTime()) /
      (1000 * 60 * 60 * 24);

    // Apartment pricing (edit anytime)
    const prices = {
      "1 Bedroom Apartment": 350,
      "2 Bedroom Apartment": 500,
      "3 Bedroom Apartment": 700
    };

    const pricePerNight = prices[apartment] || 20000;
    const amount = nights * pricePerNight;

    // Save booking to sessionStorage
    const bookingData = {
      name,
      email,
      apartment,
      checkIn,
      checkOut,
      nights,
      amount
    };

    sessionStorage.setItem("booking", JSON.stringify(bookingData));

    // Go to payment page
    window.location.href = "payment.html";
  });
});

/* ===============================
   Reserve button helper
   =============================== */
function selectApartment(apartmentName) {
  const apartmentSelect = document.getElementById("apartment");
  if (apartmentSelect) {
    apartmentSelect.value = apartmentName;
    apartmentSelect.scrollIntoView({ behavior: "smooth" });
  }
}
