import { InjectionToken } from "@angular/core";
import { AppState } from "app/state/app-state";

export const APP_REDUCER = new InjectionToken("AppReducer");

export interface AppReducer {
  deleteClick(state: AppState): AppState;

  digitClick(state: AppState, symbol: string): AppState;

  operatorClick(state: AppState, symbol: string): AppState;

  negateClick(state: AppState): AppState;

  equalsClick(state: AppState): AppState;
}
