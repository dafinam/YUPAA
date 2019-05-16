import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/services/user.service";
import { User } from "../shared/models/user";
import { RouterExtensions } from "nativescript-angular";
import { ActivityService } from "../shared/services/activity.service";
import { appendZeroPrefix, dayOfWeekIdxToStr } from "~/app/shared/utils/conveniences";
import { IActivityLog } from "../shared/models/activity";

@Component({
  selector: "Home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  loggedUser: User;
  isLoading: boolean = false;
  noActivities: boolean = false;
  timeBasedActivities: any;
  timeBasedActivityKeys: Array<string>  = [];

  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private router: RouterExtensions
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    /* Check if the user is logged in by calling isUserLoggedIn on userService */
    this.userService.isUserLoggedIn()
      .then(() => {
        /* Get the user data from "users" collection on firestore */
        this.userService.getFirestoreUser()
          .then((loggedUser: User) => {
            this.loggedUser = loggedUser;
            if (loggedUser.completedTour) {
              this.prepareView();
            } else {
              this.redirectTo("/tour");
            }
          })
          .catch(() => {
            /* Unable to fetch user data, retry logging in! */
            this.redirectTo("/login");
          });
      }).catch(() => {
        /* User does not exist or session is expired, redirect to login page */
        this.redirectTo("/login");
      });
  }

  militaryToDisplayTime(militaryTime: string): string {
    return militaryTime.substr(0, 2) + ":" + militaryTime.substr(2);
  }

  getActivityCompleteImage(activity: any): string {
    const date: Date = new Date();
    const nowMilitaryTime: string = appendZeroPrefix(date.getHours()) + appendZeroPrefix(date.getMinutes());
    if (parseInt(nowMilitaryTime, 10) > parseInt(activity.time, 10) && activity.isCompleted) {
      return "~/assets/images/icons/success.png";
    } else if (parseInt(nowMilitaryTime, 10) > parseInt(activity.time, 10) && !activity.isCompleted) {
      return "~/assets/images/icons/warning.png";
    } else {
      return "";
    }
  }

  formatActivityName(name: string): string {
    const words = name.split("_");
    const capitalCaseWorks = [];
    words.forEach((word) => {
      capitalCaseWorks.push(word.charAt(0).toUpperCase() + word.substr(1));
    });

    return capitalCaseWorks.join(" ");
  }

  logActivityTime(activityKey: string, time: string): void {
    this.router.navigate([`log-generic/${activityKey}/${time}`], {
      animated: true,
      transition: {
        duration: 200,
        name: "slideTop",
        curve: "linear"
      }
    });
  }

  isCompleted(logs: Array<IActivityLog>, time: string) {
    const today = new Date();
    const dFormat = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    if (logs[0] && logs[0].date === dFormat) {
      const times = logs[0].times;

      return times.indexOf(time) >= 0;
    }

    return false;
  }

  /**
   * Redirects to the given route by clearing the routing history
   *
   * @private
   * @param {string} route The route to where the user will be redirected
   * @memberof HomeComponent
   */
  private redirectTo(route: string): void {
    this.router.navigate([route], {
      animated: true,
      clearHistory: true
    });
  }

  private async prepareView() {
    /* First of check if user has any activities subscribed */
    if (this.loggedUser.activities && this.loggedUser.activities.length > 0) {
      this.isLoading = false;
      const timeActivities = {};
      const d = new Date();
      for (const activity of this.loggedUser.activities) {
        const userActivityDocumentId = `${this.loggedUser.googleUserUid}_${activity.name}`;
        const activityData = await this.activityService.getActivity(userActivityDocumentId);
        if (activityData.reminders.indexOf(dayOfWeekIdxToStr(d.getDay()))) {
          activityData.times.forEach((time) => {
            const activityItem = {
              time,
              activityKey: activityData.activityKey,
              activityName: activityData.activityName
            };
            if (!this.isCompleted(activityData.logs, time)) {
              if (timeActivities[time]) {
                timeActivities[time].push(activityItem);
              } else {
                timeActivities[time] = [activityItem];
              }
            }
          });
        }
      }

      this.timeBasedActivities = timeActivities;
      this.timeBasedActivityKeys = Object.keys(timeActivities).sort(
        (a, b) => (parseInt(a, 10) > parseInt(b, 10)) ? 1 : ((parseInt(b, 10) > parseInt(a, 10)) ? -1 : 0)
      );
    } else {
      /* User has not subscribed for any Yupaa Activities, Goals .... */
      this.isLoading = false;
      this.noActivities = true;
    }
  }
}
