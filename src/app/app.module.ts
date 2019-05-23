import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TourComponent } from "./tour/tour.component";
import { LoginComponent } from "./login/login.component";
import { TourSlidesService } from "./tour/tour-slides.service";
import { NativeScriptFormsModule, registerElement, ModalDialogService } from "nativescript-angular";
import { LoadingComponent } from "./custom-components/loading.component";
import { HidrateComponent } from "./newactivity/hidrate/hidrate.component";
import { NativeScriptDateTimePickerModule } from "nativescript-datetimepicker/angular";
import { GenericActivityComponent } from "./newactivity/generic/generic-activity.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { DoGenericActivityComponent } from "./home/generic-activity/do-generic.component";
import { NewGoalComponent } from "./goals/new-goal/new-goal.component";
import { GoalModalViewComponent } from "./goals/goal-config-modal";

registerElement("NumericKeyboard", () => require("nativescript-numeric-keyboard").NumericKeyboardView);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        GoalModalViewComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptCommonModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptDateTimePickerModule
    ],
    exports: [
        LoadingComponent
    ],
    providers: [
        TourSlidesService,
        ModalDialogService
    ],
    declarations: [
        AppComponent,
        TourComponent,
        LoginComponent,
        LoadingComponent,
        HidrateComponent,
        GenericActivityComponent,
        DoGenericActivityComponent,
        NewGoalComponent,
        GoalModalViewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
