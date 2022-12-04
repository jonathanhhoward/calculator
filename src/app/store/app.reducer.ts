import { Payload } from "app/store/app.actions";
import { AppState, initialState } from "app/store/app.feature";

export abstract class AppReducer {
  clearClick(): AppState {
    return initialState;
  }

  abstract deleteClick(state: AppState): AppState;

  abstract digitClick(state: AppState, payload: Payload): AppState;

  abstract operatorClick(state: AppState, payload: Payload): AppState;

  abstract negateClick(state: AppState): AppState;

  abstract equalsClick(state: AppState): AppState;
}
