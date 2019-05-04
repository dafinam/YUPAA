import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { UserService } from "~/app/shared/services/user.service";
import { ActivityService } from "~/app/shared/services/activity.service";
import { Activity } from "~/app/shared/models/activity";
import { appendZeroPrefix } from "~/app/shared/utils/conveniences"

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
    private activityService: ActivityService,
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
    const wakeupTime: string = appendZeroPrefix(
      this.wakupTime.getHours()) + appendZeroPrefix(this.wakupTime.getMinutes());
    
    const beforeLunch = new Date(this.lunchTime.getTime());
    beforeLunch.setMinutes(beforeLunch.getMinutes() - 30); // 30 Minutes Before Lunch
    const beforeLunchTime: string = appendZeroPrefix(
      beforeLunch.getHours()) + appendZeroPrefix(beforeLunch.getMinutes());

    const afterLunch = new Date(this.lunchTime.getTime());
    afterLunch.setMinutes(afterLunch.getMinutes() + 30);
    const afterLunchTime: string = appendZeroPrefix(
      afterLunch.getHours()) + appendZeroPrefix(afterLunch.getMinutes());

    const dinnerTime: string = appendZeroPrefix(
      this.dinnerTime.getHours()) + appendZeroPrefix(this.dinnerTime.getMinutes());

    const sleepTime: string = appendZeroPrefix(
      this.sleepTime.getHours()) + appendZeroPrefix(this.sleepTime.getMinutes());

    this.userService.getUserUid().then((userId) => {
      const hidrateActivity: Activity = new Activity({
        user_id: userId,
        activity_name: "yupaa_hidrate",
        times: [
          wakeupTime,
          beforeLunchTime,
          afterLunchTime,
          dinnerTime,
          sleepTime
        ],
        reminders: ["mon", "tue", "wed", "thur", "fri", "sat", "sun"]
      });
      this.activityService.addActivity(hidrateActivity)
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
}
