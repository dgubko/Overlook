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

  it("should have a property that contains all bookings", () => {
    expect(allBookings.bookings).to.deep.equal(mockFetchedBookings);
  });

  it("should filter all bookings by user id", () => {
    expect(allBookings.getUserBookings(1)).to.deep.equal(mockLeathaBookings);
    expect(allBookings.getUserBookings(2)).to.deep.equal(mockRocioBookings);
  });
});
