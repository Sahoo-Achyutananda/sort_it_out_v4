import styles from "./ArrayContainer.module.css";
import { useRef, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Slider from "@mui/material/Slider";
import Timer from "./Timer.jsx";
import { forwardRef } from "react";

function ArrayContainer({ state, dispatch, algo }) {
  const arrayContainerRef = useRef(null);

  useEffect(() => {
    let interval;
    if (state.currentStep === state.history.length - 1)
      dispatch({ type: "sortingCompleted" });
    if (state.isPlaying) {
      interval = setInterval(() => {
        dispatch({ type: "stepForward" });
      }, 1000 / state.speed);
    }
    return () => clearInterval(interval);
  }, [state.isPlaying, state.speed, state.currentStep, dispatch]);

  return (
    <>
      <div className={styles.MainArea}>
        <div className={styles.ArrayandPlaybackContainer}>
          <div
            className={`${
              state.toggle === "bar"
                ? styles.arrayContainer
                : styles.arrayContainerBoxView
            }`}
            ref={arrayContainerRef}
          >
            {state.toggle === "bar"
              ? state.array.map((value, i) => {
                  return (
                    <Bar
                      key={i}
                      arrayContainerRef={arrayContainerRef}
                      state={state}
                      height={value}
                      index={i}
                    />
                  );
                })
              : state.array.map((value, i) => {
                  return <Box key={i} state={state} index={i} height={value} />;
                })}
          </div>
          <div className={styles.PlayControls}>
            <Timeline state={state} dispatch={dispatch} />
            <ControlButtons state={state} dispatch={dispatch} algo={algo} />
          </div>
        </div>
        <div className={styles.stats}>
          <Transcript state={state} dispatch={dispatch} />
          <Counts state={state} />
        </div>
      </div>
    </>
  );
}

function Counts({ state }) {
  return (
    <div className={styles.Counts}>
      <div className={styles.Comparisons}>
        {state.comparisons} <span>Comparisons</span>
      </div>
      <div className={styles.Swaps}>
        {state.swaps} <span>Swaps</span>
      </div>
    </div>
  );
}
function Bar({ arrayContainerRef, state, height, index }) {
  const [dimensions, setDimensions] = useState({
    height: "50px",
    width: "50px",
  });
  useEffect(() => {
    if (arrayContainerRef.current) {
      const containerWidth = arrayContainerRef.current.offsetWidth;
      const boxWidth = containerWidth / state.value - 2;
      setDimensions({
        height: height,
        width: `${boxWidth}px`,
      });
    }
  }, [arrayContainerRef, state.value, height, state.selectedIndices, index]);

  const barClasses = [
    styles.bar,
    state.selectedIndices.includes(index) ? styles.selected : "",
    state.swappedIndices.includes(index) ? styles.swapped : "",
    state.highlightValues.includes(index) ? styles.highlight : "",
    state.highlightIndices.includes(index) ? styles.enlarged : "",
  ].join(" ");

  const indexClasses = [
    styles.index,
    state.highlightIndices.includes(index) ? styles.highlightIndex : "",
  ].join(" ");

  const isPivot = state.highlightValues.includes(index);

  return (
    <div className={styles.barContainer}>
      <div
        className={indexClasses}
        style={{
          width: dimensions.width,
        }}
      >
        {index}
      </div>
      <Tooltip title={height} arrow>
        <Tooltip title={state.highlightValueText} open={isPivot} arrow>
          <div className={barClasses} style={dimensions}></div>
        </Tooltip>
      </Tooltip>
    </div>
  );
}

function Box({ state, height, index }) {
  const boxClasses = [
    styles.box,
    state.selectedIndices.includes(index) ? styles.selected : "",
    // state.swappedIndices.includes(index) ? styles.compared : "",
  ].join(" ");
  return <div className={boxClasses}>{height}</div>;
}
export default ArrayContainer;

function Timeline({ state, dispatch }) {
  return (
    <div className={styles.Timeline}>
      <Tooltip title="TimeLine ⏰" interactive followCursor>
        <div className={`${styles.sliderDiv} ${styles.valueDiv}`}>
          <Slider
            aria-label="TimeLine"
            value={state.currentStep}
            valueLabelDisplay="auto"
            step={1}
            // marks
            min={0}
            max={state.history.length - 1}
            onChange={(e) =>
              dispatch({ type: "seek", payload: e.target.value })
            }
            className={styles.timelineSlider}
          />
        </div>
      </Tooltip>
    </div>
  );
}

function ControlButtons({ state, dispatch, algo }) {
  function handleStart() {
    if (!state.isSorting) {
      const history = algo(state.array, dispatch);
      dispatch({ type: "setHistory", payload: history });
      dispatch({ type: "sortingStarted" });
    } else if (state.isSorting) {
      dispatch({ type: "togglePlay" });
    }
  }
  return (
    <>
      <div className={styles.buttonDiv}>
        <Tooltip title={!state.isPlaying ? "Play" : "Pause"} interactive arrow>
          <button className={styles.buttonStart} onClick={handleStart}>
            {!state.isPlaying ? (
              <PlayArrowIcon fontSize="small" />
            ) : (
              <PauseIcon fontSize="small" />
            )}
          </button>
        </Tooltip>
        <Tooltip title="Step Back" interactive arrow>
          <button
            // disabled={!state.isSorting}
            className={styles.buttonRewind}
            onClick={() => dispatch({ type: "stepBackward" })}
          >
            <FastRewindIcon fontSize="small" />
          </button>
        </Tooltip>
        <Tooltip title="Step Ahead" interactive arrow>
          <button
            // disabled={!state.isSorting}
            className={styles.buttonForward}
            onClick={() => dispatch({ type: "stepForward" })}
          >
            <FastForwardIcon fontSize="small" />
          </button>
        </Tooltip>
        <Tooltip
          title={state.isSorting ? "Stop Sorting 🚫" : "Generate NEW Array"}
        >
          <button
            className={styles.buttonReset}
            onClick={() => dispatch({ type: "resetValues" })}
          >
            {state.isSorting ? (
              <StopIcon fontSize="small" />
            ) : (
              <RestartAltIcon fontSize="small" />
            )}
          </button>
        </Tooltip>
      </div>
    </>
  );
}

function Transcript({ state, dispatch }) {
  const itemRefs = useRef([]);
  const parentRef = useRef(null);
  const [toggleAccordian, setToggleAccordian] = useState(true);
  // const [isUserScrolling, setIsUserScrolling] = useState(false);
  // const scrollTimeout = useRef(null);

  // const handleScroll = () => {
  //   if (!isUserScrolling) {
  //     setIsUserScrolling(true);
  //   }
  //   if (scrollTimeout.current) {
  //     clearTimeout(scrollTimeout.current);
  //   }

  //   scrollTimeout.current = setTimeout(() => {
  //     setIsUserScrolling(false);
  //   }, 5000);
  // };

  // useEffect(() => {
  //   return () => {
  //     if (scrollTimeout.current) {
  //       clearTimeout(scrollTimeout.current);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const activeRef = itemRefs.current[state.currentStep];
    const parent = parentRef.current;

    if (activeRef && parent) {
      if (parentRef.current) {
        const parentRect = parent.getBoundingClientRect();
        const activeRect = activeRef.getBoundingClientRect();

        if (
          activeRect.top < parentRect.top ||
          activeRect.bottom > parentRect.bottom
        ) {
          const scrollPosition = activeRef.offsetTop - parent.offsetTop;

          parent.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        }
      }
    }
  }, [state.currentStep]);

  return (
    <div className={styles.Accordian}>
      <div
        className={styles.AccordianTitle}
        onClick={() => setToggleAccordian(!toggleAccordian)}
      >
        <span>Event Timeline</span>
        <span style={{ display: "flex", justifyContent: "center" }}>
          {toggleAccordian ? (
            <KeyboardArrowDownIcon fontSize="medium" />
          ) : (
            <KeyboardArrowLeftIcon fontSize="medium" />
          )}
        </span>
      </div>
      <div
        className={`${
          !state.history.length
            ? styles.TranscriptPlaceholder
            : styles.Transcript
        } ${toggleAccordian ? styles.show : styles.hide}`}
        ref={parentRef}
        // onScroll={handleScroll}
      >
        {state.history.length ? (
          state.history.map((item, index) => (
            <TranscriptItem
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              index={index}
              item={item}
              state={state}
              dispatch={dispatch}
            />
          ))
        ) : (
          <span>Start the Algorithm to see the Events Timeline 😁</span>
        )}
      </div>
    </div>
  );
}

const TranscriptItem = forwardRef(function TranscriptItem(
  { index, item, state, dispatch },
  ref
) {
  const isActive = index === state.currentStep;
  const className = `${styles.TranscriptItem} ${
    isActive ? styles.TranscriptItemActive : ""
  }`;

  return (
    <div
      className={className}
      ref={ref}
      onClick={() => dispatch({ type: "seek", payload: index })}
    >
      {item.description}
    </div>
  );
});
