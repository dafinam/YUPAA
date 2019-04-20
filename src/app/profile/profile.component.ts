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
  isLoading: boolean = false;
  googleUser: any = {};
  nickname: string = "";
  constructor(
    private userService: UserService,
    private router: RouterExtensions
  ) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.userService.getGoogleUser()
    .then((user: any) => {
      this.googleUser = user;
      this.isLoading = false;
    })
    .catch((error: any) => {
      // TODO: better way of handling errors
      this.isLoading = false;
    });
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
