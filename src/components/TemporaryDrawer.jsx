import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

import algoInformation from "../Data/data.js";
import { useNavigate, useLocation } from "react-router-dom";

export default function DrawerList({ toggleDrawer }) {
  // const algos = Object.entries(algoInformation);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedStyle = {
    "&.Mui-selected": {
      backgroundColor: "rgba(137, 43, 226, 0.2)",
    },
  };

  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: "rgba(82, 11, 148, 0.14)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", // for Safari
        boxShadow: "none",
        color: "white",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem key={"home"} disablePadding onClick={() => navigate("/")}>
          <ListItemButton
            selected={location.pathname === "/"}
            sx={selectedStyle}
          >
            <ListItemIcon>
              <HomeIcon fontSize="medium" sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"HOME"}></ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {Object.keys(algoInformation).map((algo) => (
          <ListItem
            key={algo}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(137, 43, 226, 0.2)",
                color: "white",
              },
            }}
            disablePadding
            onClick={() => navigate(algoInformation[algo]["link"])}
          >
            <ListItemButton
              selected={location.pathname === algoInformation[algo]["link"]}
              sx={selectedStyle}
            >
              <ListItemIcon sx={{ color: "white" }}>
                {React.createElement(algoInformation[algo]["mui_icon"])}
              </ListItemIcon>
              <ListItemText primary={algoInformation[algo]["name"]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem
          key={"race_mode"}
          disablePadding
          onClick={() => navigate("/racemode")}
        >
          <ListItemButton
            selected={location.pathname === "/racemode"}
            sx={selectedStyle}
          >
            <ListItemIcon>
              <RocketLaunchIcon fontSize="medium" sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"RACE MODE"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
