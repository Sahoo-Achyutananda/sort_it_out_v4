function bubbleSort(arr) {
  let history = [];
  const array = [...arr];
  const len = array.length;
  // let comparisons = 0;
  // let swaps = 0;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      const num1 = array[j].value;
      const num2 = array[j + 1].value;
      // comparisons++;

      if (num1 > num2) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        // swaps++;
        history = [
          ...history,
          {
            arrayState: [...array],
            hint: `Swap arr[${j}](${num1}) and arr[${j + 1}](${num2})`,
          },
        ];
      }
    }
  }
  return history;
}

export default bubbleSort;
