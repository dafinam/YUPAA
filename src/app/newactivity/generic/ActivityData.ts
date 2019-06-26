/* tslint:disable:max-line-length */
export class ActivityDataService {
  getData() {
    return {
      breakfast: {
        name: "Healthy Breakfast",
        activityKey: "healthy_breakfast",
        descriptions: [
          {
            question: "Pick a time for the Healthy Breakfast activity!",
            info: `Start the morning by rewarding yourself with a nice and healthy breakfast. For breakfast is usually good to do it 5-10 minutes after waking up.`,
            size: "100 *"
          },
          {
            question: "Select the days of the week you want to do the activity!",
            info: `Breakfast is the most important meal of the day. It helps you kickstart the day with a positive mood. You should eat breakfast every day of the week, but healthy breakfast you can try ever other day.`,
            size: "130 *"
          },
          {
            question: "",
            info: "",
            size: ""
          },
          {
            question: "Would you like this activity to be sharable with others?",
            info: `Everything is more fun and engaging when you share your interests and activities with people you know. Let other's know the type of activities you are engaging in Yupaa App.`,
            size: "130 *"
          },
          {
            question: "Awesome! One last thing, what would you like to call your new activity?",
            info: "Motivational names are strongly recommended. You are welcome to use emojis as well.",
            size: "100 *"
          },
          {
            question: "All Set!",
            info: "The journey towards a helthier lifestyle is about to begin. Let's kick off this activity shall we?",
            size: "100 *"
          }
        ]
      },
      stretching: {
        name: "Stretching",
        activityKey: "stretching",
        descriptions: [
          { // Time selection view
            question: "Lets pick up your stretching time?",
            info: "Stretching is important for your posture on the long run. Doing a stretch every day helps you stay flexible",
            size: "100 *"
          },
          { // Weekdays reminder selection view
            question: "How often do you want to stretch?",
            info: "We would recommend you stretching every day if that is possible to fit it in your schedule. You'll stretch for a couple of minutes anyway so why not do it everyday?",
            size: "100 *"
          },
          { // Duration selection view
            question: "Duration of a stretch session?",
            info: "Keep it short and effective. Five to ten minutes a day is normally a good duration for a stretching session.",
            size: "100 *"
          },
          { // Social sharability view
            question: "Would you like this activity to be sharable with others?",
            info: `Everything is more fun and engaging when you share your interests and activities with people you know. Let other's know the type of activities you are engaging in Yupaa App.`,
            size: "130 *"
          },
          { // Activity name pick view
            question: "Awesome! One last thing, what would you like to call your new activity?",
            info: "Motivational names are strongly recommended. You are welcome to use emojis as well.",
            size: "100 *"
          },
          { // Summary view
            question: "All Set!",
            info: "The journey towards a helthier lifestyle is about to begin. Let's kick off this activity shall we?",
            size: "100 *"
          }
        ]
      },
      meditation: {
        name: "Meditation",
        activityKey: "meditation",
        descriptions: [
          { // Time selection view
            question: "Lets set up your meditation schedule?",
            info: "Meditation is important for your well being and living a stresless life. Doing a meditation a few times a week will significantly improve your well being.",
            size: "100 *"
          },
          { // Weekdays reminder selection view
            question: "How often do you want to meditate?",
            info: "We would recommend you meditate every other day if that is possible to fit it in your schedule. Meditation is an important activity that everyone must set aside some time for?",
            size: "100 *"
          },
          { // Duration selection view
            question: "Duration of a meditation session?",
            info: "Meditation sessions usually tend to be short. Five to ten minutes a day is normally a good duration for a meditation session.",
            size: "100 *"
          },
          { // Social sharability view
            question: "Would you like this activity to be sharable with others?",
            info: `Everything is more fun and engaging when you share your interests and activities with people you know. Let other's know the type of activities you are engaging in Yupaa App.`,
            size: "130 *"
          },
          { // Activity name pick view
            question: "Awesome! One last thing, what would you like to call your new activity?",
            info: "Motivational names are strongly recommended. You are welcome to use emojis as well.",
            size: "100 *"
          },
          { // Summary view
            question: "All Set!",
            info: "The journey towards a helthier lifestyle is about to begin. Let's kick off this activity shall we?",
            size: "100 *"
          }
        ]
      },
      posture: {
        name: "Posture",
        activityKey: "posture",
        descriptions: [
          { // Time selection view
            question: "Lets set up your posture schedule?",
            info: "Maintaining a good posture is important for your health, bones and looks. Try keeping a straight posture every day at work for a couple of minutes. Like that you will get used to it.",
            size: "100 *"
          },
          { // Weekdays reminder selection view
            question: "How often do you want to exercise maintaining a good posture?",
            info: "We would recommend you exercise maintaining a good posture every work day. You can do it while you are working! Just keep your mind there and you'll get used to it.",
            size: "100 *"
          },
          { // Duration selection view
            question: "Duration of a posture session?",
            info: "We recommend a 30 minute posture session. 30 minutes is a fair duration and quite exhausting. But, the benefits are uncomperable.",
            size: "100 *"
          },
          { // Social sharability view
            question: "Would you like this activity to be sharable with others?",
            info: `Everything is more fun and engaging when you share your interests and activities with people you know. Let other's know the type of activities you are engaging in Yupaa App.`,
            size: "130 *"
          },
          { // Activity name pick view
            question: "Awesome! One last thing, what would you like to call your new activity?",
            info: "Motivational names are strongly recommended. You are welcome to use emojis as well.",
            size: "100 *"
          },
          { // Summary view
            question: "All Set!",
            info: "The journey towards a helthier lifestyle is about to begin. Let's kick off this activity shall we?",
            size: "100 *"
          }
        ]
      },
      walk: {
        name: "Walk",
        activityKey: "walk",
        descriptions: [
          { // Time selection view
            question: "Lorem ipsum dolor sit amet?",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            size: "100 *"
          },
          { // Weekdays reminder selection view
            question: "Lorem ipsum dolor sit amet?",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            size: "100 *"
          },
          { // Duration selection view
            question: "Lorem ipsum dolor sit amet?",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            size: "100 *"
          },
          { // Social sharability view
            question: "Would you like this activity to be sharable with others?",
            info: `Everything is more fun and engaging when you share your interests and activities with people you know. Let other's know the type of activities you are engaging in Yupaa App.`,
            size: "130 *"
          },
          { // Activity name pick view
            question: "Awesome! One last thing, what would you like to call your new activity?",
            info: "Motivational names are strongly recommended. You are welcome to use emojis as well.",
            size: "100 *"
          },
          { // Summary view
            question: "All Set!",
            info: "The journey towards a helthier lifestyle is about to begin. Let's kick off this activity shall we?",
            size: "100 *"
          }
        ]
      },
      study: {
        name: "Study",
        activityKey: "study",
        descriptions: [
          { // Time selection view
            question: "Lorem ipsum dolor sit amet?",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            size: "100 *"
          },
          { // Weekdays reminder selection view
            question: "Lorem ipsum dolor sit amet?",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            size: "100 *"
          },
          { // Duration selection view
            question: "Lorem ipsum dolor sit amet?",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            size: "100 *"
          },
          { // Social sharability view
            question: "Would you like this activity to be sharable with others?",
            info: `Everything is more fun and engaging when you share your interests and activities with people you know. Let other's know the type of activities you are engaging in Yupaa App.`,
            size: "130 *"
          },
          { // Activity name pick view
            question: "Awesome! One last thing, what would you like to call your new activity?",
            info: "Motivational names are strongly recommended. You are welcome to use emojis as well.",
            size: "100 *"
          },
          { // Summary view
            question: "All Set!",
            info: "The journey towards a helthier lifestyle is about to begin. Let's kick off this activity shall we?",
            size: "100 *"
          }
        ]
      },
      generic: {
        name: "New Activity ☺️",
        activityKey: "generic",
        descriptions: [
          { // Time selection view
            question: "Lorem ipsum dolor sit amet?",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            size: "100 *"
          },
          { // Weekdays reminder selection view
            question: "Lorem ipsum dolor sit amet?",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            size: "100 *"
          },
          { // Duration selection view
            question: "Lorem ipsum dolor sit amet?",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            size: "100 *"
          },
          { // Social sharability view
            question: "Would you like this activity to be sharable with others?",
            info: `Everything is more fun and engaging when you share your interests and activities with people you know. Let other's know the type of activities you are engaging in Yupaa App.`,
            size: "130 *"
          },
          { // Activity name pick view
            question: "Awesome! One last thing, what would you like to call your new activity?",
            info: "Motivational names are strongly recommended. You are welcome to use emojis as well.",
            size: "100 *"
          },
          { // Summary view
            question: "All Set!",
            info: "The journey towards a helthier lifestyle is about to begin. Let's kick off this activity shall we?",
            size: "100 *"
          }
        ]
      }
    };
  }
}
/* tslint:enable:max-line-length */
