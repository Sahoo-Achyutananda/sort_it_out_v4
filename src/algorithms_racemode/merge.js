// import * as utils from "../utils/utils.js";

// async function merge(arr, l, mid, r, getStateRef, dispatch) {
//   const getState = () => getStateRef()?.current || getStateRef();
//   let speed = 0;
//   if (!getState().isSorting) return;
//   dispatch({
//     type: "selectedIndices",
//     payload: Array.from({ length: r - l + 1 }, (_, i) => l + i),
//     algoName: "merge",
//   });

//   let array_1 = arr.slice(l, mid + 1);
//   let array_2 = arr.slice(mid + 1, r + 1);

//   let i = 0,
//     j = 0,
//     k = l;

//   while (i < array_1.length && j < array_2.length) {
//     if (!getState().isSorting) return;
//     dispatch({ type: "comparisonPlus", algoName: "merge" });
//     if (array_1[i] <= array_2[j]) {
//       arr[k] = array_1[i];
//       dispatch({ type: "swapPlus", payload: [k, i], algoName: "merge" });
//       i++;
//     } else {
//       arr[k] = array_2[j];
//       dispatch({ type: "swapPlus", payload: [k, j], algoName: "merge" });
//       j++;
//     }
//     k++;
//     dispatch({ type: "arrayMovements", payload: [...arr], algoName: "merge" });
//     speed = getState().speed;
//     await utils.randomDelay(1 / speed);
//   }

//   while (i < array_1.length) {
//     if (!getState().isSorting) return;
//     arr[k++] = array_1[i++];
//     dispatch({ type: "swapPlus", payload: [k - 1, i - 1], algoName: "merge" });
//     dispatch({ type: "arrayMovements", payload: [...arr], algoName: "merge" });
//     speed = getState().speed;
//     await utils.randomDelay(1 / speed);
//   }

//   while (j < array_2.length) {
//     if (!getState().isSorting) return;
//     arr[k++] = array_2[j++];
//     dispatch({ type: "swapPlus", payload: [k - 1, j - 1], algoName: "merge" });
//     dispatch({ type: "arrayMovements", payload: [...arr], algoName: "merge" });
//     speed = getState().speed;
//     await utils.randomDelay(1 / speed);
//   }
// }

// async function mergeSort(arr, left, right, getStateRef, dispatch) {
//   // dispatch({ type: "sortingStarted", algoName: "merge" });
//   const getState = () => getStateRef()?.current || getStateRef();
//   if (!getState().isSorting) return;
//   if (left >= right) return;

//   let mid = Math.floor((left + right) / 2);
//   await mergeSort(arr, left, mid, getStateRef, dispatch);
//   await mergeSort(arr, mid + 1, right, getStateRef, dispatch);
//   await merge(arr, left, mid, right, getStateRef, dispatch);
// }

// async function performMergeSort(
//   arr,
//   getStateRef,
//   dispatch,
//   controllerRef = null
// ) {
//   const getState = () => getStateRef()?.current || getStateRef();
//   dispatch({ type: "sortingStarted", algoName: "merge" });
//   try {
//     getState().isSorting &&
//       (await mergeSort(arr, 0, arr.length - 1, getStateRef, dispatch));
//   } finally {
//     dispatch({ type: "sortingCompleted", algoName: "merge" });
//     console.log(controllerRef);
//   }
// }

// export default performMergeSort;

import * as utils from "../utils/utils.js";

async function merge(arr, l, mid, r, getStateRef, dispatch) {
  const getState = () => getStateRef()?.current || getStateRef();
  let speed = 0;

  if (!getState().isSorting) return;

  dispatch({
    type: "selectedIndices",
    payload: Array.from({ length: r - l + 1 }, (_, i) => l + i),
    algoName: "merge",
  });

  dispatch({
    type: "setDescription",
    payload: `Merging subarrays [${l}...${mid}] and [${mid + 1}...${r}]`,
  });

  let array_1 = arr.slice(l, mid + 1);
  let array_2 = arr.slice(mid + 1, r + 1);

  let i = 0,
    j = 0,
    k = l;

  while (i < array_1.length && j < array_2.length) {
    if (!getState().isSorting) return;

    dispatch({ type: "comparisonPlus", algoName: "merge" });

    dispatch({
      type: "setDescription",
      payload: `Comparing ${array_1[i]} and ${array_2[j]}`,
    });

    if (array_1[i] <= array_2[j]) {
      arr[k] = array_1[i];
      dispatch({ type: "swapPlus", payload: [k, i], algoName: "merge" });
      i++;
    } else {
      arr[k] = array_2[j];
      dispatch({ type: "swapPlus", payload: [k, j], algoName: "merge" });
      j++;
    }

    k++;
    dispatch({ type: "arrayMovements", payload: [...arr], algoName: "merge" });
    speed = getState().speed;
    await utils.randomDelay(1 / speed);
  }

  while (i < array_1.length) {
    if (!getState().isSorting) return;
    arr[k++] = array_1[i++];
    dispatch({ type: "swapPlus", payload: [k - 1, i - 1], algoName: "merge" });
    dispatch({ type: "arrayMovements", payload: [...arr], algoName: "merge" });
    speed = getState().speed;
    await utils.randomDelay(1 / speed);
  }

  while (j < array_2.length) {
    if (!getState().isSorting) return;
    arr[k++] = array_2[j++];
    dispatch({ type: "swapPlus", payload: [k - 1, j - 1], algoName: "merge" });
    dispatch({ type: "arrayMovements", payload: [...arr], algoName: "merge" });
    speed = getState().speed;
    await utils.randomDelay(1 / speed);
  }
}

async function mergeSort(arr, left, right, getStateRef, dispatch) {
  const getState = () => getStateRef()?.current || getStateRef();
  if (!getState().isSorting) return;
  if (left >= right) return;

  let mid = Math.floor((left + right) / 2);

  dispatch({
    type: "setDescription",
    payload: `Dividing array at index ${mid}`,
  });

  await mergeSort(arr, left, mid, getStateRef, dispatch);
  await mergeSort(arr, mid + 1, right, getStateRef, dispatch);
  await merge(arr, left, mid, right, getStateRef, dispatch);
}

async function performMergeSort(
  arr,
  getStateRef,
  dispatch,
  controllerRef = null
) {
  const getState = () => getStateRef()?.current || getStateRef();

  dispatch({ type: "sortingStarted", algoName: "merge" });

  dispatch({
    type: "setDescription",
    payload: "Starting Merge Sort",
  });

  try {
    getState().isSorting &&
      (await mergeSort(arr, 0, arr.length - 1, getStateRef, dispatch));
  } finally {
    dispatch({
      type: "setDescription",
      payload: "Array is fully sorted!",
    });
    dispatch({ type: "sortingCompleted", algoName: "merge" });

    console.log(controllerRef);
  }
}

export default performMergeSort;
