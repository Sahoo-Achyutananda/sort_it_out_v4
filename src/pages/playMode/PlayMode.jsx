import { useSearchParams } from "react-router-dom";
import styles from "./PlayMode.module.css";
import { usePlayModeContext } from "../../contexts/PlayModeContext";
import { useRef } from "react";

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
    console.log(active, over);
    if (!over || active.id === over.id) return;

    const oldIndex = parseInt(active.id);
    const newIndex = parseInt(over.id);

    const newArray = arrayMove(state.array, oldIndex, newIndex);
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
          items={state.array.map((_, index) => index.toString())}
          strategy={horizontalListSortingStrategy}
        >
          <div className={styles.ArrayContainer} ref={ArrayContainerRef}>
            {state.array.map((value, index) => (
              <Bar key={index} id={index.toString()} height={value} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function Bar({ id, height }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    height: `${height}px`,
    width: "20px",
    margin: "0 4px",
    backgroundColor: "#00ff99",
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
      <div style={style} key={id} />
    </div>
  );
}

export default PlayMode;
