import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import * as firebase from "nativescript-plugin-firebase";
import { topmost } from "tns-core-modules/ui/frame";

import { User } from "../shared/models/User.model";
import { UserService } from "../shared/services/user.service";

@Component({
  selector: "login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  constructor(
    private _router: RouterExtensions,
    private _userService: UserService
  ) { }

  onGoogleLogin() {
    firebase
      .login({
        type: firebase.LoginType.GOOGLE,
        ios: {
          controller: topmost().ios.controller
        }
      })
      .then((res: any) => {
        const user = new User({ uid: res.uid });
        this._userService
          .createNewUserInstance(user)
          .then(() => {
            const timeout = setTimeout(() => {
              clearTimeout(timeout);
              this._router.navigate(["/tour"], {
                animated: false,
                clearHistory: true
              });
            }, 300);
          })
          .catch((docWriteErr: any) => {
            // TODO: give feedback to user
            console.log(docWriteErr);
          });
      })
      .catch((errorMessage: any) => {
        console.log(errorMessage);
      });
  }
}
