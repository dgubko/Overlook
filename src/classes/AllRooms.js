class AllRooms {
  constructor(fetchetRooms) {
    this.rooms = fetchetRooms;
  }
  findRoomByNumber(roomNumber) {
    const foundRoom = this.rooms.find((room) => {
      return room.number === roomNumber;
    });
    return foundRoom;
  }
}

export default AllRooms;
