import { useSearchParams } from "react-router-dom";
import styles from "./PlayMode.module.css";
import { usePlayModeContext } from "../../contexts/PlayModeContext";
import { useRef, useState } from "react";

import {
  DndContext,
  closestCenter,
  MouseSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  arrayMove,
  horizontalListSortingStrategy,
  //   rectSwappingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function PlayMode() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [correctCount, setCorrectCount] = useState(0);
  const { dispatch, state } = usePlayModeContext();
  const ArrayContainerRef = useRef();

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  function handleAlgoSelect(e) {
    const algo = e.target.value;
    setSearchParams({ algo });
    dispatch({ type: "SET_ALGO", payload: algo });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = state.array.findIndex((item) => item.id === active.id);
    const newIndex = state.array.findIndex((item) => item.id === over.id);

    const newArray = arrayMove(state.array, oldIndex, newIndex);

    // Checking whether the next step is correct -
    const nextStateArray = state.history[state.currentStep + 1].arrayState;
    console.log(nextStateArray, newArray);
    if (newArray[newIndex].value === nextStateArray[newIndex].value) {
      // alert("Correct");

      const affectedIds = [state.array[oldIndex].id, state.array[newIndex].id];

      dispatch({ type: "SET_RECENT", payload: affectedIds });
      dispatch({ type: "INCR_STEP" });
      // state.currentStep++;
    } else {
      console.log(
        newArray[newIndex].value === nextStateArray[newIndex].value,
        newArray[newIndex].value,
        nextStateArray[newIndex].value
      );
      // alert("wrong");
      return;
    }

    // Checking How many are correctly sorted -
    const targetArray = state.history[state.history.length - 1].arrayState;
    let newCorrectCount = 0;

    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].value === targetArray[i].value) {
        newCorrectCount++;
      }
    }
    setCorrectCount(newCorrectCount);
    dispatch({ type: "SET_ARRAY", payload: newArray });
  }

  return (
    <div className={styles.PlayModeContainer}>
      <select
        className={styles.AlgoSelect}
        value={state.algo}
        onChange={handleAlgoSelect}
      >
        <option value="random">Random</option>
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="merge">Merge Sort</option>
      </select>

      <div className={styles.AlgoName}>{state.algo}</div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={state.array.map((item) => item.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className={styles.ArrayContainer} ref={ArrayContainerRef}>
            {state.array.map((item) => (
              <Bar key={item.id} id={item.id} height={item.value} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div>Correctly Placed : {correctCount}</div>
    </div>
  );
}

function Bar({ id, height }) {
  const { state } = usePlayModeContext();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    height: `${height}px`,
    width: "30px",
    margin: "0 4px",
    backgroundColor: state.recentIndicesAffected.includes(id)
      ? "rebeccapurple"
      : "#00ff99",
    transform: CSS.Transform.toString(transform),
    transition,
    borderRadius: "4px",
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={styles.BarContainer}
      key={id}
    >
      <div style={style} key={id}>
        {height}
      </div>
    </div>
  );
}

export default PlayMode;
