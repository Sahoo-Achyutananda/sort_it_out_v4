import { useReducer, useRef, useEffect } from "react";
import InputFields from "./InputFields.jsx";
import ArrayContainer from "./ArrayContainer.jsx";
import Code from "./Code.jsx";
import Details from "./Details.jsx";
import styles from "./SortingLayout.module.css";
import { reducer, initialState } from "../store.jsx";
import Title from "./Title.jsx";
import Feedback from "../pages/homePage/Feedback.jsx";

function SortingLayout({ algorithm, json }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {});

  return (
    <>
      <div className={styles.SortingLayout}>
        <Title title={json.name} />
        <div className={styles.utilities}>
          <InputFields
            dispatch={dispatch}
            state={state}
            stateRef={stateRef}
            initialState={initialState}
            algo={algorithm}
          ></InputFields>
        </div>
        <ArrayContainer state={state} dispatch={dispatch} algo={algorithm} />
      </div>
      <div className={styles.genInformation}>
        <div className={styles.infoDiv}>
          <Code json={json} />
          <Details json={json} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Feedback />
      </div>
    </>
  );
}

export default SortingLayout;
