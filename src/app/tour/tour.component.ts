import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { isAndroid } from "tns-core-modules/platform";

@Component({
  selector: "Tour",
  moduleId: module.id,
  templateUrl: "tour.component.html",
  styleUrls: ["./tour.component.scss"]
})
export class TourComponent implements OnInit {

  constructor(
    private router: RouterExtensions
  ) {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  navigateHome(): void {
    this.router.navigate(["tabview"]);
  }
}
