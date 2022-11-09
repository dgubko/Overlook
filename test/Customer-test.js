import chai from "chai";
const expect = chai.expect;
import Customer from "../src/classes/Customer";
import { mockFetchedCustomer } from "./mock-data/index";

describe("Customer", () => {
  let customer, customer2;
  beforeEach(() => {
    customer = new Customer(mockFetchedCustomer[0]);
    customer2 = new Customer(mockFetchedCustomer[1]);
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
});
