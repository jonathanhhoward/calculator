import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectExpression, selectInput } from "../app.feature";

@Component({
  selector: "display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.scss"],
})
export class DisplayComponent implements OnInit {
  expression$!: Observable<string>;
  input$!: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.expression$ = this.store.select(selectExpression);
    this.input$ = this.store.select(selectInput);
  }
}
