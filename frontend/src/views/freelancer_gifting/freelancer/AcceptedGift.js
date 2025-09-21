import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Grid, Card, CardContent, Avatar, Chip, CircularProgress } from "@mui/material";
import { FaEthereum } from "react-icons/fa";

export default function Event() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:4000/api/freelancer/rewards-received", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        // Transform backend response to frontend format
        const formattedEvents = data.map(event => ({
          startup: {
            name: event.startupName || "Unknown Startup",
            profile: event.startupImage || "https://via.placeholder.com/50",
          },
          event: {
            name: event.campaignName || "Unknown Campaign",
            prize: event.prize || 0,
            start_date: event.date || "N/A",
          },
          status: event.status || "Pending",
        }));

        setEventsData(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = eventsData.filter((event) =>
    event.event?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", minHeight: "100vh" }}>

      {/* Search */}
      <Box mb={4}>
        <TextField
          variant="outlined"
          placeholder="Search Gifts..."
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#cbd5e1",
              },
              "&:hover fieldset": {
                borderColor: "#8b5cf6",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6366f1",
              },
            },
          }}
        />
      </Box>

      {/* List */}
      <Grid container spacing={3}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, idx) => {
            const startupName = event.startup?.name || "Unknown Startup";
            const startupImage = event.startup?.profile || "https://via.placeholder.com/40";
            const campaignName = event.event?.name || "Unknown Campaign";
            const prize = event.event?.prize ? (event.event.prize > 5 ? 5 : event.event.prize) : 0;
            const startDate = event.event?.start_date || "N/A";
            const status = event.status || "Pending";

            return (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  elevation={4}
                  sx={{
                    borderRadius: 4,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar src={startupImage} alt="Startup" sx={{ width: 50, height: 50, mr: 2 }} />
                      <Typography variant="h6" fontWeight="bold" color="#374151">
                        {startupName}
                      </Typography>
                    </Box>

                    <Typography variant="subtitle1" fontWeight="medium" color="#6b7280" mb={1}>
                      {campaignName}
                    </Typography>

                    <Box display="flex" alignItems="center" mb={1}>
                      <FaEthereum color="#8b5cf6" />
                      <Typography variant="h6" ml={1}>
                        {prize} ETH
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="#6b7280" mb={1}>
                      📅 {startDate}
                    </Typography>

                    <Chip
                      label={status}
                      color={status === "Accepted" || status === "Reward Received" ? "success" : "warning"}
                      variant="outlined"
                      sx={{
                        fontWeight: "bold",
                        mt: 1,
                        borderColor: status === "Accepted" || status === "Reward Received" ? "green" : "orange",
                        color: status === "Accepted" || status === "Reward Received" ? "green" : "orange",
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary" mt={5}>
              No matching campaigns found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
