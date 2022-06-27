import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClearKeyComponent } from "./clear-key/clear-key.component";
import { DeleteKeyComponent } from "./delete-key/delete-key.component";
import { DigitKeyComponent } from "./digit-key/digit-key.component";
import { EqualsKeyComponent } from "./equals-key/equals-key.component";
import { KeyComponent } from "./key/key.component";
import { KeypadComponent } from "./keypad.component";
import { NegateKeyComponent } from "./negate-key/negate-key.component";
import { OperatorKeyComponent } from "./operator-key/operator-key.component";

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
