import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { KeyComponent } from "./key/key.component";
import { KeypadComponent } from "./keypad.component";

@NgModule({
  declarations: [KeyComponent, KeypadComponent],
  imports: [CommonModule],
  exports: [KeypadComponent],
})
export class KeypadModule {}
