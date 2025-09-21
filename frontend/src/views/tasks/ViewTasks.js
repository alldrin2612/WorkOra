import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Link,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function ViewTasks() {
  const { startupId, campaignId } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/freelancer/assigned-campaign-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ startupId, campaignId })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch task");
        }

        const formatted = {
          name: data.name,
          description: data.desc,
          applink: data.app_link,
          guideLink: data.guide_link,
          documentationLink: data.documentation_link,
          forumLink: data.forum_link,
          skillsRequired: data.skills?.join(", ") || "N/A",
          repositoryLink: data.repository
        };

        setTask(formatted);
      } catch (err) {
        console.error("Error fetching task details:", err);
        setError(err.message);
      }
    };

    fetchTaskDetails();
  }, [startupId, campaignId]);

  const handleSendForApproval = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch("http://localhost:4000/api/freelancer/send-for-approval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ startupId, campaignId })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send for approval");
      }

      setSuccess("Approval request sent successfully!");
    } catch (err) {
      console.error("Error sending approval request:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!task) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h6">Loading task...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: "#fafafa" }}>
      <Card elevation={4} sx={{ borderRadius: 5, padding: 4, backgroundColor: "#ffffff" }}>
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2, color: "#00796b" }}>
            {task.name}
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: 3, color: "#555" }}>
            {task.description}
          </Typography>

          <Divider sx={{ marginBottom: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#00796b" }}>
                Useful Links
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                📲 <Link href={task.applink} target="_blank" rel="noopener" underline="hover">
                  App Link <OpenInNewIcon fontSize="small" />
                </Link>
              </Typography>
              <Typography variant="body2">
                📚 <Link href={task.guideLink} target="_blank" rel="noopener" underline="hover">
                  Guide <OpenInNewIcon fontSize="small" />
                </Link>
              </Typography>
              <Typography variant="body2">
                📄 <Link href={task.documentationLink} target="_blank" rel="noopener" underline="hover">
                  Documentation <OpenInNewIcon fontSize="small" />
                </Link>
              </Typography>
              <Typography variant="body2">
                💬 <Link href={task.forumLink} target="_blank" rel="noopener" underline="hover">
                  Forum <OpenInNewIcon fontSize="small" />
                </Link>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#00796b" }}>
                Details
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                🛠️ Skills Required: <b>{task.skillsRequired}</b>
              </Typography>
              <Typography variant="body2">
                💻 <Link href={task.repositoryLink} target="_blank" rel="noopener" underline="hover">
                  Repository <OpenInNewIcon fontSize="small" />
                </Link>
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Button
  variant="contained"
  size="large"
  onClick={handleSendForApproval}
  sx={{
    backgroundColor: "#000000",  // Black background
    color: "#fff",               // White text
    borderRadius: 3,
    paddingX: 4,
    paddingY: 1.5,
    "&:hover": {
      backgroundColor: "#333333",  // Slightly lighter black on hover
    },
    transition: "all 0.3s ease-in-out"
  }}
  disabled={loading}
>
  {loading ? <CircularProgress size={26} color="inherit" /> : "🚀 Send for Approval"}
</Button>

          </Box>
        </CardContent>
      </Card>

      <Snackbar open={!!success} autoHideDuration={4000} onClose={() => setSuccess("")}>
        <Alert severity="success" variant="filled">{success}</Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError("")}>
        <Alert severity="error" variant="filled">{error}</Alert>
      </Snackbar>
    </Box>
  );
}
