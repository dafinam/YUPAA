import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from "nativescript-cardview";
registerElement("CardView", () => CardView);

@Component({
  selector: "Social",
  moduleId: module.id,
  templateUrl: "./social.component.html",
  styleUrls: ["./social.component.scss"]
})
export class SocialComponent implements OnInit {
  searchQuery: string = "";

  // Tab items
  @ViewChild("newsFeed") newsFeed: ElementRef;
  @ViewChild("discover") discover: ElementRef;
  @ViewChild("personalFeed") personalFeed: ElementRef;

  // Content Elements
  @ViewChild("newsFeedContent") newsFeedContent: ElementRef;
  @ViewChild("discoveryContent") discoveryContent: ElementRef;
  @ViewChild("personalFeedContent") personalFeedContent: ElementRef;

  constructor(private page: Page) {
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {
    this.showTab("newsFeed");
  }

  showTab(ref: string) {
    this.toggleTab(ref);
  }

  toggleTab(ref) {
    if (ref === "newsFeed") {
      this.newsFeed.nativeElement.className = "Social--TabItem Active";
      this.newsFeedContent.nativeElement.className = "Social--Content Enabled";
      this.discover.nativeElement.className = "Social--TabItem";
      this.discoveryContent.nativeElement.className = "Social--Content";
      this.personalFeed.nativeElement.className = "Social--TabItem";
      this.personalFeedContent.nativeElement.className = "Social--Content";
    } else if (ref === "discover") {
      this.newsFeed.nativeElement.className = "Social--TabItem";
      this.newsFeedContent.nativeElement.className = "Social--Content";
      this.discover.nativeElement.className = "Social--TabItem Active";
      this.discoveryContent.nativeElement.className = "Social--Content Enabled";
      this.personalFeed.nativeElement.className = "Social--TabItem";
      this.personalFeedContent.nativeElement.className = "Social--Content";
    } else if (ref === "personalFeed") {
      this.newsFeed.nativeElement.className = "Social--TabItem";
      this.newsFeedContent.nativeElement.className = "Social--Content";
      this.discover.nativeElement.className = "Social--TabItem";
      this.discoveryContent.nativeElement.className = "Social--Content";
      this.personalFeed.nativeElement.className = "Social--TabItem Active";
      this.personalFeedContent.nativeElement.className = "Social--Content Enabled";
    }
  }
}
