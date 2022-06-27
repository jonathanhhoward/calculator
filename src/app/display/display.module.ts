import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DisplayComponent } from "./display.component";

@NgModule({
  declarations: [DisplayComponent],
  imports: [CommonModule],
  exports: [DisplayComponent],
})
export class DisplayModule {}
