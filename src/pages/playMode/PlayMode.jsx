import { useSearchParams } from "react-router-dom";
import styles from "./PlayMode.module.css";

function PlayMode() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleAlgoSelect(e) {
    e.preventDefault();
    setSearchParams({ algo: e.target.value });
  }
  return (
    <div className={styles.PlayMode}>
      <div className={styles.PlayModeContainer}>
        <select
          className={styles.AlgoSelect}
          value={searchParams}
          onClick={(e) => handleAlgoSelect(e)}
        >
          <option value="random">Random</option>
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="merge">Merge Sort</option>
        </select>
      </div>
    </div>
  );
}

export default PlayMode;
