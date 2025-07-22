import React from "react";
import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";
import SelectNavigation from "../pages/homePage/SelectNavigation";
import { RaceModeAdv } from "./Navbar";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-subtitle">Page Not Found</p>
      <p className="not-found-description">
        Sorry, the page you are looking for doesn't exist yet.
      </p>
      <SelectNavigation text="Select Algorithm to Visualize" />
      <RaceModeAdv navigate={navigate} />
      <button className="not-found-button" onClick={() => navigate(-1)}>
        ⬅ Go Back
      </button>
    </div>
  );
}
