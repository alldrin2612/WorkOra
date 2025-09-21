import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { Typography } from "@mui/material";
import "./authentication3/login.css";
import freelancerImage from "./authentication3/assets/freelancer.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import startupImage from "./authentication3/assets/startup.png";



export default function AccountType() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate(); // Get navigate function for redirection

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSelectionSubmit = () => {
    // Send selectedOption to the server via POST request
          // Redirect to another page based on the selection
          if (selectedOption === "freelancer") {
            navigate("/connectwallet/freelancer");
          } else if (selectedOption === "marketer") {
            navigate("/connectwallet/business");
          }
      
  };
  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box sx={{ marginBottom: "50px" }}>
        <Typography
          className="font-sty"
          sx={{ color: "white", fontSize: "30px" }}
        >
          Choose account type
        </Typography>
      </Box>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          className={`acc-type-inf ${selectedOption === "freelancer" ? "selected" : ""}`}
          onClick={() => handleOptionSelect("freelancer")}
          sx={{
            width: "250px",
            border: "0.5px solid #2e375f",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            paddingY: "30px",
            borderRadius: "10px",
          }}
        >
          <img alt="Freelancer" src={freelancerImage} />
          <Typography
            className="font-sty"
            sx={{ color: "white", fontSize: "20px", marginTop: "60px" }}
          >
            Freelancer
          </Typography>
        </Box>
        <Box
          className={`acc-type-inf ${selectedOption === "marketer" ? "selected" : ""}`}
          onClick={() => handleOptionSelect("marketer")}
          sx={{
            width: "250px",
            border: "0.5px solid #2e375f",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            paddingY: "30px",
            borderRadius: "10px",
          }}
        >
          <img alt="Startup" src={startupImage} />
          <Typography
            className="font-sty"
            sx={{ color: "white", fontSize: "20px", marginTop: "60px" }}
          >
            StartUp
          </Typography>
        </Box>
      </Box>
      <Box sx={{marginTop:"30px", width:"41%", display:"flex", alignItems:"flex-end", justifyContent:"flex-end"}}>
        <Button sx={{backgroundColor:"##FFFFFF"}} variant="contained" onClick={handleSelectionSubmit} endIcon={<SendIcon />}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
