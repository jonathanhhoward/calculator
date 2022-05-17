import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { AppComponent } from "./app.component";
import { feature as appFeature } from "./app.feature";
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
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(appFeature),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
