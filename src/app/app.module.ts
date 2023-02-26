import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { initialState } from "app/state/initial-state";
import { NumberReducer } from "app/state/number.reducer";
import { OperatorReducer } from "app/state/operator.reducer";
import { ResultReducer } from "app/state/result.reducer";
import {
  INITIAL_STATE,
  NUMBER_REDUCER,
  OPERATOR_REDUCER,
  RESULT_REDUCER,
} from "app/state/state.service";
import { AppComponent } from "./app.component";
import { DisplayModule } from "./display/display.module";
import { KeypadModule } from "./keypad/keypad.module";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, DisplayModule, KeypadModule],
  providers: [
    { provide: INITIAL_STATE, useValue: initialState },
    { provide: NUMBER_REDUCER, useClass: NumberReducer },
    { provide: OPERATOR_REDUCER, useClass: OperatorReducer },
    { provide: RESULT_REDUCER, useClass: ResultReducer },
  ],
})
export class AppModule {}
