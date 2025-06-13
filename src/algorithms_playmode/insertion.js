function insertionSort(arr) {
  const array = [...arr];
  const n = arr.length;

  let history = [];
  // let swaps = 0;
  // let comparisons = 0;

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    // Initial comparison
    // comparisons++;

    // While loop with comparisons and swaps
    while (j >= 0 && array[j] > key) {
      // comparisons++; // new comparison for while condition
  

      array[j + 1] = array[j]; // shift
      // swaps++;
      j--;
    }

    // Final insertion of key
    array[j + 1] = key;
    history.push({
      arrayState: [...array],
      hint: `Inserted key(${key}) at position ${j + 1}`,
    });
  }

  return history;
}

export default insertionSort;
