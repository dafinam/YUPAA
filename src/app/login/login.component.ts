import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";

@Component({
  selector: "login",
  moduleId: module.id,
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  constructor(
    private routerExtension: RouterExtensions
  ) { }

  ngOnInit(): void {
    // Use the "ngOnInit" handler to initialize data for the view.
  }

  onNavigateWelcome() {
    // Navigate to welcome page with clearHistory
    this.routerExtension.navigate(["../tour"], { clearHistory: true });
  }
}
