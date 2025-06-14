function selectionSort(arr) {
  const array = [...arr];
  const n = array.length;
  let history = [];
  // let comparisons = 0,
  //   swaps = 0;

  for (let i = 0; i < n; i++) {
    let min_index = i;

    for (let j = i + 1; j < n; j++) {
      // comparisons++;

      if (array[min_index].value > array[j].value) {
        min_index = j;
      }
    }

    if (min_index !== i) {
      [array[i], array[min_index]] = [array[min_index], array[i]];

      history.push({
        arrayState: [...array],
        hint: `Swapped arr[${i}] = ${array[min_index]} with arr[${min_index}] = ${array[i]} to place the smallest element at position ${i}.`,
      });
    }
  }

  return history;
}

export default selectionSort;
