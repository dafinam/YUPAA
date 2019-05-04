import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Activity } from "../models/activity";
import { queryToModelOptions } from "../utils/conveniences";

@Injectable({
  providedIn: "root"
})
export class ActivityService {

  hasUserActivityCollection (userId: string): Promise<boolean> {
    return firebase.firestore.collection("yupaa_activities")
    .doc(userId)
    .get()
    .then((userCollection: any) => {
      return userCollection.exists;
    })
    .catch((error: any) => false);
  }

  addActivity(activityData: Activity): Promise<any> {
    return firebase.firestore
      .collection("yupaa_activities")
      .doc(`${activityData.userId}_${activityData.activityName}`)
      .set(activityData.toDocEntries())
      .then((docRef: any) => Promise.resolve(docRef))
      .catch((error: any) => Promise.reject(new Error(error)));
  }

  getActivity(docId: string): Promise<Activity> {
    return firebase.firestore
    .collection("yupaa_activities")
    .doc(docId)
    .get()
    .then((activityDoc: any) => {
      if (activityDoc.exists) {
        const opts = queryToModelOptions(activityDoc);
        return new Activity(opts);
      }
      return undefined;
    })
  }

}