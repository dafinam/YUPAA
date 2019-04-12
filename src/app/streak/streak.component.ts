import { Component, OnInit } from "@angular/core";

@Component({
  selector: "Streak",
  moduleId: module.id,
  templateUrl: "./streak.component.html",
  styleUrls: ["./streak.component.scss"]
})
export class StreakComponent implements OnInit {
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Use the "ngOnInit" handler to initialize data for the view.
  }
}
