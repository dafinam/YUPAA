import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TourComponent } from "./tour/tour.component";
import { LoginComponent } from "./login/login.component";
import { HidrateComponent } from "./newactivity/hidrate/hidrate.component";
import { GenericActivityComponent } from "./newactivity/generic/generic-activity.component";
import { DoGenericActivityComponent } from "./home/generic-activity/do-generic.component";
import { NewGoalComponent } from "./goals/new-goal/new-goal.component";

const routes: Routes = [
    { path: "", redirectTo: "/tabs/default", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "tour", component: TourComponent },
    { path: "tabs", loadChildren: "~/app/tabs/tabs.module#TabsModule" },
    { path: "hidrate", component: HidrateComponent },
    { path: "activity/:activityname", component: GenericActivityComponent },
    { path: "log-generic/:activitykey/:time", component: DoGenericActivityComponent },
    { path: "new-goal", component: NewGoalComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
