import { InjectionToken } from "@angular/core";
import { AppReducer } from "app/state/app-reducer";
import { AppState } from "app/state/app-state";
import { InputReducer } from "app/state/input.reducer";
import { StateService } from "app/state/state.service";

export const APP_STATE = new InjectionToken("app-state", {
  providedIn: "root",
  factory: () => ({
    expression: "",
    input: "0",
  }),
});

export const APP_REDUCER = new InjectionToken("app-reducer");

export const stateServiceProvider = {
  provide: StateService,
  useFactory: (state: AppState, reducer: AppReducer) =>
    new StateService(state, reducer),
  deps: [APP_STATE, InputReducer],
};
