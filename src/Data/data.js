// import { RocketLaunchIcon } from "@mui/icons-material";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import SortIcon from "@mui/icons-material/Sort";
import FrontHandIcon from "@mui/icons-material/FrontHand";
import MergeIcon from "@mui/icons-material/Merge";
import RocketIcon from "@mui/icons-material/Rocket";

const algoInformation = {
  bubbleSort: {
    mui_icon: BubbleChartIcon,
    image: "/bubble-sort.png",
    link: "/bubble",
    name: "Bubble Sort",
    short_name: "BS",
    interesting_facts: [
      "One of the first sorting algorithms taught in computer science.",
      "Rarely used in practice due to poor performance.",
      "Named for how larger elements 'bubble' to the top.",
    ],
    time_complexity: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)" },
    space_complexity: "O(1)",
    description:
      "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. The largest elements 'bubble up' to the end with each pass.",
    code: `
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}
    `.trim(),
  },
  insertionSort: {
    mui_icon: SortIcon,
    image: "/insertion-sort.PNG",
    link: "/insertion",
    name: "Insertion Sort",
    short_name: "IS",
    interesting_facts: [
      "Invented by John Mauchly in 1946.",
      "Efficient for small datasets or nearly sorted arrays.",
      "Works similarly to sorting playing cards in your hands.",
    ],
    time_complexity: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)" },
    space_complexity: "O(1)",
    description:
      "Insertion Sort builds the final sorted array one item at a time. It removes one element from the input data, finds the location it belongs to in the sorted list, and inserts it there.",
    code: `
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
    `.trim(),
  },
  selectionSort: {
    mui_icon: FrontHandIcon,
    image: "/selection-sort.png",
    link: "/selection",
    name: "Selection Sort",
    short_name: "SS",
    interesting_facts: [
      "One of the simplest comparison-based sorting algorithms.",
      "Was used in early computing machines due to ease of implementation.",
      "Does not require additional memory for swapping.",
    ],
    time_complexity: { best: "O(n^2)", average: "O(n^2)", worst: "O(n^2)" },
    space_complexity: "O(1)",
    description:
      "Selection Sort repeatedly finds the minimum element from the unsorted portion and moves it to the beginning. It divides the array into sorted and unsorted subarrays.",
    code: `
function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}
    `.trim(),
  },
  mergeSort: {
    mui_icon: MergeIcon,
    image: "/merge-sort.png",
    link: "/merge",
    name: "Merge Sort",
    short_name: "MS",
    interesting_facts: [
      "Invented by John von Neumann in 1945.",
      "A classic example of the divide-and-conquer approach.",
      "Very efficient for large data sets and stable sorting.",
    ],
    time_complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    space_complexity: "O(n)",
    description:
      "Merge Sort recursively divides the array into halves, sorts them, and then merges the sorted halves. It is stable and ensures consistent performance regardless of input order.",
    code: `
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [], i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}
    `.trim(),
  },
  quickSort: {
    mui_icon: RocketIcon,
    image: "/quick-sort.jpg",
    link: "/quick",
    name: "Quick Sort",
    short_name: "QS",
    interesting_facts: [
      "Developed by Tony Hoare in 1959.",
      "Often the fastest sorting algorithm in practice.",
      "Divides and conquers using a pivot element to partition the array.",
    ],
    time_complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n^2)",
    },
    space_complexity: "O(log n)",
    description:
      "Quick Sort selects a pivot and partitions the array such that elements less than the pivot go to the left, and greater ones go to the right. It recursively sorts the partitions.",
    code: `
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
    `.trim(),
  },
};

export default algoInformation;

// const colors = [
//   #FF79C6,
//   #282A36
// #387D51 #A27FD5 #56638D #282A36
//
// ]
