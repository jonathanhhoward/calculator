import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { deLete } from "src/app/app.actions";
import { selectStatus, Status } from "src/app/app.feature";

@Component({
  selector: "delete-key",
  templateUrl: "./delete-key.component.html",
})
export class DeleteKeyComponent implements OnInit {
  private status!: Status;

  constructor(private store: Store) {}

  handleClick() {
    if (this.status === "input") {
      this.store.dispatch(deLete());
    }
  }

  ngOnInit(): void {
    this.store.select(selectStatus).subscribe((status) => {
      this.status = status;
    });
  }
}
