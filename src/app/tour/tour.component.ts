import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { UserService } from "../shared/services/user.service";

@Component({
  selector: "Tour",
  moduleId: module.id,
  templateUrl: "tour.component.html",
  styleUrls: ["./tour.component.scss"]
})
export class TourComponent implements OnInit {

  constructor(
    private router: RouterExtensions,
    private userService: UserService
  ) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.userService.isUserLoggedIn().then(() => {
      // TODO: Check if tour completed
    }).catch((error: any) => {
      this.router.navigate(["/login"], {
        animated: true,
        clearHistory: true
      });
    });
  }

  navigateHome(): void {
    this.router.navigate(["tabview"]);
  }
}
