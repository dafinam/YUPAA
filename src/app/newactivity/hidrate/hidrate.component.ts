import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { UserService } from "~/app/shared/services/user.service";
import { ActivityService } from "~/app/shared/services/activity.service";
import { Activity } from "~/app/shared/models/activity";
import { appendZeroPrefix } from "~/app/shared/utils/conveniences";
import { EventData } from "tns-core-modules/ui/page/page";
import { DateTimePicker } from "nativescript-datetimepicker";
import { Button } from "tns-core-modules/ui/button";
import * as statusBar from "nativescript-status-bar";

@Component({
  moduleId: module.id,
  selector: "hidrate",
  templateUrl: "./hidrate.component.html",
  styleUrls: ["./hidrate.component.scss"]
})
export class HidrateComponent implements OnInit {
  isSubmitting: boolean = false;
  private _wakeupTime: string = "0700";
  private _lunchTime: string = "1100";
  private _dinnerTime: string = "1800";
  private _sleepTime: string = "2300";
  private beforeLunch!: string;
  private afterLunch!: string;

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
  set wakupTime(value: string) {
    this._wakeupTime = value;
  }

  get lunchTime() {
    return this._lunchTime;
  }
  set lunchTime(value: string) {
    this._lunchTime = value;
  }

  get dinnerTime() {
    return this._dinnerTime;
  }
  set dinnerTime(value: string) {
    this._dinnerTime = value;
  }

  get sleepTime() {
    return this._sleepTime;
  }
  set sleepTime(value: string) {
    this._sleepTime = value;
  }

  ngOnInit() {
    statusBar.hide();
  }

  goBack(): void {
    this.router.back();
  }

  onPickTimeTap(args: EventData, selectingTime: string, preferredHour: number, preferredMinutes: number): void {
    const dateToday = new Date();
    const dateTomorrow = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() + 1);
    dateTomorrow.setHours(preferredHour);
    dateTomorrow.setMinutes(preferredMinutes);
    DateTimePicker.pickTime({
      context: (<Button>args.object)._context,
      time: dateTomorrow,
      okButtonText: "OK",
      cancelButtonText: "Cancel",
      title: "choose time",
      locale: "en_UK",
      is24Hours: true
    }).then((selected: Date) => {
      if (selected) {
        const h = selected.getHours();
        const m = selected.getMinutes();
        const timeText = (h < 10 ? "0" : "") + h + (m < 10 ? "0" : "") + m;

        if (selectingTime === "wakupTime") {
          this.wakupTime = timeText;
        } else if (selectingTime === "lunchTime") {
          this.lunchTime = timeText;
          const beforeLunch = new Date(selected.getTime());
          beforeLunch.setMinutes(beforeLunch.getMinutes() - 30); // 30 Minutes Before Lunch
          this.beforeLunch = appendZeroPrefix(beforeLunch.getHours()) + appendZeroPrefix(beforeLunch.getMinutes());

          const afterLunch = new Date(selected.getTime());
          afterLunch.setMinutes(afterLunch.getMinutes() + 30);
          this.afterLunch = appendZeroPrefix(afterLunch.getHours()) + appendZeroPrefix(afterLunch.getMinutes());
        } else if (selectingTime === "dinnerTime") {
          this.dinnerTime = timeText;
        } else if (selectingTime === "sleepTime") {
          this.sleepTime = timeText;
        }
      }
    });
  }

  registerActivity(): void {
    this.isSubmitting = true;

    this.userService.getUserUid().then((userId) => {
      const hidrateActivity: Activity = new Activity({
        user_id: userId,
        activity_name: "Hidrate",
        activity_key: "yupaa_hidrate",
        times: [
          this.wakupTime,
          this.beforeLunch,
          this.afterLunch,
          this.dinnerTime,
          this.sleepTime
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
