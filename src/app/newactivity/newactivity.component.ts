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
  activitiesToChooseFrom: Array<any> = [
    {
      name: "Hidrate",
      background: "~/assets/images/newactivity-hidrate.jpg",
      key: "yupaa_hidrate",
      route: "/hidrate"
    },
    {
      name: "Breakfast",
      background: "~/assets/images/newactivity-breakfast.jpg",
      key: "yupaa_healthy_breakfast",
      route: "/activity/breakfast"
    },
    {
      name: "Stretching",
      background: "~/assets/images/newactivity-stretching.png",
      key: "yupaa_stretching",
      route: "/activity/stretching"
    },
    {
      name: "Meditation",
      background: "~/assets/images/newactivity-meditate.png",
      key: "yupaa_meditation",
      route: "/activity/meditation"
    },
    {
      name: "Posture",
      background: "~/assets/images/newactivity-posture.jpg",
      key: "yupaa_posture",
      route: "/activity/posture"
    },
    {
      name: "Study",
      background: "~/assets/images/newactivity-study.png",
      key: "yupaa_study",
      route: "/activity/study"
    },
    {
      name: "Walk",
      background: "~/assets/images/newactivity-walking.jpg",
      key: "yupaa_walk",
      route: "/activity/walk"
    },
    {
      name: "My Own",
      background: "~/assets/images/newactivity-generic.jpg",
      key: "generic",
      route: "/activity/generic"
    }
    // {
    //   name: "Workout",
    //   background: "~/assets/images/newactivity-gym.jpg",
    //   key: "yupaa_workot",
    //   route: "/workout"
    // },
    // {
    //   name: "Climbing",
    //   background: "~/assets/images/newactivity-climbing.jpg",
    //   key: "yupaa_climbing",
    //   route: "/activity/climbing"
    // },
  ];
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
