// import { useSearchParams } from "react-router-dom";
import styles from "./PlayModeArrayContainer.module.css";
import { usePlayModeContext } from "../../contexts/PlayModeContext";
import { useRef, useState, useEffect } from "react";

import Tooltip from "@mui/material/Tooltip";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

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

function PlayModeArrayContainer() {
  const { dispatch, state } = usePlayModeContext();
  const [hint, toggleHint] = useState(false);
  const [correct, setCorrect] = useState(null);
  const ArrayContainerRef = useRef(null);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  // function handleHintBtn() {
  //   if (hint === true) {
  //     setTimeout(() => {
  //       toggleHint(false);
  //     }, 1500);
  //   } else {
  //     toggleHint(true);
  //   }
  // }

  function handleDragEnd(event) {
    const { active, over } = event;
    /*
    In dnd-kit, active and over refer to the draggable and droppable elements involved in a drag and drop operation. 
    active represents the element being dragged, while over represents the element the dragged element is currently 
    hovering over.
    */

    if (!over || active.id === over.id) return; // if there is no droppable element then return or if draggable elem = droppable elem - return
    const oldIndex = state.array.findIndex((item) => item.id === active.id);
    // gets the index of the draggable object
    const newIndex = state.array.findIndex((item) => item.id === over.id);
    // gets the index of the droppable object

    let newArray;
    if (state.algo === "selection") {
      newArray = [...state.array];
      [newArray[oldIndex], newArray[newIndex]] = [
        newArray[newIndex],
        newArray[oldIndex],
      ];
    } else {
      newArray = arrayMove(state.array, oldIndex, newIndex);
    }
    const nextStateArray = state.history[state.currentStep].arrayState;

    if (newArray[newIndex].value === nextStateArray[newIndex].value) {
      const affectedIds = [oldIndex, newIndex];

      dispatch({ type: "CHANGE_POINT", payload: 20 });
      dispatch({ type: "SET_RECENT", payload: affectedIds });
      dispatch({ type: "INCR_STEP" });

      setCorrect(true);
    } else {
      dispatch({ type: "CHANGE_POINT", payload: -10 });
      setCorrect(false);
      return;
    }
    dispatch({ type: "SET_ARRAY", payload: newArray });
  }

  return (
    <>
      <div className={styles.messageBox}>
        {/* <div className={styles.statusBox}> */}
        <div
          className={`${styles.statusBox} ${
            !state.isSorting
              ? styles.statusBox
              : hint
              ? styles.statusBoxHint
              : state.currentStep > 0
              ? !correct
                ? styles.statusBoxSuccess
                : styles.statusBoxError
              : styles.statusBox
          }`}
        >
          {!state.isSorting
            ? "Press Play Button to Start"
            : hint
            ? state.history[state.currentStep].hint
            : state.currentStep > 0
            ? correct
              ? "CORRECT : The Swap is Correct | Points +20"
              : "INCORRECT : The swap is incorrect | Points -10"
            : "Make a move"}
        </div>
        <div
          className={hint ? styles.hintBtn : styles.hintBtnActive}
          onClick={() => toggleHint(!hint)}
        >
          <LightbulbIcon
            fontSize="small"
            sx={hint ? { color: "black" } : { color: "yellow" }}
          />
        </div>
      </div>
      <div className={styles.PlayModeContainer}>
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
              {state.array.map((item, index) => (
                <Bar
                  arrayContainerRef={ArrayContainerRef}
                  key={item.id}
                  id={item.id}
                  height={item.value}
                  index={index}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}

function Bar({ arrayContainerRef, id, height, index }) {
  const { state } = usePlayModeContext();
  const [dimensions, setDimensions] = useState({
    height: "50px",
    width: "50px",
  });
  useEffect(() => {
    if (arrayContainerRef.current) {
      const containerWidth = arrayContainerRef.current.offsetWidth;
      const boxWidth = containerWidth / state.array.length - 2;
      setDimensions({
        height: height,
        width: `${boxWidth}px`,
      });
    }
  }, [arrayContainerRef, state.array.length, height, id]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    height: `${height}px`,
    width: dimensions.width,
    backgroundColor: state.recentIndicesAffected.includes(id)
      ? "rebeccapurple"
      : "#00ff99",
    transform: CSS.Transform.toString(transform),
    transition,
    borderRadius: "4px",
    cursor: "grab",
  };

  const indexClasses = [
    styles.index,
    state.recentIndicesAffected.includes(id) ? styles.highlightIndex : "",
  ].join(" ");

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={styles.BarContainer}
      key={id}
    >
      <div
        className={indexClasses}
        style={{
          width: dimensions.width,
        }}
      >
        {index}
      </div>
      <Tooltip title={height} arrow>
        <div style={style} key={id} className={styles.Bar}>
          {height}
        </div>
      </Tooltip>
    </div>
  );
}

export default PlayModeArrayContainer;
