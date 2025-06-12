// import * as utils from "../utils/utils.js";

// async function partition(arr, l, r, getStateRef, dispatch) {
//   let pivot = arr[r];
//   const getState = () => getStateRef()?.current || getStateRef();
//   let speed = 0;
//   let i = l - 1;

//   for (let j = l; j < r; j++) {
//     dispatch({ type: "comparisonPlus", algoName: "quick" });
//     if (arr[j] <= pivot) {
//       if (!getState().isSorting) return;
//       dispatch({ type: "selectedIndices", payload: [j, r], algoName: "quick" });
//       dispatch({ type: "highlightIndices", payload: [i], algoName: "quick" });
//       i++;
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//       dispatch({ type: "swapPlus", algoName: "quick" });
//       dispatch({
//         type: "arrayMovements",
//         payload: [...arr],
//         algoName: "quick",
//       });
//       speed = getState().speed;
//       await utils.randomDelay(1 / speed);
//     }
//   }
//   [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];
//   if (!getState().isSorting) return;
//   dispatch({ type: "swapPlus", algoName: "quick" });
//   dispatch({ type: "arrayMovements", payload: [...arr], algoName: "quick" });
//   speed = getState().speed;
//   await utils.randomDelay(1 / speed);

//   return i + 1;
// }

// async function quickSort(arr, low, high, getStateRef, dispatch) {
//   const getState = () => getStateRef()?.current || getStateRef();
//   if (!getState().isSorting) return;
//   if (low < high) {
//     let pi = await partition(arr, low, high, getStateRef, dispatch);
//     await quickSort(arr, low, pi - 1, getStateRef, dispatch);
//     await quickSort(arr, pi + 1, high, getStateRef, dispatch);
//   }
// }

// async function performQuickSort(
//   arr,
//   getStateRef,
//   dispatch,
//   controllerRef = null
// ) {
//   try {
//     dispatch({ type: "sortingStarted", algoName: "quick" });
//     await quickSort(arr, 0, arr.length - 1, getStateRef, dispatch);
//   } finally {
//     dispatch({ type: "sortingCompleted", algoName: "quick" });
//     console.log(controllerRef);
//   }
// }

// export default performQuickSort;
import * as utils from "../utils/utils.js";

async function partition(arr, l, r, getStateRef, dispatch) {
  let pivot = arr[r];
  const getState = () => getStateRef()?.current || getStateRef();
  let speed = 0;
  let i = l - 1;

  dispatch({
    type: "setDescription",
    payload: `Choosing pivot ${pivot} at index ${r}`,
    algoName: "quick",
  });

  for (let j = l; j < r; j++) {
    dispatch({ type: "comparisonPlus", algoName: "quick" });

    dispatch({
      type: "setDescription",
      payload: `Comparing ${arr[j]} (index ${j}) with pivot ${pivot} (index ${r})`,
      algoName: "quick",
    });

    if (arr[j] <= pivot) {
      if (!getState().isSorting) return;

      dispatch({ type: "selectedIndices", payload: [j, r], algoName: "quick" });
      dispatch({
        type: "highlightIndices",
        payload: [i + 1],
        algoName: "quick",
      });

      i++;

      dispatch({
        type: "setDescription",
        payload: `Swapping ${arr[i]} (index ${i}) with ${arr[j]} (index ${j})`,
        algoName: "quick",
      });

      [arr[i], arr[j]] = [arr[j], arr[i]];

      dispatch({ type: "swapPlus", algoName: "quick" });
      dispatch({
        type: "arrayMovements",
        payload: [...arr],
        algoName: "quick",
      });

      speed = getState().speed;
      await utils.randomDelay(1 / speed);
    }
  }

  dispatch({
    type: "setDescription",
    payload: `Placing pivot ${
      arr[r]
    } (index ${r}) to its correct position at index ${i + 1}`,
    algoName: "quick",
  });

  [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];

  if (!getState().isSorting) return;

  dispatch({ type: "swapPlus", algoName: "quick" });
  dispatch({ type: "arrayMovements", payload: [...arr], algoName: "quick" });

  speed = getState().speed;
  await utils.randomDelay(1 / speed);

  return i + 1;
}

async function quickSort(arr, low, high, getStateRef, dispatch) {
  const getState = () => getStateRef()?.current || getStateRef();
  if (!getState().isSorting) return;

  if (low < high) {
    dispatch({
      type: "setDescription",
      payload: `Quick Sorting from index ${low} to ${high}`,
      algoName: "quick",
    });

    let pi = await partition(arr, low, high, getStateRef, dispatch);

    dispatch({
      type: "setDescription",
      payload: `Partition complete. Pivot placed at index ${pi}. Now sorting left (index ${low} to ${
        pi - 1
      }) and right (index ${pi + 1} to ${high})`,
      algoName: "quick",
    });

    await quickSort(arr, low, pi - 1, getStateRef, dispatch);
    await quickSort(arr, pi + 1, high, getStateRef, dispatch);
  }
}

async function performQuickSort(
  arr,
  getStateRef,
  dispatch,
  controllerRef = null
) {
  try {
    dispatch({
      type: "setDescription",
      payload: "Starting Quick Sort on entire array",
      algoName: "quick",
    });
    dispatch({ type: "sortingStarted", algoName: "quick" });

    await quickSort(arr, 0, arr.length - 1, getStateRef, dispatch);
  } finally {
    dispatch({
      type: "setDescription",
      payload: "Array is fully sorted.",
      algoName: "quick",
    });
    dispatch({ type: "sortingCompleted", algoName: "quick" });
    console.log(controllerRef);
  }
}

export default performQuickSort;
