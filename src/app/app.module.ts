import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TourComponent } from "./tour/tour.component";
import { LoginComponent } from "./login/login.component";
import { TourSlidesService } from "./tour/tour-slides.service";
import { NativeScriptFormsModule, registerElement } from "nativescript-angular";
import { LoadingComponent } from "./custom-components/loading.component";
import { HidrateComponent } from "./newactivity/hidrate/hidrate.component";
import { NativeScriptDateTimePickerModule } from "nativescript-datetimepicker/angular";
import { GenericActivityComponent } from "./newactivity/generic/generic-activity.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";

registerElement("NumericKeyboard", () => require("nativescript-numeric-keyboard").NumericKeyboardView);

@NgModule({
    bootstrap: [
        AppComponent
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
        TourSlidesService
    ],
    declarations: [
        AppComponent,
        TourComponent,
        LoginComponent,
        LoadingComponent,
        HidrateComponent,
        GenericActivityComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
