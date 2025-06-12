function partition(arr, l, r, history, stats) {
  const pivot = arr[r];
  let i = l - 1;

  for (let j = l; j < r; j++) {
    stats.comparisons++;

    history.push({
      arrayState: [...arr],
      comparisons: stats.comparisons,
      swaps: stats.swaps,
      comparedIndices: [j],
      highlightValues: { values: [r], text: "Pivot" },
      highlightIndices: Array.from(
        { length: r - l + 1 },
        (_, index) => l + index
      ),
      description: `Comparing pivot arr[${r}] = ${pivot} with arr[${j}] = ${arr[j]}`,
    });

    if (arr[j] <= pivot) {
      i++;

      if (i !== j) {
        stats.swaps++;
        [arr[i], arr[j]] = [arr[j], arr[i]];

        history.push({
          arrayState: [...arr],
          comparisons: stats.comparisons,
          swaps: stats.swaps,
          swappedIndices: [i, j],
          highlightValues: { values: [r], text: "Pivot" },
          highlightIndices: Array.from(
            { length: r - l + 1 },
            (_, index) => l + index
          ),
          description: `Swapped arr[${i}] = ${arr[i]} and arr[${j}] = ${arr[j]} to move smaller element before the pivot.`,
        });
      }
    }
  }

  if (i + 1 !== r) {
    stats.swaps++;
    [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];

    history.push({
      arrayState: [...arr],
      comparisons: stats.comparisons,
      swaps: stats.swaps,
      swappedIndices: [i + 1, r],
      highlightIndices: Array.from(
        { length: r - l + 1 },
        (_, index) => l + index
      ),
      description: `Placed the pivot arr[${r}] = ${pivot} at its correct position by swapping with arr[${
        i + 1
      }] = ${arr[i + 1]}.`,
    });
  }

  return i + 1;
}

function quickSort(arr, low, high, history, stats) {
  if (low < high) {
    let pi = partition(arr, low, high, history, stats);

    quickSort(arr, low, pi - 1, history, stats);
    quickSort(arr, pi + 1, high, history, stats);
  }
}
function performQuickSort(arr) {
  const history = [];
  const stats = { comparisons: 0, swaps: 0 };
  const array = [...arr];

  quickSort(array, 0, arr.length - 1, history, stats);

  return history;
}

export default performQuickSort;
