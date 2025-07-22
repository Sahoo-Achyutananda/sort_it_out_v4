import TypedText from "./TypedText";
import styles from "./HomePage.module.css";
import SelectNavigation from "./SelectNavigation";
import ProjectDescription from "./ProjectDescription.jsx";
import BackgroundVideo from "./BackgroundVideo.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
// import CircleIcon from "@mui/icons-material/Circle";
import Feedback from "./Feedback.jsx";
import supabase from "../../utils/supabase.js";
import StarsIcon from "@mui/icons-material/Stars";
import EastIcon from "@mui/icons-material/East";

function HomePage() {
  // const navigate = useNavigate();
  const [currentRating, setCurrentRating] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const feedbackRef = useRef(null);

  function navigateToFeedbackSection() {
    if (feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  async function fetchRatings() {
    const response = await supabase.from("feedback").select("overall_rating");
    const ratingLength = response.data.length;
    const ratingSum = response.data.reduce((curr, obj) => {
      return obj.overall_rating + curr;
    }, 0);
    setCurrentRating((ratingSum / ratingLength).toFixed(1));
    setTotalRating(ratingLength);
  }

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <div className={styles.body}>
      <BackgroundVideo>
        <div className={styles.HeroSection}>
          <div className={styles.titleCard}>
            <div className={styles.element}>
              <TypedText>{["Analyze", "Visualize", "Play"]}</TypedText>
            </div>
            <div className={styles.title}>
              <h1>SORT IT OUT</h1>
            </div>
            <SelectNavigation text={"Algorithm"} />
            <div className={styles.subtitleButton}>Explore Race Mode</div>
          </div>
          <div className={styles.RatingDiv}>
            <div className={styles.Rating}>
              <div className={styles.avgRating}>
                <StarsIcon fontSize="large" style={{ color: "darkviolet" }} />
                {currentRating}
              </div>
              <div className={styles.totalRating}>({totalRating})</div>
            </div>
            <div className={styles.RatingLink}>
              <a onClick={() => navigateToFeedbackSection()}>Give a rating</a>
              <EastIcon fontSize="small" />
            </div>
          </div>
        </div>
      </BackgroundVideo>

      <div className={styles.raceModeSection}>
        <RaceMode />
      </div>
      <ProjectDescription />
      <div className={styles.Divider}></div>
      <Feedback scrollRef={feedbackRef} fetchRatings={fetchRatings} />
    </div>
  );
}

function RaceMode() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.raceMode}>
        <div className={styles.raceModeText}>
          <h3>
            <TypedText>{["Check Out RACE MODE"]}</TypedText>
            {/* Check Out RACE MODE */}
          </h3>
          <p>
            Ever wondered which sorting algorithm is the fastest? Let them
            compete! In Race Mode, algorithms like Bubble Sort, Merge Sort, and
            Quick Sort go head-to-head on your screen. 🎯 Perfect for visual
            learners and curious coders. Tap in, press start, and learn through
            the thrill of competition.
          </p>
          <button
            className={styles.raceModeButton}
            onClick={() => navigate("/racemode")}
          >
            Visit Race-Mode 🏃
          </button>
        </div>
        <div className={styles.raceModeVideo}>
          <video autoPlay loop muted playsInline className={styles.video}>
            <source src="/RACE_MODE.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}

export default HomePage;
