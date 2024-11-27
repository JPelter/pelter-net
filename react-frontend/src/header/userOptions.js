import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

function UserOptions() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/check-login", {
          method: "GET",
          credentials: "include", // Send cookies with the request
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username); // Set the username if logged in
        } else {
          setUsername(null); // Not logged in
        }
      } catch (err) {
        console.error("Error checking login status:", err);
        setError("Unable to check login status");
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      // Call your backend API to logout and clear session
      await fetch("/api/logout-user", {
        method: "POST",
        credentials: "include", // Ensure cookies are included
      });
      setUsername(null); // Clear username
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <Typography variant="body2">Loading...</Typography>;
  if (error) return <Typography variant="body2" color="error">{error}</Typography>;

  return (
    <div>
      {username ? (
        <Stack direction="row" spacing={2}>
          <Typography>
            Welcome!
          </Typography>
          <Typography onClick={handleLogout} sx={{color: "black"}}>Logout</Typography>
        </Stack>
      ) : (
        <Stack direction="row" spacing={2}>
          <Typography component={Link} to="/login" variant="outlined" sx={{ textDecoration: "none", color: "black" }}>
            Login
          </Typography>
          <Typography component={Link} to="/register" variant="outlined" sx={{ textDecoration: "none", color: "black" }}>
            Register
          </Typography>
        </Stack>
      )}
    </div>
  );
}

export default UserOptions;
