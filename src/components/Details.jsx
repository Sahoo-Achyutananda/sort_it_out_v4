import styles from "./Details.module.css";
import { useEffect, useState } from "react";
import TimeProgressBar from "./TimerProgressBar";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

function Details({ json }) {
  return (
    <>
      <div className={styles.details}>
        <span className={styles.detailsTitle}>
          <TipsAndUpdatesIcon />
          General Information
        </span>
        <Description>{json.description}</Description>
        <Slider>{json.interesting_facts}</Slider>
        <TimeComplexity data={json.time_complexity} />
        <SpaceComplexity data={json.space_complexity} />
      </div>
    </>
  );
}

function Description({ children }) {
  return <div className={styles.description}>{children}</div>;
}

function TimeComplexity({ data }) {
  return (
    <div className={styles.table}>
      <div className={styles.title}>Time Complexity</div>
      <div className={styles.row}>
        <div className={styles.col}>
          <div>Best</div>
          <div>{data.best}</div>
        </div>
        <div className={styles.colMid}>
          <div>Avg.</div>
          <div>{data.average}</div>
        </div>
        <div className={styles.col}>
          <div>Worst</div>
          <div>{data.worst}</div>
        </div>
      </div>
    </div>
  );
}

function SpaceComplexity({ data }) {
  return (
    <div className={styles.table}>
      <div className={styles.title}>Space Complexity</div>
      <div className={styles.row}>
        <div className={styles.colSingle}>
          <div>{data}</div>
        </div>
      </div>
    </div>
  );
}

function Slider({ children }) {
  const [state, setState] = useState(0);
  const [progress, setProgress] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const duration = 2;

  function handleState(index) {
    setAutoAdvance(false);
    setProgress(0);
    setState(index);
  }

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setAutoAdvance(true);
          //   setState((prev) => (prev === children.length - 1 ? 0 : prev + 1));
          return 0;
        } else {
          const increment = (100 / duration) * 0.05;
          return Math.min(prevProgress + increment, 100);
        }
      });
    }, 50);

    return () => clearInterval(id);
  }, [children.length, state, progress]);

  useEffect(() => {
    if (progress === 0 && autoAdvance) {
      setState((prev) => (prev === children.length - 1 ? 0 : prev + 1));
    }
  }, [progress, autoAdvance, children.length]);

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: "#eee", width: "100%", height: "3px" }}>
        <div
          style={{
            width: `${progress}%`,
            maxWidth: "100%",
            backgroundColor: "green",
            height: "100%",
          }}
        ></div>
      </div>
      {children.map((item, index) => (
        <div
          className={styles.card}
          style={{ display: state === index ? "block" : "none" }}
        >
          <span>{item}</span>
        </div>
      ))}
      {/* <TimeProgressBar duration={5} /> */}

      <div className={styles.buttons}>
        {children.map((item, index) => (
          <div
            className={
              state === index
                ? styles.sliderNavButtons
                : styles.activeSliderNavButtons
            }
            key={index}
            onClick={() => handleState(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Details;
