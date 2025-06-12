import styles from "./Timer.module.css";
import TimerIcon from "@mui/icons-material/Timer";
import Tooltip from "@mui/material/Tooltip";

function Timer({ time }) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return (
    <Tooltip title="Time Taken ⏰">
      <div className={styles.timer}>
        <TimerIcon fontSize="small" />
        {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`}
      </div>
    </Tooltip>
  );
}

export default Timer;
