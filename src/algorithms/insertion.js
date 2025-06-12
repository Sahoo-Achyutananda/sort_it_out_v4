function insertionSort(arr) {
  const array = [...arr];
  const n = arr.length;

  let history = [];
  let swaps = 0;
  let comparisons = 0;

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    // Initial comparison
    comparisons++;
    history.push({
      comparedIndices: [j, i],
      arrayState: [...array],
      comparisons,
      swaps,
      description: `Comparing arr[${j}](${array[j]}) and arr[${i}](${key})`,
    });

    // While loop with comparisons and swaps
    while (j >= 0 && array[j] > key) {
      comparisons++; // new comparison for while condition
      history.push({
        comparedIndices: [j, j + 1],
        arrayState: [...array],
        comparisons,
        swaps,
        description: `Comparing arr[${j}](${array[j]}) and key(${key})`,
      });

      array[j + 1] = array[j]; // shift
      swaps++;
      history.push({
        comparedIndices: [j, j + 1],
        arrayState: [...array],
        comparisons,
        swaps,
        description: `Swapped arr[${j}](${array[j]}) and arr[${j + 1}](${
          array[j + 1]
        })`,
      });

      j--;
    }

    // Final insertion of key
    array[j + 1] = key;
    history.push({
      comparedIndices: [j + 1],
      arrayState: [...array],
      comparisons,
      swaps,
      description: `Inserted key(${key}) at position ${j + 1}`,
    });
  }

  return history;
}

export default insertionSort;
