import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Chip,
  Grid,
  Link,
  Divider,
  CircularProgress,
  Paper,
  Fade,
} from "@mui/material";
import { SiEthereum } from "react-icons/si";
import { CalendarToday } from "@mui/icons-material";

const ViewCampaign = () => {
  const { startupId, campaignId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/freelancer/campaign-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ startupId, campaignId }),
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.error || "Failed to fetch campaign");
        if (!result.campaignDetails || !result.startupName || !result.startupImage)
          throw new Error("Incomplete campaign data received");

        const campaign = result.campaignDetails;

        setData({
          campaignName: campaign.name,
          startupName: result.startupName,
          startupImage: result.startupImage,
          campaignPrize: campaign.prize + " ETH",
          skills: campaign.skills || [],
          description: campaign.desc,
          startDate: campaign.start_date,
          appLink: campaign.app_link,
          guideLink: campaign.guide_link,
          documentationLink: campaign.documentation_link,
          forumLink: campaign.forum_link,
          repositoryLink: campaign.repository,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching campaign:", err);
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [startupId, campaignId]);

  const handleInterest = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return console.error("No auth token found.");

    setButtonLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/freelancer/show-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ startupId, campaignId }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to show interest");

      alert("Your interest has been registered!");
    } catch (err) {
      console.error("Error showing interest:", err);
      alert("An error occurred while showing interest.");
    } finally {
      setButtonLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h6">Campaign not found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        background: "linear-gradient(135deg, #f3f4f6 0%, #e0e7ff 100%)",
        minHeight: "100vh",
      }}
    >
      <Fade in={true}>
        <Paper
          elevation={5}
          sx={{
            maxWidth: 1000,
            mx: "auto",
            p: 5,
            borderRadius: 6,
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Box display="flex" alignItems="center" gap={4} mb={4}>
            <Avatar src={data.startupImage} sx={{ width: 100, height: 100 }} />
            <Box>
              <Typography variant="h3" fontWeight="bold" color="#1f2937">
                {data.campaignName}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                by {data.startupName}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Prize</Typography>
              <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" mt={1}>
                {data.campaignPrize} <SiEthereum size={24} style={{ marginLeft: 8 }} />
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">Start Date</Typography>
              <Typography variant="h6" display="flex" alignItems="center" mt={1}>
                <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                {data.startDate}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Description
              </Typography>
              <Typography color="text.secondary" sx={{ whiteSpace: "pre-line", fontSize: "1.1rem" }}>
                {data.description}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Skills Required
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {data.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    variant="outlined"
                    sx={{
                      borderColor: "#6366f1",
                      color: "#6366f1",
                      fontWeight: 600,
                      ":hover": {
                        backgroundColor: "#e0e7ff",
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Important Links
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {data.appLink && <Link href={data.appLink} target="_blank">🌐 App Link</Link>}
                {data.guideLink && <Link href={data.guideLink} target="_blank">📘 Guide Link</Link>}
                {data.documentationLink && <Link href={data.documentationLink} target="_blank">📄 Documentation</Link>}
                {data.forumLink && <Link href={data.forumLink} target="_blank">💬 Forum</Link>}
                {data.repositoryLink && <Link href={data.repositoryLink} target="_blank">💻 Repository</Link>}
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 5 }} />

          <Box textAlign="center">
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)",
                borderRadius: "30px",
                px: 5,
                py: 1.5,
                fontSize: "1.1rem",
                textTransform: "none",
                fontWeight: "bold",
                color: "#fff",
                boxShadow: "0px 4px 20px rgba(99, 102, 241, 0.4)",
                transition: "0.3s",
                "&:hover": {
                  background: "linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%)",
                  boxShadow: "0px 6px 25px rgba(139, 92, 246, 0.5)",
                },
              }}
              onClick={handleInterest}
              disabled={buttonLoading} // Disable the button while loading
            >
              {buttonLoading ? <CircularProgress size={26} color="inherit" /> : "I am Interested 🚀"}
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
};

export default ViewCampaign;
