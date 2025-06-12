import SortingLayout from "../components/SortingLayout";
import algoInformation from "../Data/data";
import performQuickSort from "../algorithms/quick";

function QuickSort() {
    return (
        <SortingLayout algorithm={performQuickSort} json = {algoInformation.quickSort}/>
    );
}

export default QuickSort
