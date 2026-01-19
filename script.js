// SELECT APARTMENT
function selectApartment(apartmentName) {
  document.getElementById("apartment").value = apartmentName;
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
}

// BOOKING FORM
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const apartment = document.getElementById("apartment").value.trim();
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;

    if (!name || !email || !apartment || !checkin || !checkout) {
      alert("❌ Please fill all fields");
      return;
    }

    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);

    if (checkOutDate <= checkInDate) {
      alert("❌ Check-out must be after check-in");
      return;
    }

    const nights =
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

    let pricePerNight = 0;

    if (apartment.includes("3 Bedroom")) pricePerNight = 700;
    if (apartment.includes("2 Bedroom")) pricePerNight = 500;
    if (apartment.includes("1 Bedroom")) pricePerNight = 350;

    const amount = nights * pricePerNight;

    const bookingData = {
      name,
      email,
      apartment,
      checkin,
      checkout,
      nights,
      amount
    };

    sessionStorage.setItem("booking", JSON.stringify(bookingData));

    window.location.href = "payment.html";
  });
});
