import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { KeypadComponent } from "./keypad.component";
import {
  ClearKeyComponent,
  DeleteKeyComponent,
  DigitKeyComponent,
  EqualsKeyComponent,
  KeyComponent,
  NegateKeyComponent,
  OperatorKeyComponent,
} from "./keys";

@NgModule({
  declarations: [
    ClearKeyComponent,
    DeleteKeyComponent,
    DigitKeyComponent,
    EqualsKeyComponent,
    KeyComponent,
    KeypadComponent,
    NegateKeyComponent,
    OperatorKeyComponent,
  ],
  imports: [CommonModule],
  exports: [KeypadComponent],
})
export class KeypadModule {}
