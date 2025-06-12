import { useSearchParams } from "react-router-dom";
import styles from "./PlayMode.module.css";
import { usePlayModeContext } from "../../contexts/PlayModeContext";
import { useRef } from "react";

import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function PlayMode() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dispatch, state } = usePlayModeContext();
  const ArrayContainerRef = useRef();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleAlgoSelect(e) {
    e.preventDefault();
    const algo = e.target.value;
    setSearchParams({ algo });
    dispatch({ type: "SET_ALGO", payload: algo });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = state.array.findIndex(
      (val) => val === parseInt(active.id)
    );
    const newIndex = state.array.findIndex((val) => val === parseInt(over.id));

    const newArray = [...state.array];
    [newArray[oldIndex], newArray[newIndex]] = [
      newArray[newIndex],
      newArray[oldIndex],
    ];

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
        <div className={styles.ArrayContainer} ref={ArrayContainerRef}>
          {state.array.map((value) => (
            <Bar key={value} id={value.toString()} height={value} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

function Bar({ id, height }) {
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    transition,
  } = useDraggable({ id });
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id });

  const style = {
    height: `${height}px`,
    width: "20px",
    margin: "0 4px",
    backgroundColor: isOver ? "#00ff99" : "#00bfff",
    transform: CSS.Transform.toString(transform),
    transition,
    borderRadius: "4px",
    cursor: "grab",
  };

  return (
    <div
      ref={(node) => {
        setDragRef(node);
        setDropRef(node);
      }}
      {...attributes}
      {...listeners}
      className={styles.BarContainer}
    >
      <div style={style} />
    </div>
  );
}

export default PlayMode;
