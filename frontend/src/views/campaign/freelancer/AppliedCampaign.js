import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppliedCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await fetch("http://localhost:4000/api/freelancer/applied-campaigns", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch applied campaigns");
        }

        setCampaigns(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleView = (startupId, campaignId) => {
    navigate(`/freelancer/campaign/applied-campaign-details/${startupId}/${campaignId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Assigned":
        return "success";
      case "Completed":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 4, p: 3, backgroundColor: "#f8f9ff", borderRadius: 4, boxShadow: 2 }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: "#252526" }}>
        Campaign List
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Campaign Name</strong></TableCell>
                <TableCell><strong>Start Date</strong></TableCell>
                <TableCell><strong>Prize</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((campaign, index) => (
                <TableRow key={index}>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell>{campaign.start_date}</TableCell>
                  <TableCell>{campaign.prize}</TableCell>
                  <TableCell>
                    <Chip
                      label={campaign.status}
                      color={getStatusColor(campaign.status)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleView(campaign.startupId, campaign.campaignId)}
                      sx={{
                        mt: 2,
                        backgroundColor: "#252526",
                        borderRadius: 20,
                        textTransform: "none",
                        fontWeight: "bold",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#1a1a1a",
                          borderColor: "#333333",
                        },
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError("")}>
        <Alert severity="error" variant="filled">{error}</Alert>
      </Snackbar>
    </Container>
  );
};

export default AppliedCampaign;
