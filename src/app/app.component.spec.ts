import { StoreModule } from "@ngrx/store";
import { render } from "@testing-library/angular";
import { AppComponent } from "./app.component";
import { feature } from "./app.feature";

describe("AppComponent", () => {
  it("should render", async () => {
    await render(AppComponent, {
      imports: [
        StoreModule.forRoot({}, { runtimeChecks: {} }),
        StoreModule.forFeature(feature),
      ],
    });
  });
});
