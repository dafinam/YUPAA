import { Component, OnInit } from "@angular/core";

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

    ngOnInit(): void {
        // this.mainTabView.nativeElement.selectedIndex = 2; // Home tab should be default
    }
}
