import Slider from "@mui/material/Slider";
import styles from "./InputFields.module.css";
import { NavLink } from "react-router-dom";

import DataArrayIcon from "@mui/icons-material/DataArray";
import SpeedIcon from "@mui/icons-material/Speed";
// import { flushSync } from "react-dom";

import { styled } from "@mui/material/styles";

import BarChartIcon from "@mui/icons-material/BarChart";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Tooltip from "@mui/material/Tooltip";

const CustomToggleButton = styled(ToggleButton)(() => ({
  color: "white",
  backgroundColor: "#424242",
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
  // handlePlayButton,
}) {
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
        <Tooltip title="Set Speed 🏃‍♀️" followCursor interactive>
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
                dispatch({ type: "speedChange", payload: e.target.value })
              }
              className={styles.speedSlider}
            />
          </div>
        </Tooltip>
        <Tooltip title="Set Array Size 📦" interactive followCursor>
          <div className={`${styles.sliderDiv} ${styles.valueDiv}`}>
            <DataArrayIcon fontSize="small" sx={{ color: "white" }} />
            <Slider
              aria-label="Speed"
              defaultValue={20}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={50}
              value={state.value}
              onChange={(e) =>
                dispatch({ type: "valueChange", payload: e.target.value })
              }
              className={styles.valueSlider}
            />
          </div>
        </Tooltip>
        <div className={styles.utilitiesDiv}>
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
          </div>
          {/* <button onClick={() => handlePlayButton()}>Play 🛝</button> */}
          <div className={styles.modeSwitcher}>
            <NavLink
              to={json.link}
              className={({ isActive }) =>
                `${styles.tab} ${isActive ? styles.activeTab : ""}`
              }
            >
              Normal Mode
            </NavLink>
            <NavLink
              to={`${json.link}/play`}
              className={({ isActive }) =>
                `${styles.tab} ${isActive ? styles.activeTab : ""}`
              }
            >
              Play Mode
            </NavLink>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default InputFields;
