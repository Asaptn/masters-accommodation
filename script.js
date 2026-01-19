document.addEventListener("DOMContentLoaded", () => {

  // ✅ Apartment select from Reserve button
  window.selectApartment = function (apartmentName) {
    const apartmentInput = document.getElementById("apartment");
    if (!apartmentInput) return;

    apartmentInput.value = apartmentName;
    apartmentInput.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Booking form
  const form = document.getElementById("bookingForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const apartmentInput = document.getElementById("apartment");
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");

    if (
      !nameInput ||
      !emailInput ||
      !apartmentInput ||
      !checkinInput ||
      !checkoutInput
    ) {
      alert("Form error: missing fields");
      return;
    }

    if (
      !nameInput.value ||
      !emailInput.value ||
      !apartmentInput.value ||
      !checkinInput.value ||
      !checkoutInput.value
    ) {
      alert("Please fill all fields");
      return;
    }

    const checkin = new Date(checkinInput.value);
    const checkout = new Date(checkoutInput.value);

    if (checkout <= checkin) {
      alert("Checkout must be after check-in");
      return;
    }

    const nights = Math.ceil(
      (checkout - checkin) / (1000 * 60 * 60 * 24)
    );

    // ✅ Redirect to payment page
    window.location.href = `payment.html?name=${encodeURIComponent(
      nameInput.value
    )}&email=${encodeURIComponent(
      emailInput.value
    )}&apartment=${encodeURIComponent(
      apartmentInput.value
    )}&nights=${nights}`;
  });
});
const bookingData = {
  name,
  email,
  apartment,
  nights,
  amount
};

sessionStorage.setItem("booking", JSON.stringify(bookingData));
window.location.href = "payment.html";
