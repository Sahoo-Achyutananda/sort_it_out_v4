import SortingLayout from "../components/SortingLayout";
import algoInformation from "../Data/data";
import selectionSort from "../algorithms/selection";

function SelectionSort() {
  return <SortingLayout algorithm={selectionSort} json = {algoInformation.selectionSort}/>;
}

export default SelectionSort;
