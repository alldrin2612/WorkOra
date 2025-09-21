import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterBar from "./Components/FilterBar";

import Grid from "@mui/material/Grid";
import Cards from "./Components/Cards";

export default function Explore() {
  const [freelancers, setfreelancers] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch(
      "https://influverse-backend.onrender.com/api/interface-influence/freelancer/list",
    )
      .then((response) => response.json())
      .then((data) => {
        // Update state with the fetched data
        setfreelancers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ width: 1 }}
          placeholder="Explore"
          id="outlined-search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          paddingTop: "20px",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "28%", backgroundColor: "white", padding: "20px" }}>
          <FilterBar />
        </Box>
        <Box sx={{ width: "70%" }}>
          <Grid container spacing={2}>
          {freelancers.map(freelancer => (
              <Grid item xs={6} key={freelancer.id}>
                {/* Pass relevant information as props to Cards component */}
                <Cards
                  name={freelancer.name}
                  industry={freelancer.industry}
                  country={freelancer.country}
                  id={freelancer.id}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
