import BubbleSort from "./pages/BubbleSort.jsx";
import BubbleSortPlay from "./pages/BubbleSort.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectionSort, { SelectionSortPlay } from "./pages/SelectionSort";
import InsertionSort, { InsertionSortPlay } from "./pages/InsertionSort";
import MergeSort, { MergeSortPlay } from "./pages/MergeSort";
import QuickSort, { QuickSortPlay } from "./pages/QuickSort";
import RaceMode from "./pages/raceMode/RaceMode";
import HomePage from "./pages/homePage/HomePage.jsx";
import RouteChangeWrapper from "./RouteChangeWrapper.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { PlayModeProvider } from "./contexts/PlayModeContext.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import PageNotFound from "./components/PageNotFount.jsx";

function App() {
  // useEffect(() => {
  //   const speedDiv = document.querySelector("#speedDiv");
  //   const valueDiv = document.querySelector("#valueDiv");
  //   const utilitiesDiv = document.querySelector("#utilitiesDiv");

  //   if (speedDiv && valueDiv && utilitiesDiv) {
  //     setRun(true);
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <RouteChangeWrapper>
        <PlayModeProvider>
          <Navbar></Navbar>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/bubble" element={<BubbleSort />}>
              <Route index element={null} />{" "}
              <Route path="play" element={<BubbleSortPlay />} />
            </Route>
            <Route path="/selection" element={<SelectionSort />}>
              <Route index element={null} />{" "}
              <Route path="play" element={<SelectionSortPlay />} />
            </Route>
            <Route path="/insertion" element={<InsertionSort />}>
              <Route index element={null} />{" "}
              <Route path="play" element={<InsertionSortPlay />} />
            </Route>
            <Route path="/merge" element={<MergeSort />}>
              <Route index element={null} />{" "}
              {/* <Route path="play" element={<MergeSortPlay />} /> */}
            </Route>
            <Route path="/quick" element={<QuickSort />}>
              <Route index element={null} />{" "}
              {/* <Route path="play" element={<QuickSortPlay />} /> */}
            </Route>
            <Route path="/racemode" element={<RaceMode />} />
          </Routes>
          <Footer></Footer>
        </PlayModeProvider>
      </RouteChangeWrapper>
    </BrowserRouter>
  );
}

export default App;
