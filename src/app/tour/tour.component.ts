import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { UserService } from "../shared/services/user.service";

import { Page, ContentView } from "tns-core-modules/ui/page";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { GridLayout, GridUnitType, ItemSpec } from "tns-core-modules/ui/layouts/grid-layout";
import { AnimationDefinition, Animation } from "tns-core-modules/ui/animation";
import { screen, isAndroid, device } from "tns-core-modules/platform";

import * as app from "tns-core-modules/application";
import * as builder from "tns-core-modules/ui/builder";
import { TourSlidesService } from "./tour-slides.service";
import { User } from "../shared/models/user";

declare var android: any;
@Component({
  selector: "Tour",
  moduleId: module.id,
  templateUrl: "tour.component.html",
  styleUrls: ["./tour.component.scss"]
})
export class TourComponent implements OnInit {
  isTourActive: boolean = true;
  nickname: string = "";
  @ViewChild("slideContent") slideElement: ElementRef;

  private currentSlideNum: number = 0;
  private slideCount: number = 4;
  private screenWidth;
  private slidesView: GridLayout;
  private slideView: ContentView;

  constructor(
    private page: Page,
    private router: RouterExtensions,
    private userService: UserService,
    private slidesService: TourSlidesService
  ) {
    this.screenWidth = screen.mainScreen.widthDIPs;

    // Span the background under status bar on Android
    if (isAndroid && device.sdkVersion >= "21") {
      const View = android.view.View;
      const window = app.android.startActivity.getWindow();
      window.setStatusBarColor(0x000000);

      const decorView = window.getDecorView();
      decorView.setSystemUiVisibility(
        View.SYSTEM_UI_FLAG_LAYOUT_STABLE ||
        View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION ||
        View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN ||
        View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.page.cssClasses.add("welcome-page-background");
    this.page.backgroundSpanUnderStatusBar = true;

    this.loadSlides(this.slidesService.getSlides()).then((slides: any) => {
      const row = new ItemSpec(1, GridUnitType.STAR);
      const gridLayout = new GridLayout();
      slides.forEach((element, i) => {
        GridLayout.setColumn(element, 0);
        if (i > 0) {
          element.opacity = 0;
        }
        gridLayout.addChild(element);
      });
      gridLayout.addRow(row);
      this.slideView = this.slideElement.nativeElement;
      this.slideView.content = (this.slidesView = gridLayout);
    });
  }

  onSwipe(args: SwipeGestureEventData) {
    const prevSlideNum = this.currentSlideNum;
    const count = this.slideCount;
    if (args.direction === 2) {
      this.currentSlideNum = (this.currentSlideNum + 1) % count;
    } else if (args.direction === 1) {
      this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
    } else {
      // We are interested in left and right directions
      return;
    }

    if (this.currentSlideNum === 0) {
      this.isTourActive = false;
    } else {
      const currSlide = this.slidesView.getChildAt(prevSlideNum);
      const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);
      this.animate(currSlide, nextSlide, args.direction);
    }
  }

  animate(currSlide, nextSlide, direction) {
    nextSlide.translateX = (direction === 2 ? this.screenWidth : -this.screenWidth);
    nextSlide.opacity = 1;
    const definitions = new Array<AnimationDefinition>();
    const defn1: AnimationDefinition = {
      target: currSlide,
      translate: { x: (direction === 2 ? -this.screenWidth : this.screenWidth), y: 0 },
      duration: 300
    };
    definitions.push(defn1);

    const defn2: AnimationDefinition = {
      target: nextSlide,
      translate: { x: 0, y: 0 },
      duration: 300
    };
    definitions.push(defn2);

    const animationSet = new Animation(definitions);
    animationSet.play()
      .catch((e) => {
        console.log(e.message);
      });
  }

  getSliderItemClass(item: number) {
    if (item === this.currentSlideNum) {
      return "caro-item-dot caro-item-dot-selected";
    }

    return "caro-item-dot";
  }

  navigateHome(): void {
    this.router.navigate(["/tabs/default"],
    {
      animated: true,
      clearHistory: true
    });
  }

  completeTour(): void {
    // TODO: Complete the tour by updating the users nickname and changing the completed_tour flag to true
    this.userService.getUserUid()
    .then((userId: string) => {
      const user = new User({
        uid: userId,
        nickname: this.nickname
      });
      this.userService.completeTourForUser(user)
        .then((successful: boolean) => {
          if (successful) {
            this.navigateHome();
          } else {
            // TODO: show a modal that informs the user about unsucessful update
            // DO NOTHING
          }
        });
    });
  }

  private loadSlides(slides) {
    return new Promise((resolve) => {
      const slideViews = [];
      slides.forEach((slide, i) => {
        slideViews.push(builder.parse(slide));
      });

      resolve(slideViews);
    });
  }
}
