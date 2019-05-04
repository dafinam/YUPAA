import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/services/user.service";
import { User } from "../shared/models/user";
import { RouterExtensions } from "nativescript-angular";
import { ActivityService } from "../shared/services/activity.service";
import { appendZeroPrefix, dayOfWeekIdxToStr } from "~/app/shared/utils/conveniences"

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
  timeBasedActivityKeys: Array<string>  = []

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
      // TODO: Fetch all activities and list them on the home page
      this.isLoading = false;
      const timeActivities = {};
      const d = new Date();
      for (let activity of this.loggedUser.activities) {
        const activityData = await this.activityService.getActivity(`${this.loggedUser.googleUserUid}_${activity.name}`)
        if (activityData.reminders.indexOf(dayOfWeekIdxToStr(d.getDay()))) {
          activityData.times.forEach(time => {
            const activityItem = {
              time,
              activityName: activityData.activityName,
              isCompleted: false,
            }
            if (timeActivities[time]) {
              timeActivities[time].push(activityItem)
            } else {
              timeActivities[time] = [activityItem]
            }
          });
        }
      }

      this.timeBasedActivities = timeActivities
      this.timeBasedActivityKeys = Object.keys(timeActivities).sort((a, b) => (parseInt(a) > parseInt(b)) ? 1 : ((parseInt(b) > parseInt(a)) ? -1 : 0));
    } else {
      /* User has not subscribed for any Yupaa Activities, Goals .... */
      this.isLoading = false;
      this.noActivities = true;
    }
  }

  militaryToDisplayTime(militaryTime: string): string {
    return militaryTime.substr(0, 2) + ":" + militaryTime.substr(2)
  }

  getActivityCompleteImage(activity: any): string {
    const date: Date = new Date();
    const nowMilitaryTime: string = appendZeroPrefix(date.getHours()) + appendZeroPrefix(date.getMinutes());
    if (parseInt(nowMilitaryTime) > parseInt(activity.time) && activity.isCompleted) {
      return "~/assets/images/icons/success.png"
    } else if (parseInt(nowMilitaryTime) > parseInt(activity.time) && !activity.isCompleted) {
      return "~/assets/images/icons/warning.png"
    } else {
      return ""
    }
  }

  formatActivityName(name: string): string {
    const words = name.split("_")
    const capitalCaseWorks = []
    words.forEach(word => {
      capitalCaseWorks.push(word.charAt(0).toUpperCase() + word.substr(1))
    })
    return capitalCaseWorks.join(' ');
  }
}
