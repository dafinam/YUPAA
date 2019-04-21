export interface IUserActivity {
  name: string;
  status: string;
}

export class User {
  googleUserUid: string;
  completedTour: boolean;
  nickname: string;
  activities: Array<IUserActivity>;

  constructor(options: any) {
    this.googleUserUid = options.uid || options.google_user_uid;
    this.completedTour = options.completed_tour || false;
    this.nickname = options.nickname || "";
    this.activities = options.activities || undefined;
  }

  toDocEntries(): any {
    return {
      google_user_uid: this.googleUserUid,
      completed_tour: this.completedTour,
      nickname: this.nickname,
      activities: this.activities
    };
  }
}
