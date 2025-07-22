import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import DrawerList from "./TemporaryDrawer";
import { useLocation, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

import LaunchIcon from "@mui/icons-material/Launch";
import styles from "./Navbar.module.css";
import SelectNavigation from "../pages/homePage/SelectNavigation.jsx";
// import Button from "@mui/material/Button";

const titles = {
  "/": "",
  "/bubble": "Bubble Sort",
  "/selection": "Selection Sort",
  "/insertion": "Insertion Sort",
  "/merge": "Merge Sort",
  "/quick": "Quick Sort",
  "/racemode": "Race Mode",
  "/bubble/play": "Bubble Sort / Play Mode",
  "/selection/play": "Selection / Play Mode",
  "/insertion/play": "Insertion Sort / Play Mode",
  "/merge/play": "Merge Sort / Play Mode",
  "/quick/play": "Quick Sort / Play Mode",
};

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = titles[location.pathname] || " ";

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(82, 11, 148, 0.14)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)", // for Safari
          boxShadow: "none",
          borderBottom: "solid 1px rebeccapurple",
        }}
      >
        <Toolbar>
          <Button
            onClick={toggleDrawer(true)}
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </Button>
          <Drawer
            open={open}
            onClose={toggleDrawer(false)}
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: "rgba(82, 11, 148, 0.14)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)", // for Safari
                boxShadow: "none",
              },
            }}
          >
            <DrawerList toggleDrawer={toggleDrawer} />
          </Drawer>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: "18px" }}
          >
            {pageTitle}
          </Typography>
          <div className={styles.advBoard}>
            {location.pathname === "/racemode" ? (
              <Tooltip
                title="Check each algorithm Independently 🚀"
                followCursor
                interactive
                placement="bottom"
              >
                <div>
                  <SelectNavigation text={"Algorithm"} />
                </div>
              </Tooltip>
            ) : (
              <RaceModeAdv navigate={navigate} />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// function AlgoAdv() {
//   return <div>You're my something something -</div>;
// }

export function RaceModeAdv({ navigate }) {
  return (
    <div className={styles.raceModeAdv} onClick={() => navigate("/racemode")}>
      <p>
        🚀 Check which algorithm works faster on a given input. Visit Race Mode
      </p>
    </div>
  );
}
