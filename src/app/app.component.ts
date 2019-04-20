import { Component, OnInit } from "@angular/core";
import { initFirebase } from "./shared/firebase.common";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit() {
        initFirebase();
    }
}
