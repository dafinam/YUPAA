import { Component, OnInit } from "@angular/core";
import { TimePicker } from "tns-core-modules/ui/time-picker";
import { RouterExtensions } from "nativescript-angular";

@Component({
  moduleId: module.id,
  selector: "hidrate",
  templateUrl: "./hidrate.component.html",
  styleUrls: ["./hidrate.component.scss"]
})
export class HidrateComponent implements OnInit {
  private _wakeupTime: Date;
  private _lunchTime: Date;
  private _dinnerTime: Date;
  private _sleepTime: Date;

  constructor(
    private router: RouterExtensions
  ) {
  }

  ngOnInit() {
    // Write init logic here
  }

  goBack(): void {
    this.router.back();
  }

  /** Getters and Setters */
  get wakupTime() {
    return this._wakeupTime;
  }

  set wakupTime(value: Date) {
    this._wakeupTime = value;
  }
  get lunchTime() {
    return this._lunchTime;
  }

  set lunchTime(value: Date) {
    this._lunchTime = value;
  }
  get dinnerTime() {
    return this._dinnerTime;
  }

  set dinnerTime(value: Date) {
    this._dinnerTime = value;
  }
  get sleepTime() {
    return this._sleepTime;
  }

  set sleepTime(value: Date) {
    this._sleepTime = value;
  }
}
