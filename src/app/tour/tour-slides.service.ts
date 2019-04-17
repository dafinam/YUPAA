import { Injectable } from "@angular/core";

@Injectable()
export class TourSlidesService {
  private slides;
  private yuppaGym = `
<FlexboxLayout
  row="0"
  flexDirection="column"
  alignItems="center"
  justifyContent="flex-start"
  >
  <StackLayout style="height: 60%; width: 100%;">
    <Label
      style="
        font-size: 28;
        text-align: center;
        font-weight: bold;
        letter-spacing: 0.05;
        margin-top: 10%;
      "
      text="Yupaa GYM"
    >
    </Label>
    <Image src="~/assets/images/gym.png" opacity="0.35" width="400" marginTop="20%"></Image>
  </StackLayout>
  <StackLayout>
    <Label
      style="
        font-size: 13;
        text-align: center;
        padding: 20;
        margin-top: 5%;
      "
      text="Subscribe to Yupaa GYM activity to control and maximize your workout rutine.
      With Yupaa Gym you can setup your workout sessions, receive notifications during
      workout hours, share your programm with your inner circle friends."
      textWrap="true"
    >
    </Label>
  </StackLayout>
</FlexboxLayout>
`;

  private yupaaHidrate = `
<FlexboxLayout
  row="0"
  flexDirection="column"
  alignItems="center"
  justifyContent="flex-start"
  >
  <StackLayout style="height: 60%; width: 100%;">
    <Label
      style="
        font-size: 28;
        text-align: center;
        font-weight: bold;
        letter-spacing: 0.05;
        margin-top: 10%;
      "
      text="Yupaa Hidrate"
    >
    </Label>
    <Image src="~/assets/images/hidrate-tour.jpg" opacity="0.35" width="400" marginTop="20%"></Image>
  </StackLayout>
  <StackLayout>
    <Label
      style="
        font-size: 13;
        text-align: center;
        padding: 20;
        margin-top: 5%;
      "
      text="Subscribe to Yupaa GYM activity to control and maximize your workout rutine.
      With Yupaa Gym you can setup your workout sessions, receive notifications during
      workout hours, share your programm with your inner circle friends."
      textWrap="true"
    >
    </Label>
  </StackLayout>
</FlexboxLayout>
`;

  private yupaaStretch = `
<FlexboxLayout
  row="0"
  flexDirection="column"
  alignItems="center"
  justifyContent="flex-start"
  >
  <StackLayout style="height: 60%; width: 100%;">
    <Label
      style="
        font-size: 28;
        text-align: center;
        font-weight: bold;
        letter-spacing: 0.05;
        margin-top: 10%;
      "
      text="Yupaa Stretch"
    >
    </Label>
    <Image src="~/assets/images/stretching-tour.jpg" opacity="0.35" width="400" marginTop="20%"></Image>
  </StackLayout>
  <StackLayout>
    <Label
      style="
        font-size: 13;
        text-align: center;
        padding: 20;
        margin-top: 5%;
      "
      text="Subscribe to Yupaa GYM activity to control and maximize your workout rutine.
      With Yupaa Gym you can setup your workout sessions, receive notifications during
      workout hours, share your programm with your inner circle friends."
      textWrap="true"
    >
    </Label>
  </StackLayout>
</FlexboxLayout>
`;

  private yupaaPosture = `
<FlexboxLayout
  row="0"
  flexDirection="column"
  alignItems="center"
  justifyContent="flex-start"
  >
  <StackLayout style="height: 60%; width: 100%;">
    <Label
      style="
        font-size: 28;
        text-align: center;
        font-weight: bold;
        letter-spacing: 0.05;
        margin-top: 10%;
      "
      text="Yupaa Posture"
    >
    </Label>
    <Image src="~/assets/images/posture-tour.jpg" opacity="0.35" width="400" marginTop="20%"></Image>
  </StackLayout>
  <StackLayout>
    <Label
      style="
        font-size: 13;
        text-align: center;
        padding: 20;
        margin-top: 5%;
      "
      text="Subscribe to Yupaa GYM activity to control and maximize your workout rutine.
      With Yupaa Gym you can setup your workout sessions, receive notifications during
      workout hours, share your programm with your inner circle friends."
      textWrap="true"
    >
    </Label>
  </StackLayout>
</FlexboxLayout>
`;

  constructor() {
    this.slides = [this.yuppaGym, this.yupaaHidrate, this.yupaaStretch, this.yupaaPosture];
  }

  getSlides(): any {
    return this.slides;
  }
}
