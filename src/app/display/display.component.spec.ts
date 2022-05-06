import { render } from "@testing-library/angular";
import { DisplayComponent } from "./display.component";

describe("DisplayComponent", () => {
  it("should render", async () => {
    await render(DisplayComponent);
  });
});
