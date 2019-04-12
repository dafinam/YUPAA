import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { NewActivityRoutingModule } from "./newactivity-routing.module";
import { NewActivityComponent } from "./newactivity.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NewActivityRoutingModule
  ],
  declarations: [
    NewActivityComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class NewActivityModule { }
