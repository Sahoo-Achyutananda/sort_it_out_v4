// import * as utils from "../utils/utils.js";

// async function selectionSort(arr, getStateRef, dispatch, controllerRef = null) {
//   dispatch({ type: "sortingStarted", algoName: "selection" });
//   console.log(controllerRef);
//   const getState = () => getStateRef()?.current || getStateRef();
//   let speed = 0;

//   const array = [...arr];
//   const n = array.length;

//   var i, j;

//   for (i = 0; i < n; i++) {
//     var min_index = i;

//     for (j = i + 1; j < n; j++) {
//       if (!getState().isSorting) return;
//       dispatch({
//         type: "selectedIndices",
//         payload: [min_index, j],
//         algoName: "selection",
//       });
//       speed = getState().speed;
//       await utils.randomDelay(1 / speed);

//       // console.log(controllerRef, "Hello");
//       dispatch({ type: "comparisonPlus", algoName: "selection" });
//       if (array[min_index] > array[j]) {
//         min_index = j;
//       }
//     }

//     if (min_index !== i) {
//       let temp = array[min_index];
//       array[min_index] = array[i];
//       array[i] = temp;
//       dispatch({ type: "swapPlus", algoName: "selection" });
//     }

//     dispatch({ type: "arrayMovements", payload: array, algoName: "selection" });
//   }
//   dispatch({ type: "sortingCompleted", algoName: "selection" });
// }

// export default selectionSort;

import * as utils from "../utils/utils.js";

async function selectionSort(arr, getStateRef, dispatch, controllerRef = null) {
  dispatch({
    type: "setDescription",
    payload: "Starting Selection Sort on entire array",
    algoName: "selection",
  });

  dispatch({ type: "sortingStarted", algoName: "selection" });

  console.log(controllerRef);
  const getState = () => getStateRef()?.current || getStateRef();
  let speed = 0;

  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n; i++) {
    let min_index = i;

    dispatch({
      type: "setDescription",
      payload: `Assuming index ${i} (value: ${array[i]}) as minimum`,
      algoName: "selection",
    });

    for (let j = i + 1; j < n; j++) {
      if (!getState().isSorting) return;

      dispatch({
        type: "selectedIndices",
        payload: [min_index, j],
        algoName: "selection",
      });

      dispatch({
        type: "comparisonPlus",
        algoName: "selection",
      });

      dispatch({
        type: "setDescription",
        payload: `Comparing ${array[j]} (index ${j}) with current min ${array[min_index]} (index ${min_index})`,
        algoName: "selection",
      });

      speed = getState().speed;
      await utils.randomDelay(1 / speed);

      if (array[min_index] > array[j]) {
        min_index = j;

        dispatch({
          type: "setDescription",
          payload: `New minimum found: ${array[min_index]} at index ${min_index}`,
          algoName: "selection",
        });
      }
    }

    if (min_index !== i) {
      dispatch({
        type: "setDescription",
        payload: `Swapping ${array[i]} (index ${i}) with new min ${array[min_index]} (index ${min_index})`,
        algoName: "selection",
      });

      [array[min_index], array[i]] = [array[i], array[min_index]];

      dispatch({ type: "swapPlus", algoName: "selection" });
    } else {
      dispatch({
        type: "setDescription",
        payload: `No smaller value found. ${array[i]} remains at index ${i}`,
        algoName: "selection",
      });
    }

    dispatch({
      type: "arrayMovements",
      payload: [...array],
      algoName: "selection",
    });
  }

  dispatch({
    type: "setDescription",
    payload: "Array is fully sorted.",
    algoName: "selection",
  });

  dispatch({ type: "sortingCompleted", algoName: "selection" });
}

export default selectionSort;
