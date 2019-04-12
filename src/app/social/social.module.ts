import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SocialRoutingModule } from "./social-routing.module";
import { SocialComponent } from "./social.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    SocialRoutingModule
  ],
  declarations: [
    SocialComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SocialModule { }
