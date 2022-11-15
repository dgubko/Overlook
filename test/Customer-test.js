import chai from "chai";
import Booking from "../src/classes/Booking";
const expect = chai.expect;
import Customer from "../src/classes/Customer";
import AllRooms from "../src/classes/AllRooms";
import {
  mockFetchedCustomer,
  mockLeathaBookings,
  mockRocioBookings,
  mockFetchedRooms,
} from "./mock-data/index";

describe("Customer", () => {
  let customer, customer2, allRooms;

  beforeEach(() => {
    customer = new Customer(mockFetchedCustomer[0], mockLeathaBookings);
    customer2 = new Customer(mockFetchedCustomer[1], mockRocioBookings);
    allRooms = new AllRooms(mockFetchedRooms);
  });

  it("should be a function", () => {
    expect(Customer).to.be.a("function");
  });

  it("should have an id", () => {
    expect(customer.id).to.equal(1);
    expect(customer2.id).to.equal(2);
  });

  it("should have a name", () => {
    expect(customer.name).to.equal("Leatha Ullrich");
    expect(customer2.name).to.equal("Rocio Schuster");
  });

  it("should have all customer bookings", () => {
    expect(customer.bookings).to.deep.equal(mockLeathaBookings);
    expect(customer2.bookings).to.deep.equal(mockRocioBookings);
  });

  it("should retrieve bookings", () => {
    customer.retrieveBookings(allRooms);
    expect(customer.bookings[0]).instanceOf(Booking);
    expect(customer.bookings[0]).to.deep.equal({
      id: "5fwrgu4i7k55hl6t8",
      userID: 1,
      date: "2022/02/05",
      roomNumber: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      costPerNight: 358.4,
    });
  });

  it("should retrieve bookings for different customer", () => {
    customer2.retrieveBookings(allRooms);
    expect(customer2.bookings[0]).instanceOf(Booking);
    expect(customer2.bookings[0]).to.deep.equal({
      id: "5fwrgu4i7k55hl6uf",
      userID: 2,
      date: "2022/01/09",
      roomNumber: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      costPerNight: 358.4,
    });
  });

  it("should return past bookings", () => {
    customer.retrieveBookings(allRooms);
    expect(customer.getPastBookings()).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2022/02/05",
        roomNumber: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        costPerNight: 358.4,
      },
    ]);

    customer2.retrieveBookings(allRooms);
    expect(customer2.getPastBookings()).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6uf",
        userID: 2,
        date: "2022/01/09",
        roomNumber: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        costPerNight: 358.4,
      },
    ]);
  });

  it("should return upcoming bookings", () => {
    customer.retrieveBookings(allRooms);
    expect(customer.getUpcomingBookings()).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6x8",
        userID: 1,
        date: "2130/01/11",
        roomNumber: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        costPerNight: 477.38,
      },
    ]);

    customer2.retrieveBookings(allRooms);
    expect(customer2.getUpcomingBookings()).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6uy",
        userID: 2,
        date: "2130/01/24",
        roomNumber: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        costPerNight: 477.38,
      },
    ]);
  });

  it("should have totla cost per night", () => {
    customer.retrieveBookings(allRooms);
    expect(customer.getTotalCost()).to.equal(835.78);

    customer2.retrieveBookings(allRooms);
    expect(customer2.getTotalCost()).to.equal(835.78);
  });
});
