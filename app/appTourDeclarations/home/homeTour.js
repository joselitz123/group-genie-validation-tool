// @flow
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Steps } from "intro.js-react";
import introJs from "intro.js";
import initialSteps from "./initialSteps";

const HomeTour = () => {
  const [stepEnabled, setStepEnabled] = useState(true);

  const [currentStep, setCurrentStep] = useState(null);

  const [tourSteps, setTourSteps] = useState(initialSteps);

  const userFieldBox: string = useSelector(
    state => state.usersFieldBoxReducer.input
  );

  const selectedHubRegion: string = useSelector(
    state => state.hubSelectionFieldReducer.hubSelected
  );

  const validationResult: {} = useSelector(
    state => state.validationReducer.validationResult
  );

  const validationStarted: boolean = useSelector(
    state => state.loadingIndicatorReducer.showModal
  );

  const stepRef: any = useRef(null);

  useEffect(
    () => {
      if (currentStep === 3) {
        stepRef.current.introJs.nextStep();
      }
    },
    [selectedHubRegion]
  );

  useEffect(
    () => {
      if (validationStarted === true) {
        stepRef.current.introJs.exit();
      }

      if (
        Object.values(validationResult).length !== 0 &&
        validationStarted === false
      ) {
        const additionalTourSteps = [
          {
            intro: `Great!, now that the validation has finished, I'll be talking about the <i>"Validation Result Table"</i> section.`
          },
          {
            element: ".combo_data div:first-of-type ",
            intro: `Have you wondered what corresponding genie groups where used to identify an access?
            <br/> You can double click the cell to see more details.`
          },
          {
            element: ".fancy-panel-grid-inside",
            intro:
              "Let's get you familiar with the different information and features that are available on this table."
          },
          {
            element: ".fancy-grid-left",
            intro:
              "In this column will show all the accounts that you have entered earlier."
          },
          {
            element: ".fancy-grid-center",
            intro:
              "While the rest of these columns will be shown the result of the access validation."
          },
          {
            intro: `Now, with regards to access with data hub, as per system logic, 
              in order for a user to properly access the server, he/she will need to access to <b>BOTH</b> of these two access types that I'll be elaborating next.`
          },
          {
            element: ".app_access",
            intro: `First is <i>"Application access"</i> wherein you can view and create analysis of the data that you have access with.
            One of this access is Power BI which is required.`
          },
          {
            element: ".data_access",
            intro: `Second is <i>"Data access"</i> that defines which data that are available for you to view. To gain access with this, one will only need either of these accesses(Retail POS, Direct Shipments or RTDC).`
          },
          {
            element: ".fancy-grid-tree-expander:first-of-type",
            intro: `You can also toggle down this arrow to view the markets/access types that are under it.`
          }
        ];
        setTourSteps(additionalTourSteps);

        setStepEnabled(true);
      }
    },
    [validationStarted]
  );

  const exitHandler = (): void => setStepEnabled(false);

  const onChangeHandler = (index): void => {
    setCurrentStep(index);
    if (index === 4) {
      stepRef.current.introJs.setOption("disableInteraction", true);
      stepRef.current.introJs.refresh();
    }
  };

  const onBeforeChangeHandler = (nextStepIndex): void | boolean => {
    switch (currentStep) {
      case 2:
        if (userFieldBox === "") {
          return false;
        }
        break;

      case 3:
        if (selectedHubRegion === "") {
          return false;
        }
        break;

      default:
        break;
    }
  };

  return (
    <Steps
      enabled={stepEnabled}
      steps={tourSteps}
      initialStep={0}
      onExit={exitHandler}
      options={{
        overlayOpacity: 0.4,
        exitOnOverlayClick: false,
        keyboardNavigation: false,
        skipLabel: "Exit",
        showStepNumbers: false
      }}
      onChange={onChangeHandler}
      onBeforeChange={onBeforeChangeHandler}
      ref={stepRef}
    />
  );
};

export default HomeTour;
