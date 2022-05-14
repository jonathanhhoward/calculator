import { render } from "@testing-library/angular";
import { ClearKeyComponent } from "./clear-key.component";

describe("ClearKeyComponent", () => {
  it("should render", async () => {
    await render(ClearKeyComponent);
  });
});
