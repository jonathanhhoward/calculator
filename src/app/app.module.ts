import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { DisplayModule } from "./display/display.module";
import { KeypadModule } from "./keypad/keypad.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DisplayModule, KeypadModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
