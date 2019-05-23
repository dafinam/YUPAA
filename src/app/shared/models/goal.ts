export const GOAL_STATUS_ENUM = Object.freeze({ ACTIVE: "active", ACOMPLISHED: "acomplished", FAILED: "failed"});

export class Goal {
  googleUserUid: string;
  name: string;
  dueDate: string;
  addedOn: string;
  status: any;

  constructor(options: any) {
    this.googleUserUid = options.uid || options.google_user_uid;
    this.name = options.name || false;
    this.dueDate = options.due_date || "";
    this.addedOn = options.added_on || "";
    this.status = options.status || GOAL_STATUS_ENUM.ACTIVE;
  }

  toDocEntries(): any {
    return {
      google_user_uid: this.googleUserUid,
      name: this.name,
      due_date: this.dueDate,
      added_on: this.addedOn,
      status: this.status
    };
  }
}
