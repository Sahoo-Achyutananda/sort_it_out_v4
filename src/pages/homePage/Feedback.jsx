import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Feedback.module.css";
import supabase from "../../utils/supabase";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useLocation } from "react-router-dom";

function Feedback({ scrollRef = null, fetchRatings }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [response, setResponse] = useState("");
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    comments: "",
    rating: 0,
    source: location.pathname,
  });

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (formData.rating === 0) {
      toast.error("Please provide your Valuable Rating", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    setIsSubmitting(true);
    const response = await supabase.from("feedback").insert({
      name: formData.name,
      overall_rating: formData.rating,
      comments: formData.comments,
      source: formData.source,
    });

    if (response.status === 201) {
      setFormData({
        name: "",
        rating: 0,
        comments: "",
      });
    }
    setResponse(response.status);
    setIsSubmitting(false);
    setDataSubmitted(true);
    fetchRatings();
  }
  return (
    <>
      <div className={styles.FormTitle} ref={scrollRef}>
        <h2>Give Your Feedback</h2>
        <p>
          Provide your valuable feedback so that i can improve my future
          projects.
        </p>
      </div>
      <div className={styles.FormDiv}>
        {!dataSubmitted ? (
          <form className={styles.Form} onSubmit={(e) => handleFormSubmit(e)}>
            <input
              type="text"
              name="name"
              value={formData.name}
              className={styles.NameField}
              onChange={(e) => handleFormData(e)}
              placeholder="Your Name (optional)"
            />
            <input
              type="text"
              name="source"
              value={location.pathname}
              style={{ display: "none" }}
            />
            <textarea
              rows={10}
              cols={50}
              name="comments"
              value={formData.comments}
              className={styles.CommentsField}
              onChange={(e) => handleFormData(e)}
              placeholder="Your Comments (optional)"
            />
            <Rating length={10} formData={formData} setFormData={setFormData} />
            <button type="submit" className={styles.SubmitBtn}>
              {!isSubmitting ? "SUBMIT" : "...."}
            </button>
            <ToastContainer />
          </form>
        ) : (
          <div className={styles.SubmitResponse}>
            {response === 201
              ? "Thank You for submitting your Feedback 💖"
              : "There's some Error in Form Submission"}
          </div>
        )}
        <div
          style={!dataSubmitted ? { display: "none" } : { display: "block" }}
        >
          <button
            type="submit"
            className={styles.SubmitBtn}
            onClick={() => setDataSubmitted(false)}
          >
            {response === 201 ? "SUBMIT ANOTHER FEEDBACK" : "TRY AGAIN"}
          </button>
        </div>
      </div>
    </>
  );
}

function Rating({ length, formData, setFormData }) {
  const [hoverCount, setHoverCount] = useState(0);

  function handleRegisteredCount(val) {
    setFormData({ ...formData, rating: Number(val) });
  }

  return (
    <div className={styles.RatingComponent}>
      <p>Rating</p>

      <div className={styles.RatingField}>
        {Array.from({ length: length }, (_, index) => {
          return (
            <RatingBox
              index={index}
              key={index}
              hoverCount={hoverCount}
              registeredCount={formData.rating}
              setHoverCount={setHoverCount}
              handleRegisteredCount={handleRegisteredCount}
            />
          );
        })}
        <div
          className={styles.RemoveRating}
          onClick={() => handleRegisteredCount(0)}
        >
          <CloseIcon fontSize="medium" />
        </div>
      </div>
    </div>
  );
}

function RatingBox({
  index,
  hoverCount,
  registeredCount,
  setHoverCount,
  handleRegisteredCount,
}) {
  const priority = hoverCount || registeredCount;
  const ratingBoxClasses = [
    styles.RatingBox,
    index + 1 <= priority ? styles.RatingBoxActive : "",
  ].join(" ");

  function handleMouseEnter(val) {
    setHoverCount(Number(val));
  }
  function handleMouseLeave() {
    setHoverCount(0);
  }

  function handleClick(val) {
    handleRegisteredCount(Number(val));
  }

  return (
    <div
      value={index + 1}
      index={index}
      onMouseLeave={(e) => handleMouseLeave(e.target.getAttribute("value"))}
      onMouseEnter={(e) => handleMouseEnter(e.target.getAttribute("value"))}
      onClick={(e) => handleClick(e.target.getAttribute("value"))}
      className={ratingBoxClasses}
    >
      {index + 1}
    </div>
  );
}

export default Feedback;
