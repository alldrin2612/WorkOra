import { Box } from "@mui/system";
import * as React from "react";
import Card from "./Card";
import { Grid } from "@mui/material";
import Section from './Seaction'

export default function Blog() {
  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
        flexDirection:"column"
      }}
    >
      <Box
        sx={{
          width: "85%",
        }}
      >
        <Grid container columnSpacing={3} rowSpacing={4}>
          <Grid item xs={3}>
          <Card
  image="https://img.freepik.com/free-photo/3d-rendering-blockchain-technology_23-2151480192.jpg?ga=GA1.1.81839668.1714920053&semt=ais_hybrid&w=740"
  title="WorkOra Talent Chain"
  date="May 30, 2025"
  description="A decentralized ecosystem empowering open-source contributors and startups through provable reputation."
  buttonText="View Reputation"
/>
          </Grid>
        </Grid>
      </Box>
      <Section/>
      <Section/>
    </Box>
  );
}
