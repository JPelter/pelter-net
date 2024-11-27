import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Stack, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

export default function MakePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to control visibility of the form

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/make-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit post");
      }

      // Clear form and show success message
      setTitle("");
      setContent("");
      setSuccess(true);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      {/* Toggle button to collapse/open the form */}

      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Typography variant="h6" gutterBottom>
          Make Post
        </Typography>
        <IconButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Stack>

      {/* Conditionally render the form based on `isOpen` state */}
      {isOpen && (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Link"
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Submitting..." : "Submit Post"}
            </Button>
          </Stack>
        </form>
      )}

      {/* Error and success messages */}
      {error && <Typography color="error" variant="body2">{error}</Typography>}
      {success && <Typography color="primary" variant="body2">Post submitted successfully!</Typography>}
    </Paper>
  );
}
