export interface IActivityLog {
  date: string;
  times: Array<string>;
}

export class Activity {
  userId: string;
  activityName: string;
  activityKey: string;
  times: Array<string>;
  duration: number;
  activated: boolean;
  isPrivate: boolean;
  sharable: boolean;
  reminders: Array<string>;
  logs: Array<IActivityLog>;

  constructor(options: any) {
    this.userId = options.id || options.user_id;
    this.activityName = options.activity_name;
    this.activityKey = options.activity_key;
    this.times = options.times || [];
    this.duration = options.duration || 0;
    this.activated = options.activated || true;
    this.isPrivate = options.is_private || true;
    this.sharable = options.sharable || false;
    this.reminders = options.reminders || [];
    this.logs = options.logs || [];
  }

  toDocEntries(): any {
    return {
      activity_name: this.activityName,
      activity_key: this.activityKey,
      times: this.times,
      duration: this.duration,
      activated: this.activated,
      is_private: this.isPrivate,
      sharable: this.sharable,
      reminders: this.reminders,
      logs: this.logs
    };
  }
}
