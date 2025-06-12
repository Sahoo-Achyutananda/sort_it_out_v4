import styles from "./ArrayContainer.module.css";
import { useRef, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";

function ArrayContainer({ state, algorithm, algoKey, dispatch }) {
  const arrayContainerRef = useRef(null);
  const stateRef = useRef(state);

  useEffect(() => {
    // console.log(algorithm, dispatch);
    stateRef.current = state;
  }, [state]);

  return (
    <div>
      <div className={styles.arrayContainer} ref={arrayContainerRef}>
        {state.activeAlgorithms[algoKey].array?.map((value, i) => {
          return (
            <Bar
              key={i}
              arrayContainerRef={arrayContainerRef}
              state={state}
              height={value}
              algoKey={algoKey}
              index={i}
            />
          );
        })}
      </div>
      <div></div>
    </div>
  );
}

function Bar({ arrayContainerRef, state, algoKey, height, index }) {
  const [dimensions, setDimensions] = useState({
    height: "50px",
    width: "50px",
  });
  useEffect(() => {
    if (arrayContainerRef.current) {
      const containerWidth = arrayContainerRef.current.offsetWidth;
      const boxWidth = Math.floor(containerWidth / state.value) - 2;
      setDimensions({
        height: height,
        width: `${boxWidth}px`,
      });
    }
  }, [arrayContainerRef, state.value, height, index]);

  const barClasses = [
    styles.bar,
    (state.activeAlgorithms[algoKey].selectedIndices || []).includes(index)
      ? styles.selected
      : "",
  ].join(" ");

  const indexClasses = [
    styles.index,
    (state.activeAlgorithms[algoKey].highlightedIndices || []).includes(index)
      ? styles.highlightedIndex
      : "",
  ].join(" ");

  return (
    <div className={styles.barContainer}>
      <div
        className={indexClasses}
        style={{
          width: dimensions.width,
        }}
      >
        {String(index).padStart(2, "0")}
      </div>
      <Tooltip title={height} arrow>
        <div className={barClasses} style={dimensions}></div>
      </Tooltip>
    </div>
  );
}

// function Box({ height }) {
//   return <div className={styles.box}>{height}</div>;
// }

export default ArrayContainer;
