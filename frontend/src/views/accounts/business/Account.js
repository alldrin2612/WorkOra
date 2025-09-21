import {
  Avatar,
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function StartupProfile() {
  const [tabValue, setTabValue] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [regno, setRegno] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  const handleTabChange = (e, newValue) => setTabValue(newValue);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/startup/get-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authToken"),
          },
        });
        const data = await res.json();
        if (res.ok) {
          setName(data.name || "");
          setEmail(data.email || "");
          setRegno(data.regno || "");
          setCompanyType(data.companyType || "");
          setPreview(data.profileImage || "");
        } else {
          console.error("Failed to load profile:", data.message);
        }
      } catch (err) {
        console.error("Error fetching startup profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleBasicInfoSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("regno", regno);
    formData.append("companytype", companyType);
    if (photo) formData.append("photo", photo);

    try {
      const res = await fetch("http://localhost:4000/api/startup/update-profile", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error("Error updating startup profile:", err);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow: 3,
        p: 2,
        maxWidth: "108%",
        height: "85vh",
        overflowY: "auto",
        margin: "auto",
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 2,
          borderBottom: "2px solid #ddd",
          "& .MuiTab-root": { color: "#000" },
          "& .MuiTab-root:hover": {
            backgroundColor: "#252526",
            color: "white",
          },
        }}
      >
        <Tab label="Basic Details" />
      </Tabs>

      {/* Basic Details */}
      {tabValue === 0 && (
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <label htmlFor="upload-photo">
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: "auto",
                cursor: "pointer",
                border: "2px solid #252526",
              }}
              src={preview}
            />
            <Typography variant="caption" display="block" sx={{ color: "gray", mt: 1 }}>
              Click to upload profile picture
            </Typography>
          </label>

          <Box sx={{ maxWidth: "80%", margin: "auto" }}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Registration No"
              value={regno}
              onChange={(e) => setRegno(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Company Type"
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#252526", "&:hover": { backgroundColor: "#1e1e1e" } }}
              onClick={handleBasicInfoSubmit}
            >
              Make Changes
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}
