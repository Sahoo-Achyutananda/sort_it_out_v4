import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./Loader";

function RouteChangeWrapper({ children }) {
  const location = useLocation();
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const path = location.pathname;

    const titleMap = {
      "/": "Home | Sort It Out - v3 ",
      "/bubble": "Bubble Sort | Sort It Out - v3 ",
      "/selection": "Selection Sort | Sort It Out - v3 ",
      "/insertion": "Insertion Sort | Sort It Out - v3 ",
      "/merge": "Merge Sort | Sort It Out - v3 ",
      "/quick": "Quick Sort | Sort It Out - v3 ",
      "/racemode": "Race Mode | Sort It Out - v3 ",
    };

    document.title = titleMap[path] || "Sort It Out ";
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
