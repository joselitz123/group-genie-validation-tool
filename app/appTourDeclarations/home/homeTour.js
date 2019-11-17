// @flow
import React, { useState } from "react";
import { Steps } from "intro.js-react";
// import introJs from "intro.js";

const HomeTour = () => {
  const [stepEnabled, setStepEnabled] = useState(true);

  const steps = [
    {
      intro: "<h1>First time user? Would you like us to tour you?</h1>",
      nextLabel: "Okay"
    },
    {
      element: ".userFieldBox",
      intro: "testing on how to make this lib work."
    },
    { element: ".makeStyles-control-66", intro: "Select a hub region" },
    {
      element: ".makeStyles-formControl-86",
      intro:
        "By default all access types are selected, feel free select only access types that are relevant to you by selecting the textarea."
    },
    {
      element: ".MuiList-root",
      intro: "Click the access to unselect it."
    }
  ];

  const exitHandler = () => setStepEnabled(false);

  return (
    <Steps
      enabled={stepEnabled}
      steps={steps}
      initialStep={0}
      onExit={exitHandler}
      options={{
        nextLabel: "okay",
        overlayOpacity: 0.4,
        exitOnOverlayClick: false,
        keyboardNavigation: false
      }}
    />
  );
  // new EnjoyHint({});
  // const enjoyHintInstance =
  // const enjoyhint_script_steps = [
  //   {
  //     "click .MuiButton-root":
  //       "Click the text area to begin entering the users that you would like to validate"
  //   }
  // ];
  // enjoyHintInstance.set(enjoyhint_script_steps);
  // enjoyHintInstance.run();
};

export default HomeTour;
