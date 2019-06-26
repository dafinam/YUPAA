import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { isAndroid } from "tns-core-modules/platform";

@Component({
  moduleId: module.id,
  selector: "tabs-page",
  templateUrl: "./tabs.component.html"
})
export class TabsComponent implements OnInit {
  @ViewChild("mainTab") mainTabView: ElementRef;

  constructor(
    private routerExtension: RouterExtensions,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.routerExtension.navigate(
      [{
        outlets: {
          homeTab: ["home"],
          socialTab: ["social"],
          newActivityTab: ["newactivity"],
          goalsTab: ["goals"],
          profileTab: ["profile"]
        }
      }],
      { relativeTo: this.activeRoute }
    );
    this.mainTabView.nativeElement.selectedIndex = 0; // Home tab should be default
  }

  getIconSource(icon: string): string {
    if (isAndroid) {
      return "";
    }
    const iconPrefix = "res://tabIcons/";

    return iconPrefix + icon;
  }
}
