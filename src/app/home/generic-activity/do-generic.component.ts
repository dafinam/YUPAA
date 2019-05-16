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

  ngOnInit() {
    this.isLoading = true;
    statusBar.hide();
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

  goBack(): void {
    this.router.back();
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
    await this.sleep(3);
    const today = new Date();
    const date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    const log: IActivityLog = {
      date,
      times: [this.activityTime]
    };
    this.userService.getUserUid()
    .then((userId) => {
      const docId = `${userId}_${this.activityKey}`;
      this.activityService.logActivity(docId, log)
      .then(() => {
        this.router.navigate(["/tabs/default"], {
          animated: true,
          transition: {
            curve: "linear",
            duration: 300,
            name: "fade"
          },
          clearHistory: true
        });
      }).catch((e: any) => {
        // TODO: Show error notification
        console.log(e);
      });
    });
  }

  private async sleep(seconds: number): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(), seconds * 1000));
  }
}
