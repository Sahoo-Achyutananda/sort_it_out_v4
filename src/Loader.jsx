import { Grid } from "ldrs/react";
import "ldrs/react/Grid.css";

// Default values shown

function Loader() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid size="120" speed="2" color="white" />
    </div>
  );
}

export default Loader;
