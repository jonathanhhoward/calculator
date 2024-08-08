import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DisplayComponent } from "app/display/display.component";
import { KeypadComponent } from "app/keypad/keypad.component";
import { AppComponent } from "./app.component";



@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, KeypadComponent, DisplayComponent],
})
export class AppModule {}
