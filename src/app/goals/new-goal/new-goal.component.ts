
import { Component, OnInit, OnDestroy } from "@angular/core";
import * as statusBar from "nativescript-status-bar";
import { RouterExtensions } from "nativescript-angular";
import { EventData } from "tns-core-modules/ui/page/page";
import { DateTimePicker } from "nativescript-datetimepicker";
import { Button } from "tns-core-modules/ui/button/button";
import { UserService } from "~/app/shared/services/user.service";
import { GoalsService } from "~/app/shared/services/goals.service";
import { Goal } from "~/app/shared/models/goal";

@Component({
  moduleId: module.id,
  selector: "new-goal",
  templateUrl: "./new-goal.component.html",
  styleUrls: ["./new-goal.component.scss"]
})
export class NewGoalComponent implements OnInit, OnDestroy {
  goalName: string;
  goalDueDate: string;
  _isSubmitting: boolean = false;

  constructor(
    private router: RouterExtensions,
    private userService: UserService,
    private goalService: GoalsService
  ) {}

  get isSubmitting() {
    return this._isSubmitting;
  }

  ngOnInit(): void {
    statusBar.hide();
  }

  ngOnDestroy(): void {
    statusBar.show();
  }

  goBack(): void {
    this.router.back();
  }

  onPickDateTap(args: EventData): void {
    const dateToday = new Date();
    const dateTomorrow = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() + 1);
    DateTimePicker.pickDate({
      context: (<Button>args.object)._context,
      date: dateTomorrow,
      minDate: dateTomorrow,
      okButtonText: "OK",
      cancelButtonText: "Cancel",
      title: "Pick Due Date",
      locale: "en_GB"
    }).then((selectedDate: Date) => {
      if (selectedDate) {
        this.goalDueDate = this.getFormattedDate(selectedDate);
      }
    });
  }

  getFormattedDate(date: Date): string {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();

    return (d < 10 ? "0" : "") + d + "/" + (m < 10 ? "0" : "") + m + "/" + y;
  }

  createNewGoal() {
    if (this.goalName !== "" && this.goalDueDate !== "") {
      this._isSubmitting = true;
      this.userService.getUserUid().then((userId) => {
        const goalOpts = {
          google_user_uid: userId,
          name: this.goalName,
          due_date: this.goalDueDate,
          added_on: new Date().getTime()
        };
        const newGoal = new Goal(goalOpts);
        this.goalService.addNewGoal(newGoal, `${userId}_${goalOpts.added_on}`)
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
}
