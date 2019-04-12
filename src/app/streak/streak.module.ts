import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { StreakRoutingModule } from "./streak-routing.module";
import { StreakComponent } from "./streak.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    StreakRoutingModule
  ],
  declarations: [
    StreakComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class StreakModule { }
