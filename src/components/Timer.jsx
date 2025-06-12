import { useEffect } from "react";
import styles from "./Timer.module.css";
import TimerIcon from "@mui/icons-material/Timer";

function Timer({ getState, dispatch }) {
  const minutes = Math.floor(getState().time / 60);
  const seconds = Math.floor(getState().time % 60);

  useEffect(() => {
    const id = setInterval(() => {
      if (getState().isSorting) {
        dispatch({ type: "tick" });
      }
    }, 1000);

    return () => clearInterval(id);
  }, [getState().isSorting, dispatch]);

  return (
    <div className={styles.timer}>
      <TimerIcon fontSize="small" />
      {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`}
    </div>
  );
}

export default Timer;
