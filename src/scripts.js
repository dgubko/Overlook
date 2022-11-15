// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import "./images/house.png";
import "./images/surfer-surfing.png";
import "./images/logout.png";
import "./images/7aa06f9fa8cb9b6d2af25ec26c8e83e3.jpg";
import "./images/single-bed.png";
import "./images/calendar.png";
import "./images/price-tag.png";

import {
  getAllRooms,
  getAllBookings,
  getCustomer,
  postBooking,
} from "./apiCalls";
import Customer from "./classes/Customer";
import AllBookings from "./classes/AllBookings";
import AllRooms from "./classes/AllRooms";
import Booking from "./classes/Booking";

// GLOBAL VAR

let customer, allBookings, allRooms, searchDate;

// QUERYSELECTORS
// sections
const loginScreen = document.querySelector(".login-screen");
const mainDashboard = document.querySelector(".dashboard");
const upcomingCardsSection = document.querySelector("#upcoming-cards");
const pastCardsSection = document.querySelector("#past-cards");
const makeReservationSection = document.querySelector(
  "#make-reservation-section"
);
const availableForReservationSection =
  document.querySelector("#available-cards");
// elements
const userBlock = document.querySelector(".user-info");
const userNameHTML = document.querySelector("#user-name");
const totalSpent = document.querySelector("#total-spent");
const sectionTitleText = document.querySelector("#section-title-text");
const tabButtons = document.querySelector(".tabs");
// forms
const filtersForm = document.querySelector(".filters");
const userLoginForm = document.querySelector(".login-form");
const datePicker = document.querySelector("#date");
const roomTypeSelectorHTML = document.querySelector("#room-type-selector");
// messages
const resultMessageHTML = document.querySelector(".dashboard .result-message");
const resultMessageLogin = document.querySelector(
  ".login-form .result-message"
);
// buttons
const makeReservationButton = document.querySelector(
  "#make-reservation-button"
);
const upcomingButton = document.querySelector("#upcoming");
const pastButton = document.querySelector("#past");
const logoutButton = document.querySelector("#logout-button");
const goBackToBookingsButton = document.querySelector(
  "#go-back-to-bookings-button"
);

// EVENTLISTENERS

pastButton.addEventListener("click", showPastBookings);
upcomingButton.addEventListener("click", showUpcomingBookings);
makeReservationButton.addEventListener("click", makeReservation);
goBackToBookingsButton.addEventListener("click", goBackToBookings);
filtersForm.addEventListener("submit", showAvailableRooms);
userLoginForm.addEventListener("submit", authorizeUser);
logoutButton.addEventListener("click", logoutSession);

// EVENT HANDLERS

function authorizeUser(event) {
  event.preventDefault();
  const userName = event.target.elements.username.value;
  const password = event.target.elements.password.value;
  const userId = Number(userName.slice(8, 10));
  if (!userName && !password) {
    return showLoginErrorMessage("Enter user name and password");
  } else if (!userName || !userName.startsWith("customer") || isNaN(userId)) {
    return showLoginErrorMessage("Enter correct user name");
  } else if (!password || password !== "overlook2021") {
    return showLoginErrorMessage("Enter correct password");
  }
  load(userId);
}

function showAvailableRooms(event) {
  event.preventDefault();
  const dateValue = event.target.elements.date.value;
  const roomTypeValue = event.target.elements["room-type"].value;

  if (dateValue && !isPastDate(date)) {
    makeRoomSearch(dateValue, roomTypeValue);
    searchDate = dateValue.replaceAll("-", "/");
  } else {
    showMessage("Please select correct date.");
  }
}

function bookRoom(event) {
  const bookingCard = event.target.closest(".booking-card");
  const roomNumber = Number(bookingCard.id);
  postBooking(customer.id, searchDate, roomNumber)
    .then((data) => {
      showSuccessMessage(data.message);
      allBookings.bookings.push(data.newBooking);
      const foundRoom = allRooms.findRoomByNumber(roomNumber);
      const booking = new Booking(data.newBooking, foundRoom);
      customer.bookings.push(booking);
      bookingCard.remove();
      const updatedUpcomingBookings = customer.getUpcomingBookings();
      renderUpcomingBookings(updatedUpcomingBookings);
    })
    .catch((error) => showErrorMessage(error));
}

function goBackToBookings() {
  cleanReservation();
  showCustomerBookings();
}

function logoutSession() {
  pastCardsSection.classList.add("hidden");
  userBlock.classList.add("hidden");
  mainDashboard.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  customer = undefined;
  searchDate = undefined;
  pastCardsSection.innerHTML = "";
  upcomingCardsSection.innerHTML = "";
  roomTypeSelectorHTML.innerHTML = "";
  cleanReservation();
}

// FUNCTIONS DATA
function load(userId) {
  Promise.all([getAllRooms(), getAllBookings(), getCustomer(userId)]).then(
    (data) => {
      allRooms = new AllRooms(data[0]);
      allBookings = new AllBookings(data[1]);
      const filteredBookings = allBookings.getUserBookings(data[2].id);
      customer = new Customer(data[2], filteredBookings);
      customer.retrieveBookings(allRooms);
      loadCustomerDashboard();
    }
  );
}

function makeRoomSearch(dateValue, roomTypeValue) {
  const occupied = allBookings.getOccupiedRooms(dateValue);
  const available = allRooms.getAvailableRooms(occupied);
  const filteredRooms = available.filter((item) => {
    return roomTypeValue === "all" || item.roomType === roomTypeValue;
  });
  renderAvailableRooms(filteredRooms);
}

function loadCustomerDashboard() {
  loginScreen.classList.add("hidden");
  mainDashboard.classList.remove("hidden");
  userBlock.classList.remove("hidden");
  const pastBookings = customer.getPastBookings();
  const upcomingBookings = customer.getUpcomingBookings();
  renderUpcomingBookings(upcomingBookings);
  renderPastBookings(pastBookings);
  totalSpent.innerText = `$${customer.getTotalCost().toFixed(2)}`;
  userNameHTML.innerText = customer.name;
  setMinDate();
  showCustomerBookings();
}

function getMinDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
}

function isPastDate(date) {
  const selectedDate = new Date(date).getTime();
  const today = new Date(new Date().toDateString()).getTime();
  return selectedDate < today;
}

// FUNCTIONS DOM

function setMinDate() {
  datePicker.setAttribute("min", getMinDate());
}

function renderAvailableRooms(available) {
  availableForReservationSection.innerHTML = "";
  if (!available.length) {
    const text =
      "Sorry, we could not find anything for your search. Please select another date or room type.";
    showMessage(text);
    return;
  }
  resultMessageHTML.classList.add("hidden");
  availableForReservationSection.classList.remove("hidden");
  available.forEach((item) => {
    availableForReservationSection.appendChild(renderCard(item));
  });
}

function renderCard(item) {
  const bookingCard = document.createElement("div");
  bookingCard.classList.add("booking-card");
  bookingCard.id = item.number;
  bookingCard.innerHTML = `
    <img
      src="./images/7aa06f9fa8cb9b6d2af25ec26c8e83e3.jpg"
      alt="beach-room"
    />
    <div>
      <h3>${item.roomType.toUpperCase()}</h3>
      <p>
        <img src="./images/single-bed.png" alt="single bed"/>
        <span>${item.bedSize} bed</span>
      </p>
      <p>
        <img src="./images/price-tag.png" alt="price tag"/>
        <span>$${item.costPerNight}</span>
      </p>
      <button class="secondary-inline-button">Book</button>
    </div>`;
  bookingCard
    .querySelector(".secondary-inline-button")
    .addEventListener("click", bookRoom);
  return bookingCard;
}

function showPastBookings() {
  upcomingButton.classList.remove("selected");
  pastButton.classList.add("selected");
  upcomingCardsSection.classList.add("hidden");
  pastCardsSection.classList.remove("hidden");
}

function showUpcomingBookings() {
  upcomingButton.classList.add("selected");
  pastButton.classList.remove("selected");
  upcomingCardsSection.classList.remove("hidden");
  pastCardsSection.classList.add("hidden");
}

function makeReservation() {
  sectionTitleText.innerText = "MAKE RESERVATION";
  tabButtons.classList.add("hidden");
  upcomingCardsSection.classList.add("hidden");
  pastCardsSection.classList.add("hidden");
  filtersForm.classList.remove("hidden");
  makeReservationSection.classList.remove("hidden");
  renderRoomType();
}

function renderRoomType() {
  roomTypeSelectorHTML.innerHTML =
    '<option selected value="all">All room types</option>';
  allRooms.getAllRoomTypes().forEach((item) => {
    roomTypeSelectorHTML.innerHTML += `<option value="${item}">${item}</option>`;
  });
}

function renderUpcomingBookings(upcomingBookings) {
  upcomingCardsSection.innerHTML = "";
  upcomingBookings.forEach((item) => {
    upcomingCardsSection.innerHTML += `
      <div class="booking-card" id="${item.id}">
        <img
          src="./images/7aa06f9fa8cb9b6d2af25ec26c8e83e3.jpg"
          alt="beach-room"
        />
        <div>
          <h3>${item.roomType.toUpperCase()}</h3>
          <p>
            <img src="./images/single-bed.png" alt="single bed" />
            <span>${item.bedSize} bed</span>
          </p>
          <p>
            <img src="./images/calendar.png" alt="tag" />
            <span>${item.date}</span>
          </p>
          <p>
            <img src="./images/price-tag.png" alt="price tag" />
            <span>$${item.costPerNight}</span>
          </p>
        </div>
      </div>`;
  });
}

function renderPastBookings(pastBookings) {
  pastCardsSection.innerHTML = "";
  pastBookings.forEach((item) => {
    pastCardsSection.innerHTML += `
    <div class="booking-card" id="${item.id}">
      <img
        src="./images/7aa06f9fa8cb9b6d2af25ec26c8e83e3.jpg"
        alt="beach-room"
      />
      <div>
        <h3>${item.roomType.toUpperCase()}</h3>
        <p>
          <img src="./images/single-bed.png" alt="single bed" />
          <span>${item.bedSize} bed</span>
        </p>
        <p>
          <img src="./images/calendar.png" alt="calendar" />
          <span>${item.date}</span>
        </p>
        <p>
        <img src="./images/price-tag.png" alt="price tag" />
        <span>$${item.costPerNight}</span>
        </p>
      </div>
    </div>`;
  });
}

function showMessage(text) {
  resultMessageHTML.classList.remove("hidden");
  resultMessageHTML.classList.remove("error");
  resultMessageHTML.classList.remove("success");
  resultMessageHTML.innerText = text;
}

function showSuccessMessage(text) {
  resultMessageHTML.classList.remove("hidden");
  resultMessageHTML.classList.remove("error");
  resultMessageHTML.classList.add("success");
  resultMessageHTML.innerText = text;
  setTimeout(() => {
    resultMessageHTML.classList.add("hidden");
    resultMessageHTML.classList.remove("success");
  }, 3000);
}

function showErrorMessage(text) {
  resultMessageHTML.classList.remove("hidden");
  resultMessageHTML.classList.add("error");
  resultMessageHTML.classList.remove("success");
  resultMessageHTML.innerText = text;
  setTimeout(() => {
    resultMessageHTML.classList.add("hidden");
    resultMessageHTML.classList.remove("error");
  }, 3000);
}

function showLoginErrorMessage(text) {
  resultMessageLogin.classList.remove("hidden");
  resultMessageLogin.classList.add("error");
  resultMessageLogin.classList.remove("success");
  resultMessageLogin.innerText = text;
  setTimeout(() => {
    resultMessageLogin.classList.add("hidden");
    resultMessageLogin.classList.remove("error");
  }, 3000);
}

function cleanReservation() {
  datePicker.value = "";
  roomTypeSelectorHTML.value = "all";
  filtersForm.classList.add("hidden");
  showMessage("Please select date to search rooms");
  availableForReservationSection.innerHTML = "";
  makeReservationSection.classList.add("hidden");
  sectionTitleText.innerText = "MY BOOKINGS";
}

function showCustomerBookings() {
  tabButtons.classList.remove("hidden");
  upcomingCardsSection.classList.remove("hidden");
  upcomingButton.classList.add("selected");
  pastButton.classList.remove("selected");
}
