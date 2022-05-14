import { render } from "@testing-library/angular";
import { OperatorKeyComponent } from "./operator-key.component";

describe("OperatorKeyComponent", () => {
  it("should render", async () => {
    await render(OperatorKeyComponent);
  });
});
