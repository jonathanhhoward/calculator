import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DisplayComponent } from "./display.component";

@NgModule({
    imports: [CommonModule, DisplayComponent],
    exports: [DisplayComponent],
})
export class DisplayModule {}
