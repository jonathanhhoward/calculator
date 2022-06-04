import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { StoreFacade } from "lib/store.facade";
import { appFeature } from "store/app.feature";
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
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(appFeature),
  ],
  providers: [StoreFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
