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

// GLOBAL VAR

let customer, allBookings, allRooms, searchDate;

// QUERYSELECTORS

const userNameHTML = document.querySelector("#user-name");
const upcomingButton = document.querySelector("#upcoming");
const pastButton = document.querySelector("#past");
const upcomingCardsSection = document.querySelector("#upcoming-cards");
const pastCardsSection = document.querySelector("#past-cards");
const makeReservationButton = document.querySelector(
  "#make-reservation-button"
);
const sectionTitleText = document.querySelector("#section-title-text");
const totalSpent = document.querySelector("#total-spent");
const tabButtons = document.querySelector(".tabs");
const makeReservationSection = document.querySelector(
  "#make-reservation-section"
);
const datePicker = document.querySelector("#date");
const availableForReservationSection =
  document.querySelector("#available-cards");
const roomTypeSelectorHTML = document.querySelector("#room-type-selector");
const filtersForm = document.querySelector(".filters");
const resultMessageHTML = document.querySelector(".result-message");

// EVENTLISTENERS

filtersForm.addEventListener("submit", showAvailableRooms);

window.addEventListener("load", load);
pastButton.addEventListener("click", showPastBookings);
upcomingButton.addEventListener("click", showUpcomingBookings);
makeReservationButton.addEventListener("click", makeReservation);

// EVENT HANDLERS

function load() {
  Promise.all([getAllRooms(), getAllBookings(), getCustomer(3)]).then(
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
  const roomNumber = event.target.closest(".booking-card").id;
  postBooking(customer.id, searchDate, Number(roomNumber)).then((data) => {
    console.log(data);
  });
}

// FUNCTIONS DATA

function makeRoomSearch(dateValue, roomTypeValue) {
  const occupied = allBookings.getOccupiedRooms(dateValue);
  const available = allRooms.getAvailableRooms(occupied);
  const filteredRooms = available.filter((item) => {
    return roomTypeValue === "all" || item.roomType === roomTypeValue;
  });
  renderAvailableRooms(filteredRooms);
}

function loadCustomerDashboard() {
  const pastBookings = customer.getPastBookings();
  const upcomingBookings = customer.getUpcomingBookings();
  renderUpcomingBookings(upcomingBookings);
  renderPastBookings(pastBookings);
  totalSpent.innerText = `$${customer.getTotalCost()}`;
  userNameHTML.innerText = customer.name;
  setMinDate();
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
  if (!available.length) {
    showMessage(
      "Sorry, we could not find anything for your search. Please select another date or room type."
    );
    return;
  }
  resultMessageHTML.classList.add("hidden");
  availableForReservationSection.classList.remove("hidden");
  availableForReservationSection.innerHTML = "";
  available.forEach((item) => {
    availableForReservationSection.appendChild(renderCard(item));
  });
}

function renderCard(item) {
  const bookingCard = document.createElement("div");
  bookingCard.classList.add("booking-card");
  bookingCard.id = item.number;
  bookingCard.innerHTML = `<img
  src="./images/7aa06f9fa8cb9b6d2af25ec26c8e83e3.jpg"
  alt="beach-room"
/>
<div>
  <h3>${item.roomType.toUpperCase()}</h3>
  <p>
    <img src="./images/single-bed.png" /> <span>${item.bedSize} bed</span>
  </p>
  <p><img src="./images/price-tag.png" /> <span>$${item.costPerNight}</span></p>
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
    upcomingCardsSection.innerHTML += `<div class="booking-card" id="${
      item.id
    }">
        <img
          src="./images/7aa06f9fa8cb9b6d2af25ec26c8e83e3.jpg"
          alt="beach-room"
        />
        <div>
          <h3>${item.roomType.toUpperCase()}</h3>
          <p>
            <img src="./images/single-bed.png" /> <span>${
              item.bedSize
            } bed</span>
          </p>
          <p><img src="./images/calendar.png" /> <span>${item.date}</span></p>
          <p><img src="./images/price-tag.png" /> <span>$${
            item.costPerNight
          }</span></p>
          <button class="warning-button">Delete</button>
        </div>
      </div>`;
  });
}

function renderPastBookings(pastBookings) {
  pastCardsSection.innerHTML = "";
  pastBookings.forEach((item) => {
    pastCardsSection.innerHTML += `<div class="booking-card" id="${item.id}">
            <img
              src="./images/7aa06f9fa8cb9b6d2af25ec26c8e83e3.jpg"
              alt="beach-room"
            />
            <div>
              <h3>${item.roomType.toUpperCase()}</h3>
              <p>
                <img src="./images/single-bed.png" /> <span>${
                  item.bedSize
                } bed</span>
              </p>
              <p><img src="./images/calendar.png" /> <span>${
                item.date
              }</span></p>
              <p><img src="./images/price-tag.png" /> <span>$${
                item.costPerNight
              }</span></p>
            </div>
          </div>`;
  });
}

function showMessage(text) {
  resultMessageHTML.classList.remove("hidden");
  resultMessageHTML.innerText = text;
}
