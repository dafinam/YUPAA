import { Component } from "@angular/core";

@Component({
  selector: "Loading",
  template: `
    <FlexboxLayout
      width="100%"
      height="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      class="loading"
    >
      <StackLayout class="loading-element"></StackLayout>
      <Label class="text-label" text="Loading.."></Label>
    </FlexboxLayout>
    `,
  styles: [`
    .loading {
      background: #ffffff;
    }
    .loading-element {
      width: 100px;
      height: 100px;
      border-radius: 5;
      margin-left: -100;
      background-color: #2E5877;
      animation-name: loadingG;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(.17,.37,.43,.67);
      animation-fill-mode: forwards;
    }
    .text-label {
      margin-top: 40;
      font-size: 20;
      font-weight: 500;
      letter-spacing: 0.4;
      color: #E3E8E5;
      opacity: 0;
      animation-name: fade-in;
      animation-delay: 0.5;
      animation-duration: 0.5s;
      animation-timing-function: ease-in;
      animation-fill-mode: forwards;
    }
    @keyframes loadingG {
      0% {transform: translate(0,0) rotate(0deg);}
      50% {transform: translate(200px,0) rotate(360deg);}
      100% {transform: translate(0,0) rotate(0deg);}
    }
    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `]
})
export class LoadingComponent {
}
