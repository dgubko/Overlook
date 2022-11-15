import chai from "chai";
const expect = chai.expect;
import AllBookings from "../src/classes/AllBookings";
import {
  mockFetchedBookings,
  mockLeathaBookings,
  mockRocioBookings,
} from "./mock-data";

describe("AllBookings", () => {
  let allBookings;
  beforeEach(() => {
    allBookings = new AllBookings(mockFetchedBookings);
  });

  it("should be a function", () => {
    expect(AllBookings).to.be.a("function");
  });

  it("should have a property bookings as empty array by default", () => {
    const allBookings = new AllBookings();
    expect(allBookings.bookings).to.deep.equal([]);
  });

  it("should have a property that contains all bookings", () => {
    expect(allBookings.bookings).to.deep.equal(mockFetchedBookings);
  });

  it("should filter all bookings by user id", () => {
    expect(allBookings.getUserBookings(1)).to.deep.equal(mockLeathaBookings);
    expect(allBookings.getUserBookings(2)).to.deep.equal(mockRocioBookings);
  });

  it("should return empty array if there is no booking for given user", () => {
    expect(allBookings.getUserBookings(3)).to.deep.equal([]);
  });

  it("should return occupated rooms by given date", () => {
    expect(allBookings.getOccupiedRooms("2022-02-13")).to.deep.equal([1]);
  });

  it("should return empty array if there is no booking for given date", () => {
    expect(allBookings.getOccupiedRooms("2023-02-13")).to.deep.equal([]);
  });
});
