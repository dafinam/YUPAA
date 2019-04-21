import { Component, OnInit } from "@angular/core";
import { TimePicker } from "tns-core-modules/ui/time-picker";
import { RouterExtensions } from "nativescript-angular";
import { HidrateService } from "~/app/shared/services/hidrate.service";
import { Hidrate } from "~/app/shared/models/hidrate";
import { UserService } from "~/app/shared/services/user.service";

@Component({
  moduleId: module.id,
  selector: "hidrate",
  templateUrl: "./hidrate.component.html",
  styleUrls: ["./hidrate.component.scss"]
})
export class HidrateComponent implements OnInit {
  isSubmitting: boolean = false;
  private _wakeupTime: Date;
  private _lunchTime: Date;
  private _dinnerTime: Date;
  private _sleepTime: Date;

  constructor(
    private router: RouterExtensions,
    private hidrateActivityService: HidrateService,
    private userService: UserService
  ) {
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

  ngOnInit() {
    // Write init logic here
  }

  goBack(): void {
    this.router.back();
  }

  registerActivity(): void {
    this.isSubmitting = true;
    const wakeupTime: string = this.appendZeroPrefix(
      this.wakupTime.getHours()) + this.appendZeroPrefix(this.wakupTime.getMinutes());
    const lunchTime: string = this.appendZeroPrefix(
      this.lunchTime.getHours()) + this.appendZeroPrefix(this.lunchTime.getMinutes());
    const dinnerTime: string = this.appendZeroPrefix(
      this.dinnerTime.getHours()) + this.appendZeroPrefix(this.dinnerTime.getMinutes());
    const sleepTime: string = this.appendZeroPrefix(
      this.sleepTime.getHours()) + this.appendZeroPrefix(this.sleepTime.getMinutes());
    this.userService.getUserUid().then((userId) => {
      const hidrateActivity: Hidrate = new Hidrate({
        user_id: userId,
        wakeup_time: wakeupTime,
        lunch_time: lunchTime,
        dinner_time: dinnerTime,
        sleep_time: sleepTime,
        logs: []
      });
      this.hidrateActivityService.addEntry(hidrateActivity)
        .then(() => this.userService.addUserActivity({ name: "yupaa_hidrate", status: "active"}))
      .then(() => {
        this.router.navigate(["/tabs/default"], {
          animated: true,
          transition: {
            curve: "linear",
            duration: 300,
            name: "slideDown"
          },
          clearHistory: true
        });
      });
    }).catch((err: any) => {
      this.isSubmitting = false;
      console.error(err);
    });
  }

  appendZeroPrefix(time: number): string {
    return time < 10 ? `0${time}` : time.toString();
  }
}
