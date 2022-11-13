export function getAllRooms() {
  return fetch("http://localhost:3001/api/v1/rooms")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("Can not get all rooms");
      }
    })
    .then((data) => data.rooms);
}

export function getAllBookings() {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("Can not get all bookings");
      }
    })
    .then((data) => data.bookings);
}

export function getCustomer(id) {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`).then(
    (response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("Can not get customer");
      }
    }
  );
}

export function postBooking(userID, date, roomNumber) {
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID, date, roomNumber }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
