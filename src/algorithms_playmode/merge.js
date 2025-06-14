function merge(arr, l, mid, r, history) {
  const array_1 = arr.slice(l, mid + 1);
  const array_2 = arr.slice(mid + 1, r + 1);

  let i = 0,
    j = 0,
    k = l;

  while (i < array_1.length && j < array_2.length) {
    const compLeft = array_1[i];
    const compRight = array_2[j];
    const leftIndex = l + i;
    const rightIndex = mid + 1 + j;

    if (compLeft.value <= compRight.value) {
      if (arr[k] !== compLeft) {
        arr[k] = compLeft;
        history.push({
          arrayState: [...arr],
          hint: `Place ${compLeft.value} at index ${k} from left subarray (index ${leftIndex})`,
        });
      }
      i++;
    } else {
      if (arr[k] !== compRight) {
        arr[k] = compRight;
        history.push({
          arrayState: [...arr],
          hint: `Place ${compRight.value} at index ${k} from right subarray (index ${rightIndex})`,
        });
      }
      j++;
    }
    k++;
  }

  while (i < array_1.length) {
    if (arr[k] !== array_1[i]) {
      arr[k] = array_1[i];
      const sourceIndex = l + i;
      history.push({
        arrayState: [...arr],
        hint: `Insert remaining ${array_1[i].value} at index ${k} from left subarray (index ${sourceIndex})`,
      });
    }
    i++;
    k++;
  }

  while (j < array_2.length) {
    if (arr[k] !== array_2[j]) {
      arr[k] = array_2[j];
      const sourceIndex = mid + 1 + j;
      history.push({
        arrayState: [...arr],
        hint: `Insert remaining ${array_2[j].value} at index ${k} from right subarray (index ${sourceIndex})`,
      });
    }
    j++;
    k++;
  }
}

function mergeSort(arr, left, right, history) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  mergeSort(arr, left, mid, history);
  mergeSort(arr, mid + 1, right, history);
  merge(arr, left, mid, right, history);
}

function performMergeSort(arr) {
  const array = [...arr];
  const history = [];
  // const stats = { swaps: 0, comparisons: 0 };

  mergeSort(array, 0, array.length - 1, history);

  return history;
}

export default performMergeSort;
