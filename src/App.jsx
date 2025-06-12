import BubbleSort from "./pages/BubbleSort";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectionSort from "./pages/SelectionSort";
import InsertionSort from "./pages/InsertionSort";
import MergeSort from "./pages/MergeSort";
import QuickSort from "./pages/QuickSort";
import RaceMode from "./pages/raceMode/RaceMode";
import HomePage from "./pages/homePage/HomePage.jsx";
import RouteChangeWrapper from "./RouteChangeWrapper.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PlayMode from "./pages/playMode/PlayMode.jsx";
import { PlayModeProvider } from "./contexts/PlayModeContext.jsx";
import { ToastContainer, Bounce } from "react-toastify";

function App() {
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
            <Route path="/" element={<HomePage />} />
            <Route path="/bubble" element={<BubbleSort />} />
            <Route path="/selection" element={<SelectionSort />} />
            <Route path="/insertion" element={<InsertionSort />} />
            <Route path="/merge" element={<MergeSort />} />
            <Route path="/quick" element={<QuickSort />} />
            <Route path="/racemode" element={<RaceMode />} />
            <Route path="/playmode" element={<PlayMode />} />
          </Routes>
          <Footer></Footer>
        </PlayModeProvider>
      </RouteChangeWrapper>
    </BrowserRouter>
  );
}

export default App;
