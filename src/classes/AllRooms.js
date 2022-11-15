class AllRooms {
  constructor(fetchetRooms) {
    this.rooms = fetchetRooms || [];
  }
  findRoomByNumber(roomNumber) {
    const foundRoom = this.rooms.find((room) => {
      return room.number === roomNumber;
    });
    return foundRoom;
  }
  getAvailableRooms(occupiedRoom) {
    const emptyRooms = this.rooms.filter((item) => {
      return !occupiedRoom.includes(item.number);
    });
    return emptyRooms;
  }
  getAllRoomTypes() {
    const roomTypes = this.rooms.reduce((acc, item) => {
      if (!acc.includes(item.roomType)) {
        acc.push(item.roomType);
      }
      return acc;
    }, []);
    return roomTypes;
  }
}

export default AllRooms;
