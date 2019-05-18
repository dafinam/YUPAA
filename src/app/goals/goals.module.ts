import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { GoalsRoutingModule } from "./goals-routing.module";
import { GoalsComponent } from "./goals.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    GoalsRoutingModule
  ],
  declarations: [
    GoalsComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class GoalsModule { }
