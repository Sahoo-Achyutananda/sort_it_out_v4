import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./Loader";

function RouteChangeWrapper({ children }) {
  const location = useLocation();
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const path = location.pathname;

    const titleMap = {
      "/": "Home | SORT IT OUT ",
      "/bubble": "Bubble Sort | SORT IT OUT ",
      "/selection": "Selection Sort | SORT IT OUT ",
      "/insertion": "Insertion Sort | SORT IT OUT ",
      "/merge": "Merge Sort | SORT IT OUT ",
      "/quick": "Quick Sort | SORT IT OUT ",
      "/racemode": "Race Mode | SORT IT OUT ",
      "/bubble/play": "Bubble Sort | Play Mode | SORT IT OUT ",
      "/selection/play": "Selection Sort | Play Mode | SORT IT OUT ",
      "/insertion/play": "Insertion Sort | Play Mode | SORT IT OUT ",
      "/merge/play": "Merge Sort | Play Mode | SORT IT OUT ",
      "/quick/play": "Quick Sort | Play Mode | SORT IT OUT ",
      "/racemode/play": "Race Mode | Play Mode | SORT IT OUT ",
    };

    document.title = titleMap[path] || "SORT IT OUT ";
  }, [location]);

  // useEffect(() => {
  //   setLoading(true);

  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [location.pathname]);

  return (
    <div>
      {/* {loading && <Loader />} */}
      {children}
    </div>
  );
}

export default RouteChangeWrapper;
