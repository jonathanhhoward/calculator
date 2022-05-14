import { render } from "@testing-library/angular";
import { DigitKeyComponent } from "./digit-key.component";

describe("DigitKeyComponent", () => {
  it("should render", async () => {
    await render(DigitKeyComponent);
  });
});
