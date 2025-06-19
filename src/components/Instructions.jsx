import styles from "./Instructions.module.css";

function Instructions({ lines, handleClose }) {
  if (!lines || lines.length === 0) return null;

  return (
    <div className={styles.modalBox}>
      <div className={styles.modalHeader}>
        <button onClick={() => handleClose()}>x</button>
      </div>
      <h1 style={{ marginBottom: "0.5rem" }}>How to Play</h1>
      <ul>
        {lines.map((line, index) => (
          <div
            className={styles.instruction}
            key={index}
            style={{ marginBottom: "0.5rem" }}
          >
            {line}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Instructions;
