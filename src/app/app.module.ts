import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { DisplayComponent } from "./display/display.component";
import { DigitKeyComponent } from "./keypad/digit-key/digit-key.component";
import { KeypadComponent } from "./keypad/keypad.component";

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    KeypadComponent,
    DigitKeyComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
