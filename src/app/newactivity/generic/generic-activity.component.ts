import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivityService } from "~/app/shared/services/activity.service";
import { RouterExtensions, PageRoute } from "nativescript-angular";
import * as statusBar from "nativescript-status-bar";
import { EventData } from "tns-core-modules/ui/page/page";
import { DateTimePicker } from "nativescript-datetimepicker";
import { Button } from "tns-core-modules/ui/button";
import { switchMap } from "rxjs/operators";
import { UserService } from "~/app/shared/services/user.service";
import { Activity } from "~/app/shared/models/activity";
import { ActivityDataService } from "./ActivityData";

@Component({
  moduleId: module.id,
  selector: "generic",
  templateUrl: "./generic-activity.component.html",
  styleUrls: ["./generic-activity.component.scss"]
})
export class GenericActivityComponent implements OnInit {
  showTimePickView: boolean = true;
  showRemindersView: boolean = false;
  showDurationView: boolean = false;
  showSocialMediaView: boolean = false;
  showActivityNameView: boolean = false;
  showSummaryView: boolean = false;
  currentStep!: number;

  /**
   * List of activities that have duration which needs to be provided from user
   *
   * @type {Array<string>}
   * @memberof GenericActivityComponent
   */
  activitiesWithDuration: Array<string> = ["stretching", "meditation", "posture", "generic"];

  /**
   * A list of properties for each activity pre-configured and also for generic one that the
   * user sets up for himself/herself.
   *
   * @type {*}
   * @memberof GenericActivityComponent
   */
  presetActivityDescriptions!: any;

  /* Checkbox element references */
  @ViewChild("mon") mondayCheckBox: ElementRef;
  @ViewChild("tue") tuesdayCheckBox: ElementRef;
  @ViewChild("wed") wednesdayCheckBox: ElementRef;
  @ViewChild("thu") thursdayCheckBox: ElementRef;
  @ViewChild("fri") fridayCheckBox: ElementRef;
  @ViewChild("sat") saturdayCheckBox: ElementRef;
  @ViewChild("sun") sundayCheckBox: ElementRef;

  /**
   * Value used to define which activity is being setup. It is
   * initialized from the route parameter comming from the
   * new activity view.
   *
   * @type {string}
   * @memberof GenericActivityComponent
   */
  selectedActivity: string;

  reminderTime: string;
  reminderDays: Array<string> = [];
  duration: string = "7";
  sharable: boolean = false;
  displayName: string = "";
  _isSubmitting: boolean = false;
  activityData: ActivityDataService;

  constructor(
    private activityService: ActivityService,
    private userService: UserService,
    private router: RouterExtensions,
    private _pageRoute: PageRoute
  ) {
    this.activityData = new ActivityDataService();
  }

  get reminderDaysStr(): string {
    if (this.reminderDays.length === 7) {
      return "Everyday";
    } else if (this.reminderDays.toString() === "mon,tue,wed,thu,fri") {
      return "Workdays";
    } else if (this.reminderDays.toString() === "sat,sun") {
      return "Weekends";
    }

    return this.reminderDays.toString();
  }

  get isSharableStr(): string {
    return this.sharable ? "Yes" : "No";
  }

  get isSubmitting() {
    return this._isSubmitting;
  }

  ngOnInit() {
    statusBar.hide();
    this.currentStep = 1;
    this.presetActivityDescriptions = this.activityData.getData();
    this._pageRoute.activatedRoute
      .pipe(switchMap((activatedRoute) => activatedRoute.params))
      .forEach((params) => {
        const activityname = params.activityname;
        this.selectedActivity = activityname;
        this.displayName = this.presetActivityDescriptions[activityname].name;
      });
  }

  goBack(): void {
    this.router.back();
  }

  getInfoDivParameter(descIdx: number, parameter: string): string {
    const presetActivityDesc = this.presetActivityDescriptions[this.selectedActivity];

    return presetActivityDesc.descriptions[descIdx][parameter];
  }

  getActivityName(): string {
    const presetActivityDesc = this.presetActivityDescriptions[this.selectedActivity];
    if (presetActivityDesc) {
      return presetActivityDesc.name;
    }

    return "Unknown";
  }

  onPickTimeTap(args: EventData): void {
    const dateToday = new Date();
    const dateTomorrow = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() + 1);
    dateTomorrow.setHours(8);
    dateTomorrow.setMinutes(0);
    DateTimePicker.pickTime({
      context: (<Button>args.object)._context,
      time: dateTomorrow,
      okButtonText: "OK",
      cancelButtonText: "Cancel",
      title: "choose time",
      locale: "en_UK",
      is24Hours: true
    }).then((selected: Date) => {
      if (selected) {
        const h = selected.getHours();
        const m = selected.getMinutes();
        const timeText = (h < 10 ? "0" : "") + h + (m < 10 ? "0" : "") + m;
        this.reminderTime = timeText;
        this.showSecondView();
      }
    });
  }

  pickDefinedTime(time: string): void {
    this.reminderTime = time;
    this.showSecondView();
  }

  pickDurationTime(duration: string): void {
    this.duration = duration;
    this.showForthView();
  }

  showSecondView(): void {
    this.showTimePickView = false;
    this.showRemindersView = true;
    this.nextStep();
  }

  showThirdView(): void {
    if (this.mondayCheckBox.nativeElement.checked) { this.reminderDays.push("mon"); }
    if (this.tuesdayCheckBox.nativeElement.checked) { this.reminderDays.push("tue"); }
    if (this.wednesdayCheckBox.nativeElement.checked) { this.reminderDays.push("wed"); }
    if (this.thursdayCheckBox.nativeElement.checked) { this.reminderDays.push("thu"); }
    if (this.fridayCheckBox.nativeElement.checked) { this.reminderDays.push("fri"); }
    if (this.saturdayCheckBox.nativeElement.checked) { this.reminderDays.push("sat"); }
    if (this.sundayCheckBox.nativeElement.checked) { this.reminderDays.push("sun"); }

    this.showRemindersView = false;
    if (this.activitiesWithDuration.indexOf(this.selectedActivity) > -1) {
      this.showDurationView = true;
    } else  {
      this.showSocialMediaView = true;
    }
    this.nextStep();
  }

  showForthView(): void {
    this.showDurationView = false;
    this.showSocialMediaView = true;
    this.nextStep();
  }

  showFifthView(isActivitySharable: boolean): void {
    this.sharable = isActivitySharable;
    this.showSocialMediaView = false;
    this.showActivityNameView = true;
    this.nextStep();
  }

  showSummary(): void {
    this.showActivityNameView = false;
    this.showSummaryView = true;
    this.nextStep();
  }

  nextStep() {
    this.currentStep = this.currentStep + 1;
  }

  get totalSteps() {
    if (this.selectedActivity) {
      return this.activitiesWithDuration.indexOf(this.selectedActivity) > -1 ? 6 : 5;
    }
  }

  get hasDuration() {
    return this.activitiesWithDuration.indexOf(this.selectedActivity) > -1;
  }

  get activityKey() {
    if (this.selectedActivity === "generic") {
      return this.displayName.split(" ").join("_");
    } else {
      return `yupaa_${this.presetActivityDescriptions[this.selectedActivity].activityKey}`;
    }
  }

  setupActivity(): void {
    this._isSubmitting = true;
    this.userService.getUserUid().then((userId) => {
      const activityOpts = {
        user_id: userId,
        activity_name: this.displayName,
        activity_key: this.activityKey,
        times: [this.reminderTime],
        duration: this.hasDuration ? this.duration : 0,
        sharable: this.sharable,
        reminders: this.reminderDays
      };
      const myActivity = new Activity(activityOpts);
      this.activityService.addActivity(myActivity)
        .then(() => this.userService.addUserActivity({ name: activityOpts.activity_key, status: "active" }))
        .then(() => {
          this.router.navigate(["/tabs/default"], {
            animated: true,
            transition: {
              curve: "linear",
              duration: 300,
              name: "slideDown"
            },
            clearHistory: true
          });
        });
    }).catch((err: any) => {
      // TODO: Show toaster notification.
      this._isSubmitting = false;
      console.error(err);
    });
  }
}
