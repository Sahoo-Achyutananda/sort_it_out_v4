import { useReducer, useRef, useEffect, useState } from "react";
import InputFields from "./InputFields.jsx";
import PlayModeArrayContainer from "./playMode/PlayModeArrayContainer.jsx";
import ArrayContainer from "./ArrayContainer.jsx";
import Code from "./Code.jsx";
import Details from "./Details.jsx";
import styles from "./SortingLayout.module.css";
import { reducer, initialState } from "../store.jsx";
import Title from "./Title.jsx";
import Feedback from "../pages/homePage/Feedback.jsx";
import { useLocation } from "react-router-dom";
import Joyride from "react-joyride";
// import { useNavigate } from "react-router-dom";

function SortingLayout({ algorithm, algorithmPlay, json }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const isPlayMode = location.pathname.includes("/play");
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([]);

  // Set steps based on route
  useEffect(() => {
    if (location.pathname === json.link) {
      setSteps([
        {
          target: "#speedDiv",
          content: (
            <Tutorial
              title="Control Speed"
              para="Adjust the speed of the sorting animation for a smoother experience."
              image="/assets/speed.png"
            />
          ),
          disableBeacon: true,
        },
        {
          target: "#valueDiv",
          content: (
            <Tutorial
              title="Set Array Size"
              para="Select the number of elements to visualize during sorting."
              image="/assets/array-size.png"
            />
          ),
          disableBeacon: true,
        },
        {
          target: "#utilitiesDiv",
          content: (
            <Tutorial
              title="Utility Panel"
              para="Switch between bar or box views and generate a fresh array."
              image="/assets/utility-panel.png"
            />
          ),
          disableBeacon: true,
        },
        {
          target: "#arrayContainerDiv",
          content: (
            <Tutorial
              title="Sorting Visualization"
              para="Watch the sorting algorithm animate here in real-time."
              image="/assets/array-visual.png"
            />
          ),
          disableBeacon: true,
          placement: "right-end",
        },
        {
          target: "#timeline",
          content: (
            <Tutorial
              title="Interactive Timeline"
              para="Navigate back and forth through the sorting process once started."
              image="/assets/timeline.png"
            />
          ),
          disableBeacon: true,
        },
        {
          target: "#buttonStart",
          content: (
            <Tutorial
              title="Start Algorithm"
              para="Click to begin the visualization of the selected sorting algorithm."
              image="/assets/start.png"
            />
          ),
          disableBeacon: true,
        },
        {
          target: "#buttonRewind",
          content: (
            <Tutorial
              title="Step Backward"
              para="Go one step back in the algorithm execution timeline."
              image="/assets/rewind.png"
            />
          ),
          disableBeacon: true,
        },
        {
          target: "#buttonForward",
          content: (
            <Tutorial
              title="Step Forward"
              para="Move one step forward in the algorithm's timeline."
              image="/assets/forward.png"
            />
          ),
          disableBeacon: true,
        },
        {
          target: "#buttonReset",
          content: (
            <Tutorial
              title="Reset Visualization"
              para="Restart the sorting process or generate a new array."
              image="/assets/reset.png"
            />
          ),
          disableBeacon: true,
        },
        {
          target: "#transcript",
          content: (
            <Tutorial
              title="Execution Transcript"
              para="Displays a step-by-step description of what the algorithm is doing."
              image="/assets/transcript.png"
            />
          ),
          placement: "left",
          disableBeacon: true,
        },
        {
          target: "#counts",
          content: (
            <Tutorial
              title="Comparison & Swap Count"
              para="Track the number of comparisons and swaps made by the algorithm."
              image="/assets/counts.png"
            />
          ),
          placement: "left",
          disableBeacon: true,
        },
        {
          target: "#modeSwitcher",
          content: (
            <Tutorial
              title="Toggle Modes"
              para="Switch between Visualizer and Game Mode"
              image="/assets/sorting-area.png"
            />
          ),
          disableBeacon: true,
        },
        {
          target: "#showTutorial",
          content: (
            <Tutorial
              title="Rewatch Tutorial"
              para="At any point of time, feel free to revisit this Tutorial."
            />
          ),
          disableBeacon: true,
        },
      ]);
    } else if (isPlayMode) {
      setSteps([
        {
          target: "#valueDiv",
          content: (
            <Tutorial
              title="Adjust Array Size"
              para="Change the number of elements in the array to increase or decrease the challenge."
              image="/assets/array-size.png"
            />
          ),
          disableBeacon: true,
        },
        {
          target: "#buttonStart",
          content: (
            <Tutorial
              title="Start the Game"
              para="Begin the interactive sorting game. Try placing the elements correctly step by step."
              image="/assets/start.png"
            />
          ),
          // disableBeacon: true,
        },
        {
          target: "#buttonReset",
          content: (
            <Tutorial
              title="Reset the Game"
              para="Reset the current array or generate a new one to start over."
              image="/assets/reset.png"
            />
          ),
          // disableBeacon: true,
        },
        {
          target: "#timer",
          content: (
            <Tutorial
              title="Track Your Time"
              para="Keep an eye on how long you take to complete the sorting."
              image="/assets/timer.png"
            />
          ),
          // disableBeacon: true,
        },
        {
          target: "#pointsDiv",
          content: (
            <Tutorial
              title="Score System"
              para="Earn points for correct moves and lose points for incorrect ones. Try to maximize your score!"
              image="/assets/points.png"
            />
          ),
          // disableBeacon: true,
        },
        {
          target: "#hintBtnActive",
          content: (
            <Tutorial
              title="Use Hints Wisely"
              para="Toggle hints to get guidance on your next move. Hints can help when you're stuck."
              image="/assets/hint.png"
            />
          ),
          // disableBeacon: true,
        },
        {
          target: "#playModeContainer",
          content: (
            <Tutorial
              title="Drag & Drop to Sort"
              para="Interact with the elements by dragging them into the correct order based on the sorting algorithm."
              image="/assets/sorting-area.png"
            />
          ),
          // disableBeacon: true,
        },
        {
          target: "#modeSwitcher",
          content: (
            <Tutorial
              title="Toggle Modes"
              para="Switch between Visualizer and Game Mode"
              image="/assets/sorting-area.png"
            />
          ),
          // disableBeacon: true,
        },
        {
          target: "#showTutorial",
          content: (
            <Tutorial
              title="Rewatch Tutorial"
              para="At any point of time, feel free to revisit this Tutorial."
            />
          ),
          // disableBeacon: true,
        },
      ]);
    } else {
      setSteps([]); // no tutorial on other pages
    }
  }, [isPlayMode]);

  // useEffect(() => {
  //   if (isPlayMode) {
  //     setRun(true);
  //   }
  // }, [isPlayMode]);

  // Check localStorage for first-time visit
  useEffect(() => {
    const visited = localStorage.getItem("hasVisited");

    if (!visited) {
      setRun(true);
      localStorage.setItem("hasVisited", "true"); // Mark visited
    }
  }, []);

  useEffect(() => {
    const hasVisitedGame = localStorage.getItem("hasVisitedGameMode");
    if (isPlayMode && !hasVisitedGame) {
      setRun(true);
      localStorage.setItem("hasVisitedGameMode", "true");
    }
  }, [isPlayMode]);

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        continuous
        scrollOffset={200}
        scrollToFirstStep={false}
        disableScrolling={false}
        showSkipButton
        showProgress
        styles={{
          options: {
            arrowColor: "black",
            backgroundColor: "black",
            primaryColor: "purple",
            textColor: "white",
          },
        }}
        callback={(data) => {
          const { status } = data;
          // Trigger when finished or skipped
          if (["finished", "skipped"].includes(status)) {
            setRun(false);
          }
        }}
      />
      <div className={styles.SortingLayout}>
        <Title title={json.name} />
        <div className={styles.utilities}>
          <InputFields
            dispatch={dispatch}
            state={state}
            stateRef={stateRef}
            initialState={initialState}
            algo={algorithm}
            algoPlay={algorithmPlay}
            json={json}
            isPlayMode={isPlayMode}
            setRun={setRun}
            run={run}
          ></InputFields>
        </div>
        {isPlayMode ? (
          <PlayModeArrayContainer algoPlay={algorithmPlay} />
        ) : (
          <ArrayContainer state={state} dispatch={dispatch} algo={algorithm} />
        )}
      </div>
      <div className={styles.genInformation}>
        <div className={styles.infoDiv}>
          <Code json={json} />
          <Details json={json} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Feedback />
      </div>
    </>
  );
}

function Tutorial({ title, para }) {
  return (
    <div className={styles.tutorialDiv}>
      <h3>{title}</h3>
      <p>{para}</p>
    </div>
  );
}

export default SortingLayout;
