import Slider from "@mui/material/Slider";
import styles from "./InputFields.module.css";
import { NavLink } from "react-router-dom";

import DataArrayIcon from "@mui/icons-material/DataArray";
import SpeedIcon from "@mui/icons-material/Speed";

import { styled } from "@mui/material/styles";

import BarChartIcon from "@mui/icons-material/BarChart";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PauseIcon from "@mui/icons-material/Pause";
import Timer from "./Timer.jsx";
import { usePlayModeContext } from "../contexts/PlayModeContext";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const CustomToggleButton = styled(ToggleButton)(() => ({
  color: "white",
  backgroundColor: "rgba(236, 236, 236, 0.042)",
  "&.Mui-selected": {
    color: "white",
    backgroundColor: "rgb(103, 3, 204)",
  },
}));

function InputFields({
  dispatch,
  state,
  initialState,
  json,
  isPlayMode,
  algoPlay,
  setRun,
}) {
  const { state: statePlay, dispatch: dispatchPlay } = usePlayModeContext();

  // const location = useLocation();
  // const isPlayMode = location.pathname.includes("/play");

  return (
    <div className={styles.Inputs}>
      <Tooltip
        title={
          !state.isSorting
            ? "Enter Custom Array 📦: Separated by white space"
            : "Enter Custom Array 📦: Disabled while sorting is active 🚫"
        }
        followCursor
        interactive
      >
        <div className={styles.userArrayInput}>
          <div>
            Disclaimer: Maximun accepted value is 350, Values greater than 350
            will be ignored{" "}
          </div>
          <input
            type="text"
            disabled={state.isSorting}
            placeholder="Enter Custom Array (eg: 20 30 50 10)"
            onChange={(e) =>
              dispatch({ type: "customInput", payload: e.target.value })
            }
          ></input>
        </div>
      </Tooltip>
      <div className={styles.userInputs}>
        {!isPlayMode ? (
          <Tooltip title="Set Speed 🏃‍♀️" followCursor interactive>
            <div
              id="speedDiv"
              className={`${styles.sliderDiv} ${styles.speedDiv}`}
            >
              <SpeedIcon fontSize="small" sx={{ color: "white" }} />
              <Slider
                aria-label="Speed"
                defaultValue={initialState.speed}
                valueLabelDisplay="auto"
                step={0.25}
                marks
                min={0.25}
                max={10}
                value={state.speed}
                onChange={(e) =>
                  dispatch({ type: "speedChange", payload: e.target.value })
                }
                className={styles.speedSlider}
              />
            </div>
          </Tooltip>
        ) : (
          ""
        )}
        <Tooltip title="Set Array Size 📦" interactive followCursor>
          <div
            id="valueDiv"
            className={`${styles.sliderDiv} ${styles.valueDiv}`}
          >
            <DataArrayIcon fontSize="small" sx={{ color: "white" }} />
            <Slider
              aria-label="Size"
              defaultValue={!isPlayMode ? 20 : 10}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={!isPlayMode ? 50 : 20}
              value={!isPlayMode ? state.value : statePlay.value}
              onChange={(e) =>
                !isPlayMode
                  ? dispatch({ type: "valueChange", payload: e.target.value })
                  : dispatchPlay({
                      type: "SIZE_CHANGE",
                      payload: e.target.value,
                    })
              }
              className={styles.valueSlider}
            />
          </div>
        </Tooltip>

        <div id="utilitiesDiv" className={styles.utilitiesDiv}>
          {!isPlayMode ? (
            <div className={styles.utilities}>
              <ToggleButtonGroup
                color="primary"
                size="small"
                value={state.toggle}
                exclusive
                onChange={(e, newValue) => {
                  if (newValue)
                    dispatch({ type: "toggleChange", payload: newValue });
                }}
              >
                <Tooltip title="Bar View">
                  <CustomToggleButton value="bar">
                    <BarChartIcon fontSize="small" />
                  </CustomToggleButton>
                </Tooltip>
                <Tooltip title="Box View">
                  <CustomToggleButton value="box">
                    <WidgetsIcon fontSize="small" />
                  </CustomToggleButton>
                </Tooltip>
              </ToggleButtonGroup>
              <Tooltip title="Show Tutorial" arrow>
                <button
                  onClick={() => setRun((prev) => !prev)}
                  className={styles.showTutorialBtn}
                >
                  <AutoStoriesIcon fontSize="small" sx={{ color: "white" }} />
                </button>
              </Tooltip>
            </div>
          ) : (
            ""
          )}
          {isPlayMode ? <PlayModeControls algoPlay={algoPlay} /> : ""}
          <div className={styles.modeSwitcher}>
            {isPlayMode ? (
              <NavLink to={json.link} className={styles.modeToggleLink}>
                Vizualizer
              </NavLink>
            ) : (
              <NavLink
                to={`${json.link}/play`}
                className={styles.modeToggleLink}
              >
                Game Mode
              </NavLink>
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

function PlayModeControls({ algoPlay }) {
  const { state, dispatch } = usePlayModeContext();

  function handleStart() {
    dispatch({ type: "SET_ALGO", payload: algoPlay });
    return;
  }
  return (
    <>
      <div className={styles.buttonDiv}>
        <Tooltip title={!state.isPlaying ? "Play" : "Pause"} interactive arrow>
          <button
            className={styles.buttonStart}
            disabled={state.isSorting}
            onClick={handleStart}
          >
            <PlayArrowIcon fontSize="small" />
          </button>
        </Tooltip>

        <Tooltip
          title={state.isSorting ? "Stop Sorting 🚫" : "Generate NEW Array"}
        >
          <button
            className={styles.buttonReset}
            onClick={() =>
              state.isSorting
                ? dispatch({ type: "RESET" })
                : dispatch({ type: "REGENERATE" })
            }
          >
            {state.isSorting ? (
              <StopIcon fontSize="small" />
            ) : (
              <RestartAltIcon fontSize="small" />
            )}
          </button>
        </Tooltip>

        <Timer getState={() => state} dispatch={dispatch} />
        <div className={styles.pointsDiv}>
          <span>Points :</span> <span>{state.points}</span>
        </div>
      </div>
    </>
  );
}

export default InputFields;
