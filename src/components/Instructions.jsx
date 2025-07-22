import styles from "./Instructions.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function Instructions({ lines, handleClose }) {
  if (!lines || lines.length === 0) return null;

  return (
    <div className={styles.modalBox}>
      <div className={styles.modalHeader}>
        <h1 style={{ marginBottom: "0.5rem" }}>How to Play</h1>
        <button onClick={() => handleClose()}>
          <ClearIcon fontSize="small" style={{ color: "white" }} />
        </button>
      </div>

      <ul>
        {lines.map((line, index) => (
          <div className={styles.instructionContainer} key={index}>
            <div className={styles.number}>{index + 1}</div>
            <div className={styles.instruction} key={index}>
              {line}
            </div>
          </div>
        ))}
      </ul>
      <button onClick={() => handleClose()} className={styles.continueButton}>
        Continue Playing{" "}
        <ArrowRightIcon fontSize="small" style={{ color: "white" }} />
      </button>
    </div>
  );
}

export default Instructions;
