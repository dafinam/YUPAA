import * as firebase from "nativescript-plugin-firebase";

/* ***********************************************************
 * The {N} Firebase plugin initialization is explained in the plugin readme here:
 * https://github.com/EddyVerbruggen/nativescript-plugin-firebase#usage
 * Another important part of the initialization are the prerequisites:
 * https://github.com/EddyVerbruggen/nativescript-plugin-firebase#prerequisites
 * In this template, Firebase is set up with a custom existing project, so that
 * You can build and run this template without creating your own Firebase project.
 * Note that if you change the bundle id of the application, the Firebase configuration
 * will stop working.
 *************************************************************/

export function initFirebase() {
  firebase
    .init({
      persist: false
      // onAuthStateChanged: function (data) {
      // optional but useful to immediately re-logon the user when he re-visits your app
      //   console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
      //   if (data.loggedIn) {
      //     console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
      //   }
      // },
    })
    .catch((error: any) => console.error("firebase.init error: " + error));
}
