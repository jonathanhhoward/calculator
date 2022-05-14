import { render } from "@testing-library/angular";
import { KeyComponent } from "./key.component";

describe("KeyComponent", () => {
  it("should render", async () => {
    await render(KeyComponent);
  });
});
