import Slider from "@mui/material/Slider";
import styles from "./InputFields.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import DataArrayIcon from "@mui/icons-material/DataArray";
import SpeedIcon from "@mui/icons-material/Speed";
import ArrayContainer from "./ArrayContainer";
import Timer from "./Timer";
import { flushSync } from "react-dom";
import Leaderboard from "./Leaderboard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Tooltip from "@mui/material/Tooltip";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import Title from "../Title.jsx";

function InputFields({
  algorithms,
  state,
  initialState,
  dispatch,
  handleAddAlgorithm,
  handleSelectChange,
  runAlgos,
  // runAlgos,
}) {
  const notify = () =>
    toast.error(
      "Race in progress. Algorithm removal is disabled during an active session.",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );
  const totalCount = Object.keys(state.activeAlgorithms).length;
  return (
    <div className={styles.Container}>
      <Title title={"RACE MODE"} />
      <div className={styles.mainInputDiv}>
        <div className={styles.userInputs}>
          <Tooltip interative followCursor title="Change Speed 🏃‍♀️">
            <div className={`${styles.sliderDiv} ${styles.speedDiv}`}>
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
                  dispatch({
                    type: "UPDATE_SPEED",
                    payload: parseInt(e.target.value),
                  })
                }
                className={styles.speedSlider}
              />
            </div>
          </Tooltip>

          <Tooltip title="Change Array Size 📦" interative followCursor>
            <div className={`${styles.sliderDiv} ${styles.valueDiv}`}>
              <DataArrayIcon fontSize="small" sx={{ color: "white" }} />
              <Slider
                aria-label="Speed"
                defaultValue={initialState.speed}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={50}
                value={state.value}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_VALUE",
                    payload: parseInt(e.target.value),
                  })
                }
                className={styles.valueSlider}
              />
            </div>
          </Tooltip>
          {/* </div> */}
        </div>
        <div className={styles.raceModeContainer}>
          <div className={styles.buttonDiv}>
            <button
              className={styles.buttonStart}
              disabled={state.raceStarted}
              onClick={() => {
                flushSync(() => {
                  dispatch({ type: "RACE-STARTED" });
                });
                runAlgos();
              }}
            >
              <PlayArrowIcon fontSize="small" />
            </button>
            <Tooltip
              title={state.raceStarted ? "STOP 🚫" : "RESET VALUES 🆕"}
              interactive
              followCursor
            >
              <button
                className={styles.buttonReset}
                onClick={() =>
                  flushSync(() => {
                    state.raceStarted
                      ? dispatch({ type: "STOP" })
                      : dispatch({ type: "RESET" });
                  })
                }
              >
                {state.raceStarted ? (
                  <StopIcon fontSize="small" />
                ) : (
                  <RestartAltIcon fontSize="small" />
                )}
              </button>
            </Tooltip>
          </div>
          <div className={styles.controls}>
            <FormControl>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  color: "#a78bfa", // light purple
                  "&.Mui-focused": { color: "#7c3aed" }, // darker purple on focus
                }}
              >
                Algorithm
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.selectedAlgorithm}
                label="Algorithm"
                onChange={handleSelectChange}
                sx={{
                  height: 40,
                  color: "white",
                  width: "150px",
                  backgroundColor: "#1e1b4b", // deep purple bg
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#7c3aed",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a78bfa",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#c084fc",
                  },
                  "& .MuiSelect-icon": {
                    color: "white",
                  },
                }}
              >
                {Object.entries(algorithms).map(([key, { name }]) => (
                  <MenuItem key={key} value={key}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <button className={styles.buttonAdd} onClick={handleAddAlgorithm}>
              <AddBoxIcon fontSize="small" sx={{ color: "white" }} />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* <h2>LEADERBOARD</h2> */}
        <Leaderboard state={state} />
      </div>
      <div className={styles.battleField}>
        <div
          style={{
            display: "grid",
            gridTemplateRows: `repeat(${totalCount}, 1fr)`,
            gap: "10px",
          }}
        >
          {Object.keys(state.activeAlgorithms).map((algoKey) => (
            <div key={algoKey} className={styles.algorithmContainer}>
              <div className={styles.algorithmHeader}>
                {/* <div>Time : {state.activeAlgorithms[algoKey]?.time}</div> */}
                <div className={styles.sortingInsights}>
                  <Timer time={state.activeAlgorithms[algoKey]?.time} />
                  <Comparisons
                    comparisons={state.activeAlgorithms[algoKey]?.comparisons}
                  />
                  <Swaps swaps={state.activeAlgorithms[algoKey]?.swaps} />
                </div>
                <span className={styles.algoTitle}>
                  {algorithms[algoKey].name}
                </span>
                <span className={styles.algoShortTitle}>
                  {algorithms[algoKey].short_name}
                </span>
                <button
                  onClick={() =>
                    !state.raceStarted
                      ? dispatch({
                          type: "REMOVE_ALGORITHM",
                          payload: algoKey,
                        })
                      : notify()
                  }
                >
                  ×
                </button>
              </div>

              <ArrayContainer
                state={state}
                algoKey={algoKey}
                algorithm={state.activeAlgorithms[algoKey].fn}
                dispatch={dispatch}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Comparisons({ comparisons }) {
  return (
    <Tooltip title="Comparisons" followCursor interactive>
      <div className={styles.comparisons}>
        {" "}
        <CompareArrowsIcon fontSize="medium" /> {comparisons}{" "}
      </div>
    </Tooltip>
  );
}

function Swaps({ swaps }) {
  return (
    <Tooltip title="Swaps" interactive followCursor>
      <div className={styles.swaps}>
        {" "}
        <SwapHorizIcon fontSize="medium" />
        {swaps}{" "}
      </div>
    </Tooltip>
  );
}

export default InputFields;
