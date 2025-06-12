import bubbleSort from "../algorithms/bubble";
import algoInformation from "../Data/data";
import SortingLayout from "../components/SortingLayout";

function BubbleSort() {
  return (
    <SortingLayout algorithm={bubbleSort} json={algoInformation.bubbleSort} />
  );
}

export default BubbleSort;
