import { render } from "@testing-library/angular";
import { KeypadComponent } from "./keypad.component";

describe("KeypadComponent", () => {
  it("should render", async () => {
    await render(KeypadComponent);
  });
});
