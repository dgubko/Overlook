class AllBookings {
  constructor(fetchedBookings) {
    this.bookings = fetchedBookings;
  }
  getUserBookings(userId) {
    const filtered = this.bookings.filter((item) => {
      return item.userID === userId;
    });
    return filtered;
  }
}

export default AllBookings;
