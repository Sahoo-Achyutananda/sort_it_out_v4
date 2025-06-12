import React from "react";
import { Box, Typography, IconButton, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100vw",
        maxWidth: "100%",
        backgroundColor: "#1a1a1a",
        color: "#ffffffcc",
        textAlign: "center",
        py: 2,
        mt: "auto",
      }}
    >
      <Typography variant="body2">
        Made with <span style={{ color: "#e25555" }}>💔</span> by Achyutananda
        Sahoo
      </Typography>

      <Box sx={{ mt: 1 }}>
        <IconButton
          component={Link}
          href="https://github.com/Sahoo-Achyutananda"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          sx={{ color: "#ffffffcc", mx: 1 }}
        >
          <GitHubIcon />
        </IconButton>

        <IconButton
          component={Link}
          href="https://www.linkedin.com/in/achyutananda-sahoo/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          sx={{ color: "#ffffffcc", mx: 1 }}
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
      <Box sx={{ mt: 1 }}>
        <script
          type="text/javascript"
          src="https://counter.websiteout.com/js/7/6/0/0"
        ></script>
      </Box>
    </Box>
  );
}
