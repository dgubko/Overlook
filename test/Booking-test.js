import chai from "chai";
const expect = chai.expect;
import Booking from "../src/classes/Booking";
import { mockFetchedBookings, mockFetchedRooms } from "./mock-data/index";

describe("Booking", () => {
  let booking, booking2;
  beforeEach(() => {
    booking = new Booking(mockFetchedBookings[0], mockFetchedRooms[0]);
    booking2 = new Booking(mockFetchedBookings[1], mockFetchedRooms[1]);
  });

  it("should be a function", () => {
    expect(Booking).to.be.a("function");
  });

  it("should have an id", () => {
    expect(booking.id).to.equal("5fwrgu4i7k55hl6v9");
    expect(booking2.id).to.equal("5fwrgu4i7k55hl6tf");
  });

  it("should have a user id", () => {
    expect(booking.userID).to.equal(33);
    expect(booking2.userID).to.equal(36);
  });

  it("should have a date", () => {
    expect(booking.date).to.equal("2022/02/13");
    expect(booking2.date).to.equal("2022/01/25");
  });

  it("should have a room number", () => {
    expect(booking.roomNumber).to.equal(1);
    expect(booking2.roomNumber).to.equal(2);
  });

  it("should have a room type", () => {
    expect(booking.roomType).to.equal("residential suite");
    expect(booking2.roomType).to.equal("suite");
  });

  it("should have a bidet", () => {
    expect(booking.bidet).to.equal(true);
    expect(booking2.bidet).to.equal(false);
  });

  it("should know a bedsize", () => {
    expect(booking.bedSize).to.equal("queen");
    expect(booking2.bedSize).to.equal("full");
  });

  it("should have a cost per night", () => {
    expect(booking.costPerNight).to.equal(358.4);
    expect(booking2.costPerNight).to.equal(477.38);
  });
});
