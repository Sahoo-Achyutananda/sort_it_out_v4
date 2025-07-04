import performMergeSort from "../algorithms/merge.js";
import algoInformation from "../Data/data";
import SortingLayout from "../components/SortingLayout.jsx";

export default function MergeSort() {
  return (
    <SortingLayout
      algorithm={performMergeSort}
      json={algoInformation.mergeSort}
    />
  );
}

export function MergeSortPlay() {
  return <></>;
}
