import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { AppComponent } from "./app.component";
import { DisplayModule } from "./display/display.module";
import { KeypadModule } from "./keypad/keypad.module";
import { appFeature } from "./store/app.feature";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DisplayModule,
    KeypadModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(appFeature),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
