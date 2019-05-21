import { Component, OnInit } from "@angular/core";
import { Progress } from "tns-core-modules/ui/progress";

@Component({
  selector: "Goals",
  moduleId: module.id,
  templateUrl: "./goals.component.html",
  styleUrls: ["./goals.component.scss"]
})
export class GoalsComponent implements OnInit {
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Use the "ngOnInit" handler to initialize data for the view.
  }

  onProgressBarLoaded(args: any, percentage: number) {
    const myProgressBar = <Progress>args.object;

    myProgressBar.value = percentage;
    myProgressBar.maxValue = 100;
  }
}
