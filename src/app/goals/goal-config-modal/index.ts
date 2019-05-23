import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Page } from "tns-core-modules/ui/page";
import { registerElement } from "nativescript-angular";
import { ModalStack, overrideModalViewMethod } from "nativescript-windowed-modal";
registerElement("ModalStack", () => ModalStack);

@Component({
  moduleId: module.id,
  templateUrl: "./modal-view.html",
  styleUrls: ["./modal-view.scss"]
})

export class GoalModalViewComponent implements OnInit {
  background: string = "#FFFFFF";
  goalDescription: string = "";
  goalDueDate: string = "";

  constructor(
    private params: ModalDialogParams,
    private page: Page,
    private router: RouterExtensions,
    private activeRoute: ActivatedRoute) {
    overrideModalViewMethod();
  }

  ngOnInit(): void {
    this.background = this.params.context.background;
    this.goalDescription = this.params.context.goalDescription;
    this.goalDueDate = this.params.context.goalDueDate;
  }

  closeModal(): void {
    this.params.closeCallback(false);
  }

  completeGoal(): void {
    this.params.closeCallback(true);
  }
}
