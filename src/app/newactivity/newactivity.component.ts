import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { User, IUserActivity } from "../shared/models/user";
import { UserService } from "../shared/services/user.service";

@Component({
  selector: "NewActivity",
  moduleId: module.id,
  templateUrl: "./newactivity.component.html",
  styleUrls: ["./newactivity.component.scss"]
})
export class NewActivityComponent implements OnInit {
  userActivities: Array<IUserActivity> = [];

  constructor(
    private router: RouterExtensions,
    private userService: UserService
  ) {
    // Use the component constructor to inject providers.
  }

  isActivityRegistered(activityName: string): boolean {
    return this.userActivities.find(
      (userActivity) => activityName === userActivity.name && userActivity.status === "active"
    ) !== undefined;
  }

  ngOnInit(): void {
    this.userService.getFirestoreUser()
      .then(async (loggedUser: User) => {
        this.userActivities = loggedUser.activities;
      });
  }

  navigateToActivitySetup(route: string): void {
    this.router.navigate([route], {
      animated: true,
      transition: {
        duration: 200,
        name: "slideTop",
        curve: "linear"
      }
    });
  }
}
