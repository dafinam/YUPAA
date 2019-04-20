import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TourComponent } from "./tour/tour.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    { path: "", redirectTo: "/tour", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "tour", component: TourComponent },
    { path: "tabs", loadChildren: "~/app/tabs/tabs.module#TabsModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
