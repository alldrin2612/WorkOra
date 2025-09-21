import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Autocomplete } from "@mui/material";
// import axios from "axios";

const skillsList = ["React", "Node.js", "Blockchain", "Solidity", "Smart Contracts", "Ethereum", "Web3", "UI/UX Design"];

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    prize: "",
    appLink: "",
    userGuide: "",
    devDocs: "",
    governanceForum: "",
    skills: [],
    repository: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCampaignData({ ...campaignData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (event, value) => {
    setCampaignData({ ...campaignData, skills: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const accessToken = localStorage.getItem("authToken");
  
    if (!accessToken) {
      console.error("Access token not found in local storage.");
      setLoading(false);
      return;
    }
  
    // Modify field names to match backend expectations
    const formattedData = {
      name: campaignData.name,
      desc: campaignData.description, // Renamed
      prize: campaignData.prize,
      app_link: campaignData.appLink, // Renamed
      guide_link: campaignData.userGuide, // Renamed
      documentation_link: campaignData.devDocs, // Renamed
      forum_link: campaignData.governanceForum, // Renamed
      skills: campaignData.skills,
      repository: campaignData.repository,
    };
  
    try {
      const response = await fetch("http://localhost:4000/api/startup/create-campaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Pass Bearer Token
        },
        body: JSON.stringify(formattedData)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to create campaign");
      }
  
      console.log("Campaign created successfully:", data);
      navigate("/startup/campaign/campaign-list");
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 3, backgroundColor: "#f8f9ff", borderRadius: 4, boxShadow: 2 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: "#252526" }}>Create Campaign</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Campaign Name" name="name" value={campaignData.name} onChange={handleChange} required fullWidth />
        <TextField label="Description" name="description" value={campaignData.description} onChange={handleChange} required fullWidth multiline rows={4} />
        <TextField label="Total Prize (ETH)" name="prize" value={campaignData.prize} onChange={handleChange} required fullWidth type="number" />
        <TextField label="App Link" name="appLink" value={campaignData.appLink} onChange={handleChange} fullWidth />
        <TextField label="User Guide Link" name="userGuide" value={campaignData.userGuide} onChange={handleChange} fullWidth />
        <TextField label="Developer Documentation Link" name="devDocs" value={campaignData.devDocs} onChange={handleChange} fullWidth />
        <TextField label="Governance Forum Link" name="governanceForum" value={campaignData.governanceForum} onChange={handleChange} fullWidth />
        <Autocomplete multiple options={skillsList} value={campaignData.skills} onChange={handleSkillChange} renderInput={(params) => <TextField {...params} label="Required Skills" fullWidth />} />
        <TextField label="Repository Link" name="repository" value={campaignData.repository} onChange={handleChange} required fullWidth />
        <Button type="submit" variant="contained" sx={{ backgroundColor: "#252526", color: "white", borderRadius: 20, textTransform: "none", fontWeight: "bold", '&:hover': { backgroundColor: "white", color: "#252526", borderColor: "#252526", borderWidth: "2px" } }} disabled={loading}>
          {loading ? "Creating..." : "Create Campaign"}
        </Button>
      </Box>
    </Container>
  );
};


export default CreateCampaign;
