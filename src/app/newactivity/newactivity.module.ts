import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { NewActivityRoutingModule } from "./newactivity-routing.module";
import { NewActivityComponent } from "./newactivity.component";
import { TNSCheckBoxModule } from "nativescript-checkbox/angular";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NewActivityRoutingModule,
    TNSCheckBoxModule
  ],
  declarations: [
    NewActivityComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class NewActivityModule { }
