import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TabsComponent } from "./tabs.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild([
      {
        path: "default", component: TabsComponent, children: [
          {
            path: "home",
            component: NSEmptyOutletComponent,
            loadChildren: "~/app/home/home.module#HomeModule",
            outlet: "homeTab"
          },
          {
            path: "social",
            component: NSEmptyOutletComponent,
            loadChildren: "~/app/social/social.module#SocialModule",
            outlet: "socialTab"
          },
          {
            path: "newactivity",
            component: NSEmptyOutletComponent,
            loadChildren: "~/app/newactivity/newactivity.module#NewActivityModule",
            outlet: "newActivityTab"
          },
          {
            path: "streak",
            component: NSEmptyOutletComponent,
            loadChildren: "~/app/streak/streak.module#StreakModule",
            outlet: "streakTab"
          },
          {
            path: "profile",
            component: NSEmptyOutletComponent,
            loadChildren: "~/app/profile/profile.module#ProfileModule",
            outlet: "profileTab"
          }
        ]
      }
    ])
  ],
  declarations: [
    TabsComponent
  ],
  providers: [
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TabsModule { }
