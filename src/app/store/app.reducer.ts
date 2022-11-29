import { Payload } from "app/store/app.actions";
import { AppState } from "app/store/app.feature";
import { InputReducer } from "app/store/input.reducer";

export abstract class AppReducer {
  clearClick(): AppState {
    return {
      expression: "0",
      input: "0",
      reducer: new InputReducer(),
    };
  }

  abstract deleteClick(state: AppState): AppState;

  abstract digitClick(state: AppState, payload: Payload): AppState;

  abstract operatorClick(state: AppState, payload: Payload): AppState;

  abstract negateClick(state: AppState): AppState;

  abstract equalsClick(state: AppState): AppState;
}
