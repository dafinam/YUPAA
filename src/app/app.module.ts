import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TourComponent } from "./tour/tour.component";
import { LoginComponent } from "./login/login.component";
import { TourSlidesService } from "./tour/tour-slides.service";
import { NativeScriptFormsModule } from "nativescript-angular";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule
    ],
    providers: [
        TourSlidesService
    ],
    declarations: [
        AppComponent,
        TourComponent,
        LoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
