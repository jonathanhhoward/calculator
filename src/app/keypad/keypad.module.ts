import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  ClearKeyComponent,
  DeleteKeyComponent,
  DigitKeyComponent,
  EqualsKeyComponent,
  KeyComponent,
  NegateKeyComponent,
  OperatorKeyComponent,
} from "./components";
import { KeypadComponent } from "./keypad.component";

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
