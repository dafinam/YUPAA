import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Activity, IActivityLog } from "../models/activity";
import { queryToModelOptions } from "../utils/conveniences";

@Injectable({
  providedIn: "root"
})
export class ActivityService {

  hasUserActivityCollection(userId: string): Promise<boolean> {
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
      .doc(`${activityData.userId}_${activityData.activityKey}`)
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
    });
  }

  logActivity(docId: string, newLog: IActivityLog): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getActivity(docId)
      .then((activity: Activity) => {
        const logs = activity.logs || [];
        if (logs[0] && logs[0].date === newLog.date) {
          const updatedTimes = logs[0].times;
          updatedTimes.push(newLog.times[0]);
          logs[0].times = updatedTimes;
        } else {
          logs.unshift(newLog);
        }

        return firebase.firestore
          .collection("yupaa_activities")
          .doc(docId)
          .update({
            logs
          }).then(() => resolve())
          .catch((e: any) => reject(new Error(e)));
      });
    });
  }
}
