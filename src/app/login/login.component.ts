import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import * as firebase from "nativescript-plugin-firebase";
import { topmost, isAndroid } from "tns-core-modules/ui/frame";

import { User } from "../shared/models/user";
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
    let iosOpts: any = {};
    if (!isAndroid) {
      iosOpts = {
        ios: {
          controller: topmost().ios.controller
        }
      };
    }
    firebase
      .login({
        type: firebase.LoginType.GOOGLE,
        ios: iosOpts
      })
      .then((res: any) => {
        const user = new User({ uid: res.uid });
        this._userService
          .createNewUserInstance(user)
          .then(() => {
            this._router.navigate(["/tour"], {
              animated: true,
              clearHistory: true
            });
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
