import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { DisplayComponent } from "./display/display.component";
import {
  ClearKeyComponent,
  DeleteKeyComponent,
  DigitKeyComponent,
  EqualsKeyComponent,
  KeyComponent,
  KeypadComponent,
  OperatorKeyComponent,
} from "./keypad";

@NgModule({
  declarations: [
    AppComponent,
    ClearKeyComponent,
    DeleteKeyComponent,
    DigitKeyComponent,
    DisplayComponent,
    EqualsKeyComponent,
    KeyComponent,
    KeypadComponent,
    OperatorKeyComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
