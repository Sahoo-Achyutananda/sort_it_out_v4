import insertionSort from "../algorithms/insertion.js";
import algoInformation from "../Data/data";
import SortingLayout from "../components/SortingLayout.jsx";
import insertionSortPlay from "../algorithms_playmode/insertion.js";

export default function InsertionSort() {
  return (
    <SortingLayout
      algorithm={insertionSort}
      algorithmPlay={insertionSortPlay}
      json={algoInformation.insertionSort}
    />
  );
}

export function InsertionSortPlay() {
  return <></>;
}
