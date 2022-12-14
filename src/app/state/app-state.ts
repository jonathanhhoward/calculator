import { InjectionToken } from "@angular/core";

export const APP_STATE = new InjectionToken("AppState");

export interface AppState {
  expression: string;
  input: string;
}
