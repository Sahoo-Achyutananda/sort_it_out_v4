function insertionSortPlay(arr) {
  const array = [...arr];
  const n = arr.length;

  let history = [];

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j].value > key.value) {
      array[j + 1] = array[j];
      j--;
    }

    if (array[j + 1].id !== key.id) {
      array[j + 1] = key;
      history = [
        ...history,
        {
          arrayState: [...array],
          hint: `Insert key(${key.value}) at position ${j + 1}`,
        },
      ];
    }
  }

  return history;
}

export default insertionSortPlay;
