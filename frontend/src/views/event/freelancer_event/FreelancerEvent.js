import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";

export default function Event() {
  const [eventsData, setEventsData] = useState([]);

  // Safely parse user from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const freelancerSlug = user?.freelancer?.[0]?.slug;

  useEffect(() => {
    if (freelancerSlug) {
      fetch(`https://influverse-backend.onrender.com/api/interface-influence/${freelancerSlug}/events/opt-in/list`)
        .then((response) => response.json())
        .then((data) => setEventsData(data))
        .catch((error) => console.error("Error fetching events:", error));
    } else {
      console.error("Freelancer slug not found in user data.");
    }
  }, [freelancerSlug]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#252526" }}>
          Manage your Events
        </Typography>
        <Button
          component={NavLink}
          to="/freelancer/event/explore"
          sx={{
            color: "white",
            backgroundColor: "#252526",
            borderColor: "#252526",
            borderWidth: "2px",
            "&:hover": {
              backgroundColor: "white",
              color: "#252526",
              borderColor: "#252526",
              borderWidth: "2px",
            },
          }}
          variant="outlined"
        >
          Explore Event
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <TextField
          id="outlined-basic"
          placeholder="Explore Influvencers"
          variant="outlined"
          sx={{ width: "75%", borderColor: "#252526", borderWidth: "2px" }}
        />

        <FormControl sx={{ width: "22%" }}>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select">
            <FormGroup>
              <MenuItem value={10}>
                <FormControlLabel control={<Checkbox />} label="Label 1" />
              </MenuItem>
              <MenuItem value={20}>
                <FormControlLabel control={<Checkbox />} label="Label 2" />
              </MenuItem>
              <MenuItem value={30}>
                <FormControlLabel control={<Checkbox />} label="Label 3" />
              </MenuItem>
            </FormGroup>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ width: "100%", marginTop: "30px" }}>
        <Grid container spacing={2}>
          {eventsData.length > 0 ? (
            eventsData.map((event) => (
              <Grid key={event?.event?.id || Math.random()} item xs={6}>
                <EventCard
                  title={event?.event?.name || "No title"}
                  description={event?.event?.description || "No description"}
                  location={event?.event?.country || "Unknown location"}
                  date={event?.event?.start_date || "No date"}
                  slug={freelancerSlug}
                  userid={event?.event?.id || ""}
                />
              </Grid>
            ))
          ) : (
            <Typography>No events found.</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
