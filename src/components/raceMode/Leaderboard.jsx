import styles from "./Leaderboard.module.css";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

function Leaderboard({ state }) {
  return (
    <>
      <div className={styles.leaderboard}>
        {/* <div className={styles.leaderboardIcon}>
          <LeaderboardIcon fontSize="large" />
        </div> */}

        {Object.entries(state.activeAlgorithms).length ? (
          Object.entries(state.activeAlgorithms)
            .sort(([, a], [, b]) => a.time - b.time)
            .map(([key, algo], index) => (
              <Leader value={key} state={state} algo={algo} index={index} />
            ))
        ) : (
          <span>Add Algorithms. 1 vs 1 is Recommended 🙂</span>
        )}
      </div>
    </>
  );
}

function Leader({ value, state, algo, index }) {
  const runningOrNot = state.raceStarted
    ? algo.isSorting
      ? styles.running
      : styles.completed
    : styles.leader;
  return (
    <>
      <div key={value} className={runningOrNot}>
        <div className={styles.leaderIcon}>
          {index === 0 && (
            <span role="img" aria-label="gold medal">
              🥇
            </span>
          )}
          {index === 1 && (
            <span role="img" aria-label="silver medal">
              🥈
            </span>
          )}
          {index === 2 && (
            <span role="img" aria-label="bronze medal">
              🥉
            </span>
          )}
          {index > 2 && (
            <span role="img" aria-label="participant">
              🏅
            </span>
          )}
        </div>
        {value.toUpperCase()}
        <div className={styles.time}>{algo.time}s</div>
      </div>
    </>
  );
}

export default Leaderboard;
