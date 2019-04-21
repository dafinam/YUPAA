import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";

@Component({
  selector: "NewActivity",
  moduleId: module.id,
  templateUrl: "./newactivity.component.html",
  styleUrls: ["./newactivity.component.scss"]
})
export class NewActivityComponent implements OnInit {
  constructor(
    private router: RouterExtensions
  ) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Use the "ngOnInit" handler to initialize data for the view.
  }

  navigateToActivitySetup(route: string): void {
    this.router.navigate([route], {
      animated: true,
      transition: {
        duration: 200,
        name: "slideTop",
        curve: "linear"
      }
    });
  }
}
