// import * as utils from "../utils/utils.js";

// async function insertionSort(arr, getStateRef, dispatch, controllerRef = null) {
//   dispatch({ type: "sortingStarted", algoName: "insertion" });
//   console.log(controllerRef); // useless
//   const getState = () => getStateRef()?.current || getStateRef();
//   let speed = 0;

//   const array = [...arr];
//   const n = arr.length;
//   let i;

//   for (i = 1; i < n; i++) {
//     if (!getState().isSorting) return;
//     let key = array[i];
//     let j = i - 1;

//     while (j >= 0 && array[j] > key) {
//       if (!getState().isSorting) return;
//       dispatch({ type: "comparisonPlus", algoName: "insertion" });

//       dispatch({
//         type: "selectedIndices",
//         payload: [j, j + 1],
//         algoName: "insertion",
//       });
//       // await utils.randomDelay(1 / speed);
//       dispatch({
//         type: "swapPlus",
//         payload: [j, j + 1],
//         algoName: "insertion",
//       });

//       array[j + 1] = array[j];

//       dispatch({
//         type: "arrayMovements",
//         payload: array,
//         algoName: "insertion",
//       });
//       speed = getState().speed;
//       await utils.randomDelay(1 / speed);
//       j = j - 1;
//     }
//     dispatch({ type: "swapPlus", payload: [j + 1, i], algoName: "insertion" });
//     // await utils.randomDelay(1 / speed);
//     array[j + 1] = key;
//     dispatch({ type: "arrayMovements", payload: array, algoName: "insertion" });
//     speed = getState().speed;
//     await utils.randomDelay(1 / speed);
//   }

//   dispatch({ type: "sortingCompleted", algoName: "insertion" });
// }

// export default insertionSort;

import * as utils from "../utils/utils.js";

async function insertionSort(arr, getStateRef, dispatch, controllerRef = null) {
  dispatch({ type: "sortingStarted", algoName: "insertion" });

  const getState = () => getStateRef()?.current || getStateRef();
  let speed = 0;

  const array = [...arr];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    if (!getState().isSorting) return;

    let key = array[i];
    let j = i - 1;

    dispatch({
      type: "setDescription",
      payload: `Inserting element ${key} at position ${i}`,
    });

    while (j >= 0 && array[j] > key) {
      if (!getState().isSorting) return;

      dispatch({ type: "comparisonPlus", algoName: "insertion" });

      dispatch({
        type: "selectedIndices",
        payload: [j, j + 1],
        algoName: "insertion",
      });

      dispatch({
        type: "setDescription",
        payload: `Comparing ${array[j]} and ${key} — shifting ${array[j]} to the right`,
      });

      dispatch({
        type: "swapPlus",
        payload: [j, j + 1],
        algoName: "insertion",
      });

      array[j + 1] = array[j];

      dispatch({
        type: "arrayMovements",
        payload: array,
        algoName: "insertion",
      });

      speed = getState().speed;
      await utils.randomDelay(1 / speed);
      j = j - 1;
    }

    dispatch({
      type: "setDescription",
      payload: `Placing ${key} at position ${j + 1}`,
    });

    dispatch({
      type: "swapPlus",
      payload: [j + 1, i],
      algoName: "insertion",
    });

    array[j + 1] = key;

    dispatch({
      type: "arrayMovements",
      payload: array,
      algoName: "insertion",
    });

    speed = getState().speed;
    await utils.randomDelay(1 / speed);
  }

  dispatch({
    type: "setDescription",
    payload: "Array is fully sorted!",
  });

  dispatch({ type: "sortingCompleted", algoName: "insertion" });
}

export default insertionSort;
