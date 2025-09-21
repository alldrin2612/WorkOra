"use client";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Cards({ name, industry, country, image }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: 1,
        maxWidth: "400px",
        boxShadow:
          "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={name}
            src={image}
            sx={{ width: 80, height: 80, marginRight: "15px" }}
          />
          <Box>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {name}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "gray" }}>
              {Array.isArray(industry) ? industry.join(", ") : industry}
            </Typography>
            <Typography
              sx={{
                fontStyle: "italic",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                marginTop: "8px",
                color: "gray",
              }}
            >
              <LocationOnIcon fontSize="inherit" sx={{ marginRight: "5px" }} />
              {country}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: 1, marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button sx={{ width: 1, textTransform: "none" }} variant="outlined">
                View Profile
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                sx={{ width: 1, textTransform: "none" }}
                variant="contained"
                color="primary"
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
