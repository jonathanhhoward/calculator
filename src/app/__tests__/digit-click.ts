import {
  expectDisplayTextContent,
  fireClickEvents,
} from "app/__tests__/test-utils/helpers";
import renderApp from "app/__tests__/test-utils/render-app";

test("only one decimal per number", async () => {
  const { display, keyPad } = await renderApp();
  const { decimal, one } = keyPad;

  fireClickEvents([one, decimal, decimal]);
  expectDisplayTextContent(display, "", "1.");
});

test("appends decimal to zero", async () => {
  const { display, keyPad } = await renderApp();
  const { add, equals, decimal } = keyPad;

  fireClickEvents([decimal, add, decimal]);
  expectDisplayTextContent(display, "0.+", "0.");

  fireClickEvents([equals, decimal]);
  expectDisplayTextContent(display, "", "0.");
});

test("limited to 10", async () => {
  const { display, keyPad } = await renderApp();
  const { clear, add, negate, equals, decimal, one } = keyPad;
  const elevenOnes = new Array(11).fill(one);

  fireClickEvents(elevenOnes);
  expectDisplayTextContent(display, "", "1111111111");

  fireClickEvents([clear, add, ...elevenOnes, negate]);
  expectDisplayTextContent(display, "0+", "-1111111111");

  fireClickEvents([clear, decimal, ...elevenOnes]);
  expectDisplayTextContent(display, "", "0.111111111");

  fireClickEvents([clear, add, decimal, ...elevenOnes, negate]);
  expectDisplayTextContent(display, "0+", "-0.111111111");

  fireClickEvents([equals, one]);
  expectDisplayTextContent(display, "", "1");
});

test("clears expression and overwrites result", async () => {
  const { display, keyPad } = await renderApp();
  const { equals, one } = keyPad;

  fireClickEvents([equals]);
  expectDisplayTextContent(display, "0=", "0");

  fireClickEvents([one]);
  expectDisplayTextContent(display, "", "1");
});

test("overwrites operator", async () => {
  const { display, keyPad } = await renderApp();
  const { add, one } = keyPad;

  fireClickEvents([add, one]);
  expectDisplayTextContent(display, "0+", "1");
});

test("overwrites zero", async () => {
  const { display, keyPad } = await renderApp();
  const { zero, one } = keyPad;

  fireClickEvents([zero, one]);
  expectDisplayTextContent(display, "", "1");
});

test("appends to digits and decimal", async () => {
  const { display, keyPad } = await renderApp();
  const { decimal, one } = keyPad;

  fireClickEvents([decimal, one, one]);
  expectDisplayTextContent(display, "", "0.11");
});

test("can add exponent once", async () => {
  const { display, keyPad } = await renderApp();
  const { exponent } = keyPad;

  fireClickEvents([exponent, exponent]);
  expectDisplayTextContent(display, "", "0e");
});

test("exponent can have two digits", async () => {
  const { display, keyPad } = await renderApp();
  const { exponent, one } = keyPad;

  fireClickEvents([exponent, one, one, one]);
  expectDisplayTextContent(display, "", "0e11");
});

test("decimal not allowed in exponent", async () => {
  const { display, keyPad } = await renderApp();
  const { exponent, decimal } = keyPad;

  fireClickEvents([exponent, decimal]);
  expectDisplayTextContent(display, "", "0e");
});

test("appends exponent to zero", async () => {
  const { display, keyPad } = await renderApp();
  const { exponent } = keyPad;

  fireClickEvents([exponent]);
  expectDisplayTextContent(display, "", "0e");
});
