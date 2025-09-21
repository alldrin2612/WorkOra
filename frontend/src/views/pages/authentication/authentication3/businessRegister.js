import * as React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { NavLink, useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid, Typography, TextField, Box } from "@mui/material";
import AuthWrapper1 from "../AuthWrapper1";
import { useState } from "react";
import img1 from "./assets/register1.png";
import "./login2.css";

const StartupRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    companytype: [],
    existingUser: true,
    role: "startup",
  });

  // Handle input field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle company type selection
  const handleCompanyTypeChange = (event, value) => {
    setFormData((prevState) => ({
      ...prevState,
      companytype: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("authToken");

      // Check if access token exists
      if (accessToken) {
        // Use the access token for further operations
        console.log("Access Token:", accessToken);
      } else {
        console.log("Access token not found in local storage.");
      }
      // Make a POST request to your server endpoint
      const response = await fetch("http://localhost:4000/api/startup/startupregister", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      

      if (response.status===200) {

        const data = await response.json();

        console.log(data)
        localStorage.setItem("user", JSON.stringify(data));
     
        console.log("success");
        navigate("/startup/dashboard");
      } else {
        const errorResponse = await response.json();
    setError(errorResponse.message || 'Something went wrong!');
    setOpenSnackbar(true);
      }
        // Redirect to dashboard or other page
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  return (
    <AuthWrapper1>
      <Grid container>
        <Grid xs={6}>
          <Box className="image-area" sx={{ height: "100vh", width: 1 }}>
            <img src={img1} alt="Startup Registration" />
          </Box>
        </Grid>
        <Grid xs={6}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "#F0ECE5",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box sx={{ width: 1, margin: "20px", paddingX: "30px" }}>
                <Typography className="font-sty" sx={{ fontSize: "20px" }}>
                  Welcome to,
                </Typography>
                <Typography className="font-sty" sx={{ fontSize: "30px" }}>
                  WorkOra
                </Typography>
              </Box>
              <Box
                sx={{
                  margin: "20px",
                  display: "flex",
                  flexDirection: "column",
                  width: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  name="name"
                  placeholder="Startup Name"
                  variant="outlined"
                  value={formData.name}
                  required
                  onChange={handleFormChange}
                  sx={{ width: "85%", marginY: "20px" }}
                />
                <TextField
                  name="regno"
                  placeholder="Startup Registration Number"
                  variant="outlined"
                  value={formData.regno}
                  required
                  onChange={handleFormChange}
                  sx={{ width: "85%", marginY: "20px" }}
                />
                <Autocomplete
                  sx={{ width: "85%", marginY: "20px" }}
                  multiple
                  id="company-types"
                  options={companytype.map((option) => option.title)}
                  freeSolo
                  value={formData.companytype}
                  onChange={handleCompanyTypeChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        key={index}
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Company Type"
                    />
                  )}
                />
                <Box
                  sx={{
                    display: "flex",
                    width: 1,
                    paddingX: "55px",
                    paddingY: "40px",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ display: "flex" }}>
                    Already a user? {" "}
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        paddingLeft: "5px",
                        textDecoration: "none",
                        color: "black",
                      }}
                      component={NavLink}
                      to="/login"
                    >
                      SignIn
                    </Typography>
                  </Typography>
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    className="font-sty"
                    sx={{ backgroundColor: "#252526" }}
                    endIcon={<SendIcon />}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default StartupRegistration;

const companytype = [
  { title: "IT services and consulting company" },
  { title: "Software development company" },
  { title: "Cloud service provider company" },
  { title: "Cybersecurity firm company" },
  { title: "Hardware manufacturer company" },
  { title: "Telecommunications company" },
  { title: "Data analytics company" },
  { title: "Artificial intelligence (AI) company" },
  { title: "Blockchain company" },
  { title: "E-commerce platform company" },
  { title: "Fintech company" },
  { title: "HealthTech company" },
  { title: "EdTech company" },
  { title: "Gaming company" },
  { title: "Mobile app development firm company" },
];
