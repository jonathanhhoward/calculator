import { Injectable, InjectionToken } from "@angular/core";
import { AppReducer } from "app/state/app-reducer";
import { AppState } from "app/state/app-state";
import { InputReducer } from "app/state/input.reducer";
import { StateService } from "app/state/state.service";

export const APP_STATE = new InjectionToken("AppState");

export const APP_REDUCER = new InjectionToken("AppReducer");

@Injectable({ providedIn: "root" })
class InitialState implements AppState {
  expression = "";
  input = "0";
}

export const stateServiceProvider = {
  provide: StateService,
  useFactory: (initialState: AppState, reducer: AppReducer) =>
    new StateService(initialState, reducer),
  deps: [InitialState, InputReducer],
};
