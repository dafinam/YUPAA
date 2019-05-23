import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Progress } from "tns-core-modules/ui/progress";
import { RouterExtensions } from "nativescript-angular";
import { GoalsService } from "../shared/services/goals.service";
import { UserService } from "../shared/services/user.service";
import { User } from "../shared/models/user";
import { Goal, GOAL_STATUS_ENUM } from "../shared/models/goal";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { GoalModalViewComponent } from "./goal-config-modal/index";

@Component({
  selector: "Goals",
  moduleId: module.id,
  templateUrl: "./goals.component.html",
  styleUrls: ["./goals.component.scss"]
})
export class GoalsComponent implements OnInit {
  isLoading: boolean = false;
  loggedUser: User;
  userActiveGoals: Array<Goal> = [];
  userCompletedGoals: Array<Goal> = [];
  userFailedGoals: Array<Goal> = [];

  constructor(
    private router: RouterExtensions,
    private userService: UserService,
    private goalsService: GoalsService,
    private vcRef: ViewContainerRef,
    private modalService: ModalDialogService
  ) {
    // Use the component constructor to inject providers.
  }

  get contentGridRows() {
    let rows = "";
    if (this.userActiveGoals.length > 0) {
      rows += "* ";
    }
    if (this.userCompletedGoals.length > 0) {
      rows += "* ";
    }
    if (this.userFailedGoals.length > 0) {
      rows += "* ";
    }

    return rows;
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.userService.getFirestoreUser()
      .then((user: User) => {
        this.loggedUser = user;
        this.loadGoals();
      })
      .catch((error: any) => {
        // TODO: better way of handling errors
        this.isLoading = false;
      });
  }

  daysLeft(dueDateStr: string) {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const dueDate = this.dateStrToDate(dueDateStr);

    const today = new Date();

    const diffDays = Math.round(Math.abs(dueDate.getTime() - today.getTime()) / ONE_DAY);

    return diffDays === 1 ? "1 day left" : `${diffDays} days left`;
  }

  onProgressBarLoaded(args: any, dueDateStr: string, createdOnTimestamp: string) {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const dueDate = this.dateStrToDate(dueDateStr);
    const today = new Date();
    const createdAtMS = parseInt(createdOnTimestamp, 10);

    const diffAddedAndToday = Math.round(Math.abs(createdAtMS - today.getTime()) / ONE_DAY);
    const diffAddedAndDue = Math.round(Math.abs(dueDate.getTime() - createdAtMS) / ONE_DAY);

    const percentage = (diffAddedAndToday / diffAddedAndDue) * 100;
    const myProgressBar = <Progress>args.object;
    myProgressBar.value = percentage;
    myProgressBar.maxValue = 100;
  }

  completedProgressBar(args: any) {
    const myProgressBar = <Progress>args.object;
    myProgressBar.value = 100;
    myProgressBar.maxValue = 100;
  }

  addNewGoal() {
    this.router.navigate(["new-goal"], {
      animated: true,
      transition: {
        duration: 200,
        name: "slideTop",
        curve: "linear"
      }
    });
  }

  openModal(goal: Goal, odd: boolean): void {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: {
        background: odd ? "#6A9BEB" : "#A997DF",
        goalDescription: goal.name,
        goalDueDate: goal.dueDate
      },
      fullscreen: false
    };

    this.modalService.showModal(GoalModalViewComponent, options)
      .then((shouldComplete: boolean) => {
        if (shouldComplete) {
          this.isLoading = true;
          this.goalsService
          .setGoalStatus(`${this.loggedUser.googleUserUid}_${goal.addedOn}`, GOAL_STATUS_ENUM.ACOMPLISHED)
          .then(() => {
            this.loadGoals();
          }).catch((e: any) => {
            console.error(e);
            // TODO: Show some sort of notification
            this.isLoading = false;
          });
        }
      });
  }

  private loadGoals(): void {
    this.goalsService.getUserGoals(this.loggedUser.googleUserUid)
      .then(async (goals: Array<Goal>) => {
        this.emptyLists();
        const failedGoalsPromise = [];
        for (const goal of goals) {
          if (goal.status === GOAL_STATUS_ENUM.ACTIVE) {
            const dueDate = this.dateStrToDate(goal.dueDate);
            if (dueDate.getTime() <= new Date().getTime()) {
              const docId = `${this.loggedUser.googleUserUid}_${goal.addedOn}`;
              failedGoalsPromise.push(this.goalsService.setGoalStatus(docId, GOAL_STATUS_ENUM.FAILED));
              this.userFailedGoals.push(goal);
            } else {
              this.userActiveGoals.push(goal);
            }
          } else if (goal.status === GOAL_STATUS_ENUM.ACOMPLISHED) {
            this.userCompletedGoals.push(goal);
          } else {
            this.userFailedGoals.push(goal);
          }
        }

        if (failedGoalsPromise.length > 0) {
          await Promise.all(failedGoalsPromise);
        }
        this.isLoading = false;
      });
  }

  private dateStrToDate(dateStr: string): Date {
    const dateArr = dateStr.split("/");
    const d = new Date();
    d.setDate(parseInt(dateArr[0], 10));
    d.setMonth(parseInt(dateArr[1], 10) - 1);
    d.setFullYear(parseInt(dateArr[2], 10));

    return d;
  }

  private emptyLists(): void {
    this.userActiveGoals = [];
    this.userCompletedGoals = [];
    this.userFailedGoals = [];
  }
}
