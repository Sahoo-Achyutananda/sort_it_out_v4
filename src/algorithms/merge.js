function merge(arr, l, mid, r, history, stats) {
  const array_1 = arr.slice(l, mid + 1);
  const array_2 = arr.slice(mid + 1, r + 1);

  let i = 0,
    j = 0,
    k = l;

  history.push({
    arrayState: [...arr],
    swaps: stats.swaps,
    comparisons: stats.comparisons,
    highlightIndices: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
    description: `Merging subarrays from index ${l} to ${mid} and ${
      mid + 1
    } to ${r}`,
  });

  while (i < array_1.length && j < array_2.length) {
    const compLeft = array_1[i];
    const compRight = array_2[j];
    const leftIndex = l + i;
    const rightIndex = mid + 1 + j;

    stats.comparisons++;
    history.push({
      arrayState: [...arr],
      swaps: stats.swaps,
      comparisons: stats.comparisons,
      comparedIndices: [leftIndex, rightIndex],
      highlightIndices: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
      description: `Comparing ${compLeft} (index ${leftIndex}) and ${compRight} (index ${rightIndex})`,
    });

    if (compLeft <= compRight) {
      arr[k] = compLeft;
      stats.swaps++;
      history.push({
        arrayState: [...arr],
        swaps: stats.swaps,
        comparisons: stats.comparisons,
        swappedIndices: [k],
        highlightIndices: Array.from(
          { length: r - l + 1 },
          (_, idx) => l + idx
        ),
        description: `Placed ${compLeft} at index ${k} from left subarray (index ${leftIndex})`,
      });
      i++;
    } else {
      arr[k] = compRight;
      stats.swaps++;
      history.push({
        arrayState: [...arr],
        swaps: stats.swaps,
        comparisons: stats.comparisons,
        swappedIndices: [k],
        highlightIndices: Array.from(
          { length: r - l + 1 },
          (_, idx) => l + idx
        ),
        description: `Placed ${compRight} at index ${k} from right subarray (index ${rightIndex})`,
      });
      j++;
    }
    k++;
  }

  while (i < array_1.length) {
    arr[k] = array_1[i];
    const sourceIndex = l + i;
    stats.swaps++;
    history.push({
      arrayState: [...arr],
      swaps: stats.swaps,
      comparisons: stats.comparisons,
      swappedIndices: [k],
      highlightIndices: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
      description: `Inserting remaining ${array_1[i]} at index ${k} from left subarray (index ${sourceIndex})`,
    });
    i++;
    k++;
  }

  while (j < array_2.length) {
    arr[k] = array_2[j];
    const sourceIndex = mid + 1 + j;
    stats.swaps++;
    history.push({
      arrayState: [...arr],
      swaps: stats.swaps,
      comparisons: stats.comparisons,
      swappedIndices: [k],
      highlightIndices: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
      description: `Inserting remaining ${array_2[j]} at index ${k} from right subarray (index ${sourceIndex})`,
    });
    j++;
    k++;
  }
}

function mergeSort(arr, left, right, history, stats) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  mergeSort(arr, left, mid, history, stats);
  mergeSort(arr, mid + 1, right, history, stats);
  merge(arr, left, mid, right, history, stats);
}

function performMergeSort(arr) {
  const array = [...arr];
  const history = [];
  const stats = { swaps: 0, comparisons: 0 };

  mergeSort(array, 0, array.length - 1, history, stats);

  return history;
}

export default performMergeSort;
