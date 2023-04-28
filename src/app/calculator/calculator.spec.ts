import { Calculator } from "app/calculator/calculator";

const sut = new Calculator();

test("zero returns zero", () => {
  expect(sut.eval("0")).toBe("0");
});

test("returns a positive number", () => {
  expect(sut.eval("1")).toBe("1");
});

test("returns a negative number", () => {
  expect(sut.eval("-1")).toBe("-1");
});

test("adds two numbers", () => {
  expect(sut.eval("1+2")).toBe("3");
});

test("subtracts two numbers", () => {
  expect(sut.eval("3-2")).toBe("1");
});

test("multiplies two numbers", () => {
  expect(sut.eval("1*2")).toBe("2");
});

test("divides two numbers", () => {
  expect(sut.eval("4/2")).toBe("2");
});

test("follows algebraic operator precedence", () => {
  expect(sut.eval("2+2*2-2/2")).toBe("5");
});

test("numbers with more than 10 digits are exponential", () => {
  expect(sut.eval("1000000000")).toBe("1000000000");
  expect(sut.eval("10000000000")).toBe("1e+10");
});

test("numbers with more than six decimal places are exponential", () => {
  expect(sut.eval("0.000001")).toBe("0.000001");
  expect(sut.eval("0.0000001")).toBe("1e-7");
});

test("numbers are rounded to ten digits", () => {
  expect(sut.eval("12345678914")).toBe("1.234567891e+10");
  expect(sut.eval("12345678905")).toBe("1.234567891e+10");
  expect(sut.eval("1.2345678914")).toBe("1.234567891");
  expect(sut.eval("1.2345678906")).toBe("1.234567891");
  expect(sut.eval("0.00000012345678914")).toBe("1.234567891e-7");
  expect(sut.eval("0.00000012345678905")).toBe("1.234567891e-7");
});

test("returns 'Infinity' on divide by zero", () => {
  expect(sut.eval("1/0")).toBe("Infinity");
});

test("handles special symbols", () => {
  expect(sut.eval("2×2×2÷2÷2−2−2")).toBe("-2");
});
