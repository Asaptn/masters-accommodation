document.getElementById("proceedPayment").addEventListener("click", function () {
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;

  if (!checkin || !checkout) {
    alert("Please select check-in and check-out dates");
    return;
  }

  const startDate = new Date(checkin);
  const endDate = new Date(checkout);

  const timeDiff = endDate - startDate;
  const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (nights <= 0) {
    alert("Check-out date must be after check-in date");
    return;
  }

  const pricePerNight = 700; // change per apartment
  const total = pricePerNight * nights;

  console.log("Nights:", nights);
  console.log("Total:", total);

  // Redirect to payment page
  window.location.href = `payment.html?nights=${nights}&total=${total}`;
});

    