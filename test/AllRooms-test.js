import chai from "chai";
const expect = chai.expect;
import AllRooms from "../src/classes/AllRooms";
import { mockFetchedRooms } from "./mock-data/index";

describe("AllRooms", () => {
  let allRooms;
  beforeEach(() => {
    allRooms = new AllRooms(mockFetchedRooms);
  });

  it("should be a function", () => {
    expect(AllRooms).to.be.a("function");
  });

  it("should have all rooms", () => {
    expect(allRooms.rooms).to.deep.equal([
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

  it("should have rooms as an empty array ", () => {
    const allRooms = new AllRooms();
    expect(allRooms.rooms).to.deep.equal([]);
  });

  it("should find room by number", () => {
    expect(allRooms.findRoomByNumber(1)).to.deep.equal({
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4,
    });
    expect(allRooms.findRoomByNumber(2)).to.deep.equal({
      number: 2,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38,
    });
  });

  it("should return undefined if nothing to show", () => {
    expect(allRooms.findRoomByNumber(10)).to.equal(undefined);
  });

  it("should get all available rooms", () => {
    expect(allRooms.getAvailableRooms([1])).to.deep.equal([
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

  it("should return an empty array if no available room", () => {
    expect(allRooms.getAvailableRooms([1, 2])).to.deep.equal([]);
  });

  it("should bet all roomtypes", () => {
    expect(allRooms.getAllRoomTypes()).to.deep.equal([
      "residential suite",
      "suite",
    ]);
  });
});
