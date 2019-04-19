export class User {
    googleUserUid: string;
    completedTour: boolean;
    nickname: string;

  constructor(options: any) {
    this.googleUserUid = options.uid || options.google_user_uid;
    this.completedTour = options.completed_tour || false;
    this.nickname = options.nickname || "";
  }

  toDocEntries(): any {
    return {
      google_user_uid: this.googleUserUid,
      completed_tour: this.completedTour,
      nickname: this.nickname
    };
  }
}
