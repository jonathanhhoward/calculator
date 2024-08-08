import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { KeyComponent } from "./key/key.component";
import { KeypadComponent } from "./keypad.component";

@NgModule({
    imports: [CommonModule, KeyComponent, KeypadComponent],
    exports: [KeypadComponent],
})
export class KeypadModule {}
