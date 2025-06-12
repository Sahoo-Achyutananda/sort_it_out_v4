// import * as utils from "../utils/utils.js";

function bubbleSort(arr) {
  // dispatch({ type: "sortingStarted", algoName: "bubble" });
  let history = [];
  const array = [...arr];
  const len = array.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      const num1 = array[j];
      const num2 = array[j + 1];
      comparisons++;

      history = [
        ...history,
        {
          comparedIndices: [j, j + 1],
          arrayState: [...array],
          comparisons: comparisons,
          swaps: swaps,
          description: `Comparing arr[${j}](${num1}) and arr[${
            j + 1
          }](${num2})`,
        },
      ];

      if (num1 > num2) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps++;
        history = [
          ...history,
          {
            comparedIndices: [j, j + 1],
            arrayState: [...array],
            comparisons: comparisons,
            swaps: swaps,
            description: `Swapped arr[${j}](${num1}) and arr[${
              j + 1
            }](${num2})`,
          },
        ];
      }
    }
  }
  return history;
}

export default bubbleSort;
