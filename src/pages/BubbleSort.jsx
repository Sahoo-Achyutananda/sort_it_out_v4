import bubbleSort from "../algorithms/bubble";
// import bubbleSortPlay from "../algorithms_playmode/bubble";
import algoInformation from "../Data/data";
import SortingLayout from "../components/SortingLayout";

export default function BubbleSort() {
  return (
    <SortingLayout algorithm={bubbleSort} json={algoInformation.bubbleSort} />
  );
}

export function BubbleSortPlay() {
  return <></>;
}
