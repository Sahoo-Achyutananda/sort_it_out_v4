async function bubbleSort(arr, getStateRef, dispatch) {
  dispatch({ type: "sortingStarted", algoName: "bubble" });

  const array = [...arr];
  const len = array.length;
  const getState = () => getStateRef()?.current || getStateRef();
  let speed = 0;

  for (let i = 0; i < len; i++) {
    speed = getState().speed;
    for (let j = 0; j < len - i - 1; j++) {
      if (!getState().isSorting) return;

      speed = getState().speed;

      const num1 = array[j];
      const num2 = array[j + 1];

      dispatch({
        type: "setDescription",
        payload: `Comparing ${num1} (index ${j}) and ${num2} (index ${j + 1})`,
      });

      dispatch({ type: "comparisonPlus", algoName: "bubble" });
      dispatch({
        type: "selectedIndices",
        payload: [j, j + 1],
        algoName: "bubble",
      });

      await new Promise((resolve) => setTimeout(resolve, 500 / speed));

      if (num1 > num2) {
        dispatch({
          type: "setDescription",
          payload: `Swapping ${num1} (index ${j}) and ${num2} (index ${j + 1})`,
        });

        await new Promise((resolve) => setTimeout(resolve, 200 / speed));

        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        dispatch({ type: "swapPlus", algoName: "bubble" });
        dispatch({
          type: "arrayMovements",
          payload: [...array],
          algoName: "bubble",
        });

        await new Promise((resolve) => setTimeout(resolve, 200 / speed));
      } else {
        dispatch({
          type: "setDescription",
          payload: `No swap needed for ${num1} (index ${j}) and ${num2} (index ${
            j + 1
          })`,
        });

        await new Promise((resolve) => setTimeout(resolve, 300 / speed));
      }

      dispatch({ type: "selectedIndices", payload: [], algoName: "bubble" });
      await new Promise((resolve) => setTimeout(resolve, 100 / speed));
    }
  }

  dispatch({ type: "setDescription", payload: "Array is fully sorted." });
  dispatch({ type: "sortingCompleted", algoName: "bubble" });
}

export default bubbleSort;
