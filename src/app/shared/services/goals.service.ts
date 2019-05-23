import { Injectable } from "@angular/core";
import { Goal } from "../models/goal";
import * as firebase from "nativescript-plugin-firebase";
import { queryToModelOptions } from "../utils/conveniences";

@Injectable({
  providedIn: "root"
})
export class GoalsService {

  addNewGoal(goalData: Goal, docID: string): Promise<any> {
    return firebase.firestore
      .collection("user_goals")
      .doc(docID)
      .set(goalData.toDocEntries())
      .then((docRef: any) => Promise.resolve(docRef))
      .catch((error: any) => Promise.reject(new Error(error)));
  }

  getUserGoals(userId: string): Promise<Array<Goal>> {
    const goalsRef = firebase.firestore.collection("user_goals");

    const userGoalsQuery = goalsRef.where("google_user_uid", "==", userId);

    return userGoalsQuery.get()
    .then((userGoalsSnapshot: any) => {
      const userGoals: Array<Goal> = [];
      userGoalsSnapshot.forEach((doc: any) => {
        const opts = queryToModelOptions(doc);
        userGoals.push(new Goal(opts));
      });

      return userGoals;
    });
  }

  setGoalStatus(docId: string, status: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.firestore
        .collection("user_goals")
        .doc(docId)
        .update({
          status
        }).then(() => resolve())
        .catch((e: any) => reject(new Error(e)));
    });
  }
}
