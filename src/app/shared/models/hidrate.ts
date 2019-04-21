export interface IHidrateArguments {
  date: string;
  morning: boolean; // When waking up -> wakeupTime
  lunch: boolean; // During lunch time -> lunchTime
  afternoon: boolean; // Two hours after lunch
  dinner: boolean; // During dinner time -> dinnerTime
  evening: boolean; // One hour after dinner time
  night: boolean; // Is checked before going to bed -> Sleep Time
}

export class Hidrate {
  userId: string;
  wakeupTime: string;
  lunchTime: string;
  dinnerTime: string;
  sleepTime: string;
  activated: boolean;
  logs: Array<IHidrateArguments>;

  constructor(options: any) {
    this.userId = options.id || options.user_id;
    this.wakeupTime = options.wakeup_time || undefined;
    this.lunchTime = options.lunch_time || undefined;
    this.dinnerTime = options.dinner_time || undefined;
    this.sleepTime = options.sleep_time || undefined;
    this.activated = options.activated || true;
    this.logs = options.logs;
  }

  toDocEntries(): any {
    return {
      user_id: this.userId,
      wakeup_time: this.wakeupTime,
      lunch_time: this.lunchTime,
      dinner_time: this.dinnerTime,
      sleep_time: this.sleepTime,
      activated: this.activated,
      logs: this.logs
    };
  }
}
