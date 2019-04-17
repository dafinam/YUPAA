import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/services/user.service";
import { RouterExtensions } from "nativescript-angular";

@Component({
  selector: "Profile",
  moduleId: module.id,
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: RouterExtensions
  ) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Use the "ngOnInit" handler to initialize data for the view.
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
}
