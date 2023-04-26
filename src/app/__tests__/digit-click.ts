import {
  fireClickEvents,
  getTextContent,
} from "app/__tests__/test-utils/helpers";
import renderApp from "app/__tests__/test-utils/render-app";

test("only one decimal per number", async () => {
  const { display, keyPad } = await renderApp();
  const { decimal, one } = keyPad;

  fireClickEvents([one, decimal, decimal]);
  expect(getTextContent(display)).toEqual({ expression: "", input: "1." });
});

test("appends decimal to zero", async () => {
  const { display, keyPad } = await renderApp();
  const { add, equals, decimal } = keyPad;

  fireClickEvents([decimal, add, decimal]);
  expect(getTextContent(display)).toEqual({ expression: "0.+", input: "0." });

  fireClickEvents([equals, decimal]);
  expect(getTextContent(display)).toEqual({ expression: "", input: "0." });
});

test("limited to 10", async () => {
  const { display, keyPad } = await renderApp();
  const { clear, add, negate, equals, decimal, one } = keyPad;
  const elevenOnes = new Array(11).fill(one);

  fireClickEvents(elevenOnes);
  expect(getTextContent(display)).toEqual({
    expression: "",
    input: "1111111111",
  });

  fireClickEvents([clear, add, ...elevenOnes, negate]);
  expect(getTextContent(display)).toEqual({
    expression: "0+",
    input: "-1111111111",
  });

  fireClickEvents([clear, decimal, ...elevenOnes]);
  expect(getTextContent(display)).toEqual({
    expression: "",
    input: "0.111111111",
  });

  fireClickEvents([clear, add, decimal, ...elevenOnes, negate]);
  expect(getTextContent(display)).toEqual({
    expression: "0+",
    input: "-0.111111111",
  });

  fireClickEvents([equals, one]);
  expect(getTextContent(display)).toEqual({ expression: "", input: "1" });
});

test("clears expression and overwrites result", async () => {
  const { display, keyPad } = await renderApp();
  const { equals, one } = keyPad;

  fireClickEvents([equals]);
  expect(getTextContent(display)).toEqual({ expression: "0=", input: "0" });

  fireClickEvents([one]);
  expect(getTextContent(display)).toEqual({ expression: "", input: "1" });
});

test("overwrites operator", async () => {
  const { display, keyPad } = await renderApp();
  const { add, one } = keyPad;

  fireClickEvents([add, one]);
  expect(getTextContent(display)).toEqual({ expression: "0+", input: "1" });
});

test("overwrites zero", async () => {
  const { display, keyPad } = await renderApp();
  const { zero, one } = keyPad;

  fireClickEvents([zero, one]);
  expect(getTextContent(display)).toEqual({ expression: "", input: "1" });
});

test("appends to digits and decimal", async () => {
  const { display, keyPad } = await renderApp();
  const { decimal, one } = keyPad;

  fireClickEvents([decimal, one, one]);
  expect(getTextContent(display)).toEqual({ expression: "", input: "0.11" });
});

test("can add exponent once", async () => {
  const { display, keyPad } = await renderApp();
  const { exponent } = keyPad;

  fireClickEvents([exponent, exponent]);
  expect(getTextContent(display)).toEqual({ expression: "", input: "0e" });
});

test("exponent can have two digits", async () => {
  const { display, keyPad } = await renderApp();
  const { exponent, one } = keyPad;

  fireClickEvents([exponent, one, one, one]);
  expect(getTextContent(display)).toEqual({ expression: "", input: "0e11" });
});

test("decimal not allowed in exponent", async () => {
  const { display, keyPad } = await renderApp();
  const { exponent, decimal } = keyPad;

  fireClickEvents([exponent, decimal]);
  expect(getTextContent(display)).toEqual({ expression: "", input: "0e" });
});

test("appends exponent to zero", async () => {
  const { display, keyPad } = await renderApp();
  const { exponent } = keyPad;

  fireClickEvents([exponent]);
  expect(getTextContent(display)).toEqual({ expression: "", input: "0e" });
});

test("exponent overwrites result with leading zero", async () => {
  const { display, keyPad } = await renderApp();
  const { equals, exponent } = keyPad;

  fireClickEvents([equals, exponent]);
  expect(getTextContent(display)).toEqual({ expression: "", input: "0e" });
});
