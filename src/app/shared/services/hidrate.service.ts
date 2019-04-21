import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Hidrate } from "../models/hidrate";

@Injectable({
  providedIn: "root"
})
export class HidrateService {

  getUserEntry(userId: string): Promise<Hidrate> {
    return firebase.firestore
    .collection("yupaa_hidrate")
    .doc(userId)
    .get()
    .then((hidrateDoc: any) => {
      if (hidrateDoc.exists) {
        const userHidrateActivity = new Hidrate(hidrateDoc);

        return userHidrateActivity;
      } else {

        return undefined;
      }
    });
  }

  addEntry(hidrateActivity: Hidrate): Promise<any> {
    return firebase.firestore
      .collection("yupaa_hidrate")
      .doc(hidrateActivity.userId)
      .set(hidrateActivity.toDocEntries())
      .then((docRef: any) => {
        return Promise.resolve();
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  }
}
