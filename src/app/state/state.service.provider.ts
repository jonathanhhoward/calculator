import { Injectable } from "@angular/core";
import { AppReducer } from "app/state/app-reducer";
import { AppState } from "app/state/app-state";
import { NumberReducer } from "app/state/number-reducer.service";
import { StateService } from "app/state/state.service";

@Injectable({ providedIn: "root" })
class InitialState implements AppState {
  expression = "";
  input = "0";
}

export const stateServiceProvider = {
  provide: StateService,
  useFactory: (initialState: AppState, reducer: AppReducer) =>
    new StateService(initialState, reducer),
  deps: [InitialState, NumberReducer],
};
