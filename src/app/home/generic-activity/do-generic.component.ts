import { Component, OnInit, OnDestroy } from "@angular/core";
import * as statusBar from "nativescript-status-bar";
import { RouterExtensions, PageRoute } from "nativescript-angular";
import { switchMap } from "rxjs/operators";
import { ActivityService } from "~/app/shared/services/activity.service";
import { UserService } from "~/app/shared/services/user.service";
import { IActivityLog, Activity } from "~/app/shared/models/activity";

@Component({
  moduleId: module.id,
  selector: "do-generic",
  templateUrl: "./do-generic.component.html",
  styleUrls: ["./do-generic.component.scss"]
})
export class DoGenericActivityComponent implements OnInit, OnDestroy {
  activityStylingData: any = {
    yupaa_hidrate: {
      pageBackground: "#59D2FE",
      btnBorderColor: "#FFFFFF",
      btnMainColor: "#FE5F55",
      icon: "~/assets/images/icons/drop.png",
      activityTitle: "Drink Water"
    },
    yupaa_healthy_breakfast: {
      pageBackground: "#F0B67F",
      btnBorderColor: "#FFFFFF",
      btnMainColor: "#FE5F55",
      icon: "~/assets/images/icons/breakfast-white.png",
      activityTitle: "Eat Breakfast"
    },
    yupaa_stretching: {
      pageBackground: "#C7EFCF",
      btnBorderColor: "#FFFFFF",
      btnMainColor: "#FE5F55",
      icon: "~/assets/images/icons/stretching-white.png",
      activityTitle: "Stretch"
    }
  };

  showCompleteAnimation: boolean = false;
  isLoading: boolean = false;
  canNavigateHome: boolean = false;
  todaysDateStr: string;
  todayStreakNr: string;
  completedStreakDays: Array<string> = [];

  activityTime: string;
  activityKey: string;
  activityData: Activity;
  durationCountDown: number;

  constructor(
    private activityService: ActivityService,
    private userService: UserService,
    private router: RouterExtensions,
    private pageRoute: PageRoute
  ) {}

  get stylingData() {
    return this.activityStylingData[this.activityKey];
  }

  get hasDuration() {
    return this.activityData && this.activityData.duration !== 0;
  }

  get durationTimer() {
    if (this.hasDuration && this.durationCountDown) {
      const m = Math.floor(this.durationCountDown % 3600 / 60);
      const s = Math.floor(this.durationCountDown % 3600 % 60);

      return m + ":" + (s > 9 ? s : `0${s}`);
    }

    return "";
  }

  get dailyActivityTaskNr() {
    return this.todayStreakNr ? this.todayStreakNr : "";
  }

  ngOnInit() {
    statusBar.hide();
    const today = new Date();
    this.todaysDateStr = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    this.isLoading = true;
    this.pageRoute.activatedRoute
      .pipe(switchMap((activatedRoute) => activatedRoute.params))
      .forEach((params) => {
        this.activityKey = params.activitykey;
        this.activityTime = params.time;
      });
    this.userService.getUserUid()
    .then((userId) => {
      this.activityService.getActivity(`${userId}_${this.activityKey}`)
        .then(async (activityData: Activity) => {
          this.activityData = activityData;
          this.isLoading = false;
          await this.sleep(1);
          this.startDurationCountDown();
          this.prepareStreakInfo();
        })
        .catch((e) => {
          // TODO: Show notification error
          console.error(e);
          this.isLoading = false;
        });
    });
    
  }

  ngOnDestroy() {
    statusBar.show();
  }

  navigateHome(): void {
    this.router.navigate(["/tabs/default"], {
      animated: true,
      transition: {
        curve: "linear",
        duration: 300,
        name: "fade"
      },
      clearHistory: true
    });
  }

  startDurationCountDown() {
    if (this.hasDuration) {
      this.durationCountDown = this.activityData.duration * 60; // In minutes
      const countDownInterval = setInterval(() => {
        this.durationCountDown = this.durationCountDown - 1;
        if (this.durationCountDown === 0) {
          clearInterval(countDownInterval);
        }
      }, 1000);
    }
  }

  async logActivity() {
    this.showCompleteAnimation = true;
    const log: IActivityLog = {
      date: this.todaysDateStr,
      times: [this.activityTime]
    };
    this.userService.getUserUid()
    .then((userId) => {
      const docId = `${userId}_${this.activityKey}`;
      this.activityService.logActivity(docId, log)
      .then(() => {
        // TODO: Show success notification
        this.canNavigateHome = true;
      }).catch((e: any) => {
        // TODO: Show error notification
        console.log(e);
      });
    });
  }

  async prepareStreakInfo() {
    const reminders = this.activityData.reminders;
    const times = this.activityData.times;
    let todayStreakNr = 0;
    let dayStreaks = 0;
    const streakDaysStr = [];

    if (this.activityData.logs[0] !== undefined && this.activityData.logs[0].date === this.todaysDateStr) {
      todayStreakNr = this.activityData.logs[0].times.length + 1;
    } else {
      todayStreakNr = 1;
    }
    this.todayStreakNr = todayStreakNr + "/" + times.length;

    const today = new Date();
    let dayBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

    for (const activityLog of this.activityData.logs) {
      if (activityLog && activityLog.date !== this.todaysDateStr) {
        const dArray = activityLog.date.split("-");
        const logDate = new Date(parseInt(dArray[2], 10), parseInt(dArray[1], 10) - 1, parseInt(dArray[0], 10));
        if (reminders.indexOf(this.dayNrToStr(dayBefore.getDay()))) {
          if (dayBefore.getTime() === logDate.getTime()) {
            // Its a streak
            dayStreaks += 1;
            streakDaysStr.push(this.dayNrToStr(logDate.getDay()).charAt(0).toUpperCase());
          } else {
            // break the streak
            break;
          }
        }
        dayBefore = new Date(dayBefore.getTime() - (24 * 60 * 60 * 1000)); // Subtract a day
      }
    }
    this.completedStreakDays = streakDaysStr.reverse();
  }

  private async sleep(seconds: number): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(), seconds * 1000));
  }

  private dayNrToStr(dayOfWeek: number): string {
    switch (dayOfWeek) {
      case 0:
        return "sun";
      case 1:
        return "mon";
      case 2:
        return "tue";
      case 3:
        return "wed";
      case 4:
        return "thu";
      case 5:
        return "fri";
      case 6:
        return "sat";
      default:
        return "N/A";
    }
  }
}
