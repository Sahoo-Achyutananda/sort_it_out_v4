import { useReducer, useEffect, useRef } from "react";
import InputFields from "../../components/raceMode/InputFields";
import "./RaceMode.css";
import { reducer, algorithms, initialState } from "./store.jsx";
function RaceMode() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const stateRef = useRef(initialState);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    console.log("hii");
    const id = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(id);
  }, [state.time]);

  function runAlgos() {
    Object.keys(state.activeAlgorithms).forEach((key) => {
      const algoFn = state.activeAlgorithms[key].fn;
      const initialArray = [...state.activeAlgorithms[key].array]; // Use a copy
      algoFn(
        initialArray,
        () => stateRef.current.activeAlgorithms[key],
        dispatch
      );
    });
    // dispatch({ type: "RACE-COMPLETED" });
  }

  const handleAddAlgorithm = () => {
    dispatch({
      type: "ADD_ALGORITHM",
      payload: {
        algoName: state.selectedAlgorithm,
        algoFun: algorithms[state.selectedAlgorithm]["fn"],
      },
    });
  };

  const handleSelectChange = (e) => {
    dispatch({ type: "SET_SELECTED", payload: e.target.value });
  };

  return (
    <>
      <InputFields
        algorithms={algorithms}
        state={state}
        initialState={initialState}
        dispatch={dispatch}
        handleAddAlgorithm={handleAddAlgorithm}
        handleSelectChange={handleSelectChange}
        runAlgos={runAlgos}
      />
    </>
  );
}

export default RaceMode;
