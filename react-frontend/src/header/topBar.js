import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import UserOptions from "./userOptions.js";

function TopBar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Main Title */}
        <Typography 
          variant="h6" 
          sx={{ fontStyle: "italic", flexGrow: 1, textDecoration: "none", color: "black" }}
          component={Link} to="/"
        >
          pelter.net
        </Typography>
        {/* Far-right Section */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <UserOptions/>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
