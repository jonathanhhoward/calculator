import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { DisplayComponent } from "./display/display.component";
import { DeleteKeyComponent } from "./keypad/delete-key/delete-key.component";
import { DigitKeyComponent } from "./keypad/digit-key/digit-key.component";
import { EqualsKeyComponent } from "./keypad/equals-key/equals-key.component";
import { KeyComponent } from "./keypad/key/key.component";
import { KeypadComponent } from "./keypad/keypad.component";
import { OperatorKeyComponent } from "./keypad/operator-key/operator-key.component";

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    KeypadComponent,
    DigitKeyComponent,
    KeyComponent,
    EqualsKeyComponent,
    OperatorKeyComponent,
    DeleteKeyComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
