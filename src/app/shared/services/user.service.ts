import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import DataFetchError from "../utils/datafetch.error";
import { queryToModelOptions } from "../utils/conveniences";
import { User, IUserActivity } from "./../models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  isUserLoggedIn(): Promise<any> {
    return new Promise((resolve, reject) =>
      firebase
        .getCurrentUser()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject();
        })
    );
  }

  getGoogleUser(): Promise<any> {
    return firebase.getCurrentUser();
  }

  getUserUid(): Promise<string> {
    return firebase
      .getCurrentUser()
      .then((user: any) => {
        return user.uid;
      })
      .catch((err: any) => {
        throw new Error("User is not logged in!");
      });
  }

  logOut(): Promise<any> {
    return firebase.logout();
  }

  createNewUserInstance(user: User) {
    return firebase.firestore
      .collection("users")
      .doc(user.googleUserUid)
      .get()
      .then((userDoc: any) => {
        if (userDoc.exists) {
          return Promise.resolve();
        } else {
          return firebase.firestore
            .collection("users")
            .doc(user.googleUserUid)
            .set(user.toDocEntries())
            .then((docRef: any) => {
              return Promise.resolve();
            })
            .catch((error: any) => {
              throw new Error(error);
            });
        }
      });
  }

  getFirestoreUser(): Promise<User> {
    return this.getUserUid().then((uid: string) => {
      return firebase.firestore
        .collection("users")
        .doc(uid)
        .get()
        .then((userDoc) => {
          if (userDoc.exists) {
            const opts = queryToModelOptions(userDoc);

            return new User(opts);
          } else {
            return undefined;
          }
        })
        .catch((error) => {
          throw new DataFetchError(error);
        });
    });
  }

  completeTourForUser(user: User): Promise<boolean> {
    return firebase.firestore
    .collection("users")
    .doc(user.googleUserUid)
    .update({
      completed_tour: true,
      nickname: user.nickname
    })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.error("Failed updating the user ", error);

      return false;
    });
  }

  addUserActivity(newActivity: IUserActivity): Promise<boolean> {
    return this.getFirestoreUser()
      .then((user: User) => {
        const updatedActivities = user.activities || [];
        updatedActivities.push(newActivity);

        return firebase.firestore
        .collection("users")
        .doc(user.googleUserUid)
        .update({
          activities: updatedActivities
        })
        .then(() => {
          return true;
        })
        .catch((error) => {
          console.error("Failed updating the user ", error);

          return false;
        });
    });
  }
}
