import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { appFeature } from "store/app.feature";
import { AppComponent } from "./app.component";
import { DisplayComponent } from "./display/display.component";
import { KeypadModule } from "./keypad/keypad.module";

@NgModule({
  declarations: [AppComponent, DisplayComponent],
  imports: [
    BrowserModule,
    KeypadModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(appFeature),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
