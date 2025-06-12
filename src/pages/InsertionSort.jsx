import insertionSort from "../algorithms/insertion.js";
import algoInformation from "../Data/data";
import SortingLayout from "../components/SortingLayout.jsx";

function InsertionSort() {
  return <SortingLayout algorithm={insertionSort} json = {algoInformation.insertionSort} />;
}

export default InsertionSort;
