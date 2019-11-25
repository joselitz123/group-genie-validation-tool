// @flow
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Steps } from "intro.js-react";
import introJs from "intro.js";
import initialSteps from "./initialSteps";
import tableTourSteps from "./tableTourSteps";
import {
  setTourData,
  getTourData
} from "../../LocalStorage/TourDataLocalStorage/tourDataLocalStorage";

const HomeTour = () => {
  const [stepEnabled, setStepEnabled] = useState(false);

  const [currentStep, setCurrentStep] = useState(null);

  // Help identify of which part of the tour is being show already to the user
  const [tourPart, setTourPart] = useState(1);

  const [tourSteps, setTourSteps] = useState(initialSteps);

  const [tourObject, setTourObject] = useState({});

  const userFieldBox: string = useSelector(
    state => state.usersFieldBoxReducer.input
  );

  const showModalInfo: boolean = useSelector(
    state => state.validationReducer.showModalInfo
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

  const getTourStatus = (): any => {
    return new Promise(async (resolve, reject) => {
      const result = await getTourData();
      resolve(result);
    });
  };

  useEffect(
    () => {
      const checkToRunTour = async () => {
        const result = await getTourStatus();
        setTourObject(result);
        if (
          typeof result.hasFinishedInitialTour === "undefined" ||
          result.hasFinishedInitialTour === false
        ) {
          setTourSteps(initialSteps);
          setStepEnabled(true);
        }
      };

      checkToRunTour();
    },
    [tourPart]
  );

  useEffect(
    () => {
      if (currentStep === 3) {
        stepRef.current.introJs.setOptions({ disableInteraction: true });
        stepRef.current.introJs.start();
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
        const checkToRunTour = async () => {
          const result = await getTourStatus();
          setTourObject(result);
          if (
            result.hasFinishedTableTour === false ||
            typeof result.hasFinishedTableTour === "undefined"
          ) {
            setTimeout(() => {
              setTourPart(2);
              setTourSteps(tableTourSteps);
              stepRef.current.introJs.setOptions({ disableInteraction: true });
              setStepEnabled(true);
            }, 1000);
          }
        };

        checkToRunTour();
      }
    },
    [validationStarted]
  );

  const exitHandler = (): void => {
    setStepEnabled(false);
    if (tourPart === 1) {
      setTourData({ ...tourObject, hasFinishedInitialTour: true });
    } else if (tourPart === 2) {
      setTourData({ ...tourObject, hasFinishedTableTour: true });
    }
  };

  const onChangeHandler = (index): void => {
    setCurrentStep(index);
  };

  const onBeforeChangeHandler = (nextStepIndex): void | boolean => {
    // return false in order to prevent the tour from proceeding either backward or forward.
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
