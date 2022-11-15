class AllBookings {
  constructor(fetchedBookings) {
    this.bookings = fetchedBookings || [];
  }
  getUserBookings(userId) {
    const filtered = this.bookings.filter((item) => {
      return item.userID === userId;
    });
    return filtered;
  }
  getOccupiedRooms(date) {
    const filtered = this.bookings
      .filter((item) => {
        const newDate = item.date.replaceAll("/", "-");
        return newDate === date;
      })
      .map((item) => {
        return item.roomNumber;
      });
    return filtered;
  }
}

export default AllBookings;
