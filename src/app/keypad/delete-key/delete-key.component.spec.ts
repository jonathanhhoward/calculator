import { render } from "@testing-library/angular";
import { DeleteKeyComponent } from "./delete-key.component";

describe("DeleteKeyComponent", () => {
  it("should render", async () => {
    await render(DeleteKeyComponent);
  });
});
