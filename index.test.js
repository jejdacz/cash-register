const checkCashRegister = require("./index");

describe("cash-register", () => {
  it("should not throw", () => {
    expect(() => checkCashRegister(19.5, 20, [])).not.toThrow();
  });
  it("should be a function", () => {
    expect(typeof checkCashRegister).toEqual("function");
  });
  describe("when called with valid data", () => {
    it("should return an object", () => {
      expect(
        typeof checkCashRegister(19.5, 20, [
          ["PENNY", 1.01],
          ["NICKEL", 2.05],
          ["DIME", 3.1],
          ["QUARTER", 4.25],
          ["ONE", 90],
          ["FIVE", 55],
          ["TEN", 20],
          ["TWENTY", 60],
          ["ONE HUNDRED", 100]
        ])
      ).toEqual("object");
    });
    describe("when have enough money to change", () => {
      it("should return status open and return change", () => {
        expect(
          checkCashRegister(19.5, 20, [
            ["PENNY", 1.01],
            ["NICKEL", 2.05],
            ["DIME", 3.1],
            ["QUARTER", 4.25],
            ["ONE", 90],
            ["FIVE", 55],
            ["TEN", 20],
            ["TWENTY", 60],
            ["ONE HUNDRED", 100]
          ])
        ).toEqual({ status: "OPEN", change: [["QUARTER", 0.5]] });
        expect(
          checkCashRegister(3.26, 100, [
            ["PENNY", 1.01],
            ["NICKEL", 2.05],
            ["DIME", 3.1],
            ["QUARTER", 4.25],
            ["ONE", 90],
            ["FIVE", 55],
            ["TEN", 20],
            ["TWENTY", 60],
            ["ONE HUNDRED", 100]
          ])
        ).toEqual({
          status: "OPEN",
          change: [
            ["TWENTY", 60],
            ["TEN", 20],
            ["FIVE", 15],
            ["ONE", 1],
            ["QUARTER", 0.5],
            ["DIME", 0.2],
            ["PENNY", 0.04]
          ]
        });
      });
    });
    describe("when not have enough money to change", () => {
      it("should return status isuficient funds and []", () => {
        expect(
          checkCashRegister(19.5, 20, [
            ["PENNY", 0.01],
            ["NICKEL", 0],
            ["DIME", 0],
            ["QUARTER", 0],
            ["ONE", 0],
            ["FIVE", 0],
            ["TEN", 0],
            ["TWENTY", 0],
            ["ONE HUNDRED", 0]
          ])
        ).toEqual({ status: "INSUFFICIENT_FUNDS", change: [] });
        expect(
          checkCashRegister(19.5, 20, [
            ["PENNY", 0.02],
            ["NICKEL", 0],
            ["DIME", 0],
            ["QUARTER", 0],
            ["ONE", 0],
            ["FIVE", 0],
            ["TEN", 0],
            ["TWENTY", 0],
            ["ONE HUNDRED", 0]
          ])
        ).toEqual({ status: "INSUFFICIENT_FUNDS", change: [] });
      });
    });
    describe("when have just enough money to change", () => {
      it("should return status isuficient funds and []", () => {
        expect(
          checkCashRegister(19.5, 20, [
            ["PENNY", 0.5],
            ["NICKEL", 0],
            ["DIME", 0],
            ["QUARTER", 0],
            ["ONE", 0],
            ["FIVE", 0],
            ["TEN", 0],
            ["TWENTY", 0],
            ["ONE HUNDRED", 0]
          ])
        ).toEqual({
          status: "CLOSED",
          change: [
            ["PENNY", 0.5],
            ["NICKEL", 0],
            ["DIME", 0],
            ["QUARTER", 0],
            ["ONE", 0],
            ["FIVE", 0],
            ["TEN", 0],
            ["TWENTY", 0],
            ["ONE HUNDRED", 0]
          ]
        });
      });
    });
  });
});
