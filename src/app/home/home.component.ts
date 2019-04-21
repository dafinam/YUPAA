import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/services/user.service";
import { User } from "../shared/models/user";
import { RouterExtensions } from "nativescript-angular";

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

  constructor(
    private userService: UserService,
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

  private prepareView() {
    /* First of check if user has any activities subscribed */
    if (this.loggedUser.activities && this.loggedUser.activities.length > 0) {
      // TODO: Fetch all activities and list them on the home page
    } else {
      /* User has not subscribed for any Yupaa Activities, Goals .... */
      this.isLoading = false;
      this.noActivities = true;
    }
  }
}
