import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { NewActivityComponent } from "./newactivity.component";

const routes: Routes = [
  { path: "", component: NewActivityComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class NewActivityRoutingModule { }
