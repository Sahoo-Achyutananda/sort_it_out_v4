import SortingLayout from "../components/SortingLayout";
import algoInformation from "../Data/data";
import selectionSort from "../algorithms/selection";
import selectionSortPlay from "../algorithms_playmode/selection";

export default function SelectionSort() {
  return (
    <SortingLayout
      algorithm={selectionSort}
      algorithmPlay={selectionSortPlay}
      json={algoInformation.selectionSort}
    />
  );
}
export function SelectionSortPlay() {
  return <></>;
}
// export default { SelectionSort, SelectionSortPlay };
