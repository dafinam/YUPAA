import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/services/user.service";
import { RouterExtensions } from "nativescript-angular";
import { User } from "../shared/models/user";
import { ActivityStylingData } from "../home/shared/ActivityStylingData";
import { ActivityService } from "../shared/services/activity.service";
import { Activity } from "../shared/models/activity";

@Component({
  selector: "Profile",
  moduleId: module.id,
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = false;
  googleUser: any = {};
  nickname: string = "";
  activityStylingData: ActivityStylingData;
  userActivities: Array<any> = [];

  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private router: RouterExtensions
  ) {
    this.activityStylingData = new ActivityStylingData();
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.userService.getGoogleUser()
    .then((user: any) => {
      this.googleUser = user;
      this.prepareActivities();
    })
    .catch((error: any) => {
      // TODO: better way of handling errors
      this.isLoading = false;
    });
  }

  prepareActivities(): void {
    this.userService.getFirestoreUser()
      .then(async (loggedUser: User) => {
        const userActiveActivities = [];
        for (const activity of loggedUser.activities) {
          const userActivityDocumentId = `${loggedUser.googleUserUid}_${activity.name}`;
          const activityData: Activity = await this.activityService.getActivity(userActivityDocumentId);
          if (activity.status === "active") {
            userActiveActivities.push({
              name: activityData.activityName,
              key: activityData.activityKey
            });
          }
          this.userActivities = userActiveActivities;
          this.isLoading = false;
        }
      });
  }

  stylingData(activityKey: string) {
    return this.activityStylingData.stylingData()[activityKey];
  }

  logOut() {
    this.userService.logOut()
    .then(() => {
      this.router.navigate(["/login"], {
        animated: true,
        clearHistory: true
      });
    })
    .catch((err: any) => console.error("======= Logout error!", err));
  }

  get userImageUrl(): string {
    return this.googleUser.photoURL;
  }

  get fullname(): string {
    return this.googleUser.displayName;
  }
}
