import { calculate } from "./calculate";

test("zero returns zero", () => {
  expect(calculate("0")).toEqual("0");
});

test("returns a positive number", () => {
  expect(calculate("1")).toEqual("1");
});

test("returns a negative number", () => {
  expect(calculate("-1")).toEqual("-1");
});

test("adds two numbers", () => {
  expect(calculate("1+2")).toEqual("3");
});

test("subtracts two numbers", () => {
  expect(calculate("3-2")).toEqual("1");
});

test("multiplies two numbers", () => {
  expect(calculate("1*2")).toEqual("2");
});

test("divides two numbers", () => {
  expect(calculate("4/2")).toEqual("2");
});

test("follows algebraic operator precedence", () => {
  expect(calculate("2+2*2-2/2")).toEqual("5");
});

test("numbers with more than 10 digits are exponential", () => {
  expect(calculate("1000000000")).toEqual("1000000000");
  expect(calculate("10000000000")).toEqual("1e+10");
});

test("numbers mith more than six decimal places are exponential", () => {
  expect(calculate("0.000001")).toEqual("0.000001");
  expect(calculate("0.0000001")).toEqual("1e-7");
});

test("numbers are rounded to ten digits", () => {
  expect(calculate("12345678914")).toEqual("1.234567891e+10");
  expect(calculate("12345678905")).toEqual("1.234567891e+10");
  expect(calculate("1.2345678914")).toEqual("1.234567891");
  expect(calculate("1.2345678906")).toEqual("1.234567891");
  expect(calculate("0.00000012345678914")).toEqual("1.234567891e-7");
  expect(calculate("0.00000012345678905")).toEqual("1.234567891e-7");
});

test("returns 'Infinity' on divide by zero", () => {
  expect(calculate("1/0")).toEqual("Infinity");
});

test("returns 'NaN' on invalid primary", () => {
  expect(calculate("h")).toEqual("NaN");
});

test("returns error message on bad symbols", () => {
  expect(calculate("2 x 2")).toEqual("Undefined symbol x");
});
