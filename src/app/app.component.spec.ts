import { render } from "@testing-library/angular";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  it("should render", async () => {
    await render(AppComponent);
  });
});
