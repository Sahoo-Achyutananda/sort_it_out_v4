import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import AddBoxIcon from "@mui/icons-material/AddBox";
import styles from "./SelectNavigation.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// const routes = {
//   bubble: "/bubble",
//   selection: "/selection",
//   merge: "/merge",
//   insertion: "/insertion",
//   quick: "/quick",
//   racemode: "/racemode",
// };

function SelectNavigation({ text }) {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");

  function handleSelectChange(value) {
    setSelect(value);
  }
  function handleVisualize() {
    navigate(`/${select}`);
  }

  return (
    <div className={styles.container}>
      <FormControl>
        <InputLabel
          sx={{
            // fontSize: "14px",
            // color: "#a78bfa", // light purple
            color: "white", // light purple
            top: "-6px", // manually shift label upward
            fontSize: "0.9rem",
            // "&.Mui-focused": { color: "#7c3aed" }, // darker purple on focus
            "&.Mui-focused": { color: "white" }, // darker purple on focus
          }}
        >
          {text}
        </InputLabel>

        <Select
          id="demo-simple-select"
          value={select}
          label="Algorithm"
          onChange={(e) => handleSelectChange(e.target.value)}
          className={styles.select}
          sx={{
            height: 40,
            color: "white",
            // width: "350px",
            backgroundColor: "#1e1b4b", // deep purple bg
            borderRadius: "8px",
            // border: "1px solid #7c3aed",
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
          {/* <MenuItem value="">Choose Algorithm</MenuItem> */}
          <MenuItem value="bubble">
            <SelectItem title="Bubble Sort" />
          </MenuItem>
          <MenuItem value="insertion">
            <SelectItem title="Insertion Sort" />
          </MenuItem>
          <MenuItem value="selection">
            <SelectItem title="Selection Sort" />
          </MenuItem>
          <MenuItem value="merge">Merge Sort</MenuItem>
          <MenuItem value="quick">Quick Sort</MenuItem>
        </Select>
      </FormControl>
      {/* <button onClick={handleAddAlgorithm}>Add Algorithm</button> */}
      <button className={styles.buttonAdd} onClick={() => handleVisualize()}>
        <SearchIcon fontSize="small" sx={{ color: "white" }} />
      </button>
    </div>
  );
}

function SelectItem({ title }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {title}
      <PlayModeAdv />
    </div>
  );
}

function PlayModeAdv() {
  return (
    <div className={styles.playModeAdv}>
      <p>with Game Mode</p>
    </div>
  );
}

export default SelectNavigation;
