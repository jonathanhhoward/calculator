import "@testing-library/jest-dom/extend-expect";
import {
  expectDisplayTextContent,
  fireKeydownEvents,
} from "app/test-utils/helpers";
import renderApp from "app/test-utils/render-app";

describe("display on key click", () => {
  describe("keyboard", () => {
    test("handles numpad keydown events", async () => {
      const { display } = await renderApp();
      fireKeydownEvents([
        "Numpad1",
        "NumpadDecimal",
        "Numpad0",
        "NumpadAdd",
        "Numpad2",
        "Numpad3",
        "NumpadSubtract",
        "Numpad4",
        "Numpad5",
        "NumpadMultiply",
        "Numpad6",
        "Numpad7",
        "NumpadDivide",
        "Numpad8",
        "Numpad9",
        "NumpadEnter",
      ]);

      expectDisplayTextContent(display, "1.0+23−45×67÷89=", "-9.876404494");
    });
  });
});
