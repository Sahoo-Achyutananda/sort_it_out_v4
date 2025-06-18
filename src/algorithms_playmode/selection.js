function selectionSortPlay(arr) {
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

    if (array[i].id !== array[min_index].id) {
      const fromVal = array[i].value;
      const toVal = array[min_index].value;

      [array[i], array[min_index]] = [array[min_index], array[i]];
      // console.log(() => [...array]);
      history.push({
        arrayState: [...array],
        hint: `Swapped arr[${i}] = ${fromVal} with arr[${min_index}] = ${toVal} to place the smallest element at position ${i}.`,
      });
    }
  }

  return history;
}

export default selectionSortPlay;
