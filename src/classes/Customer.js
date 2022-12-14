import Booking from "./Booking";

class Customer {
  constructor(fetchedCustomer, filteredBookings) {
    this.id = fetchedCustomer.id;
    this.name = fetchedCustomer.name;
    this.bookings = filteredBookings;
  }

  retrieveBookings(allRooms) {
    this.bookings = this.bookings.map((item) => {
      const foundRoom = allRooms.findRoomByNumber(item.roomNumber);
      const booking = new Booking(item, foundRoom);
      return booking;
    });
  }

  getPastBookings() {
    const past = this.bookings.filter((item) => {
      return new Date(item.date).getTime() < Date.now();
    });
    return past;
  }

  getUpcomingBookings() {
    const upcoming = this.bookings.filter((item) => {
      return new Date(item.date).getTime() > Date.now();
    });
    return upcoming;
  }

  getTotalCost() {
    const price = this.bookings.reduce((acc, item) => {
      acc += item.costPerNight;
      return acc;
    }, 0);
    return price;
  }
}

export default Customer;
