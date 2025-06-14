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
    /*
    In dnd-kit, active and over refer to the draggable and droppable elements involved in a drag and drop operation. 
    active represents the element being dragged, while over represents the element the dragged element is currently 
    hovering over.
    */

    if (!over || active.id === over.id) return; // if there is no droppable element then return or if draggable elem = droppable elem - return

    const oldIndex = state.array.findIndex((item) => item.id === active.id);
    console.log("prev index : ", oldIndex);
    // gets the index of the draggable object
    const newIndex = state.array.findIndex((item) => item.id === over.id);
    console.log("new index : ", newIndex);
    // gets the index of the droppable object

    const newArray = arrayMove(state.array, oldIndex, newIndex);
    // change the array

    // Checking whether the next step is correct -
    console.log("current step", state.currentStep);
    const nextStateArray = state.history[state.currentStep + 1].arrayState;
    if (newArray[newIndex].value === nextStateArray[newIndex].value) {
      const affectedIds = [state.array[oldIndex].id, state.array[newIndex].id];

      dispatch({ type: "SET_RECENT", payload: affectedIds });
      dispatch({ type: "INCR_STEP" });
    } else {
      console.log(
        newArray[newIndex].value === nextStateArray[newIndex].value,
        "array value",
        newArray[newIndex].value,
        "neext Array value",
        nextStateArray[newIndex].value
      );
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
        <br />({id})
      </div>
    </div>
  );
}

export default PlayMode;
