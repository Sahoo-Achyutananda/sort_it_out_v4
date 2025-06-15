function bubbleSortPlay(arr) {
  let history = [];
  const array = [...arr];
  const len = array.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      const num1 = array[j].value;
      const num2 = array[j + 1].value;

      if (num1 > num2) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
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

export default bubbleSortPlay;
