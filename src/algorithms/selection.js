function selectionSort(arr) {
  const array = [...arr];
  const n = array.length;
  let history = [];
  let comparisons = 0,
    swaps = 0;

  for (let i = 0; i < n; i++) {
    let min_index = i;

    for (let j = i + 1; j < n; j++) {
      comparisons++;

      history.push({
        arrayState: [...array],
        comparisons,
        swaps,
        comparedIndices: [j],
        highlightValues: { values: [min_index], text: "Current Minimum" },
        description: `Comparing arr[${min_index}] = ${array[min_index]} and arr[${j}] = ${array[j]}.`,
      });

      if (array[min_index] > array[j]) {
        min_index = j;

        history.push({
          arrayState: [...array],
          comparisons,
          swaps,
          comparedIndices: [j],
          highlightValues: { values: [min_index], text: "Current Minimum" },
          description: `Updated minimum: arr[${min_index}] = ${array[min_index]} is now the smallest in the unsorted subarray.`,
        });
      }
    }

    if (min_index !== i) {
      [array[i], array[min_index]] = [array[min_index], array[i]];
      swaps++;

      history.push({
        arrayState: [...array],
        comparisons,
        swaps,
        comparedIndices: [i, min_index],
        // highlightValues: [i, min_index],
        description: `Swapped arr[${i}] = ${array[min_index]} with arr[${min_index}] = ${array[i]} to place the smallest element at position ${i}.`,
      });
    }
  }

  return history;
}

export default selectionSort;
