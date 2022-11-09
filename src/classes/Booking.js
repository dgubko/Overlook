class Booking {
  constructor(fetchedBooking, foundRoom) {
    this.id = fetchedBooking.id;
    this.userID = fetchedBooking.userID;
    this.date = fetchedBooking.date;
    this.roomNumber = fetchedBooking.roomNumber;
    this.roomType = foundRoom.roomType;
    this.bidet = foundRoom.bidet;
    this.bedSize = foundRoom.bedSize;
    this.costPerNight = foundRoom.costPerNight;
  }
}

export default Booking;
