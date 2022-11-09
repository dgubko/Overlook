import chai from "chai";
const expect = chai.expect;
import AllBookings from "../src/classes/AllBookings";
import {} from "./mock-data/index";

describe("AllBookings", () => {
  let allBookings;
  beforeEach(() => {
    allBookings = new AllBookings();
  });
  it("should be a function", () => {
    expect(AllBookings).to.be.a("function");
  });
});
