import React, { useEffect, useState } from "react";
import { Paper, Typography, Link, Stack, Box } from "@mui/material";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/get-posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data); // Assuming the response is a list of posts
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Typography variant="body1">Loading posts...</Typography>;
  }

  if (error) {
    return <Typography variant="body1" color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ maxHeight: "70vh", overflowY: "auto", marginTop: 2 }}>
      <Stack spacing={2}>
        {posts.map((post, index) => (
          <Paper key={index} sx={{ padding: 2 }}>
            <Box>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                by {post.username} at {post.date_created}
              </Typography>
              <Link href={post.content} target="_blank" rel="noopener" sx={{ textDecoration: "none", display: "block", mt: 1 }}>
                <Typography variant="body2" color="primary">
                  {post.content}
                </Typography>
              </Link>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
