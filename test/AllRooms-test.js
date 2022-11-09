import chai from "chai";
const expect = chai.expect;
import AllRooms from "../src/classes/AllRooms";
import { mockFetchedRooms } from "./mock-data/index";

describe("AllRooms", () => {
  let allrooms;
  beforeEach(() => {
    allrooms = new AllRooms(mockFetchedRooms);
  });

  it("should be a function", () => {
    expect(AllRooms).to.be.a("function");
  });

  it("should have all rooms", () => {
    expect(allrooms.rooms).to.deep.equal([
      {
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4,
      },
      {
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38,
      },
    ]);
  });

  it("should find room by number", () => {
    expect(allrooms.findRoomByNumber(1)).to.deep.equal({
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4,
    });
    expect(allrooms.findRoomByNumber(2)).to.deep.equal({
      number: 2,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38,
    });
  });
});
