import {
  Avatar,
  Button,
  TextField,
  Tabs,
  Tab,
  Box,
  Typography,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";



export default function FreelancerProfile() {
  const [tabValue, setTabValue] = useState(0);
  const [photo, setPhoto] = useState(null); // actual file
  const [preview, setPreview] = useState(""); // preview URL


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');


  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");

  const [education, setEducationList] = useState([
    { inst_name: "", degree: "", start_year: "", end_year: "" },
  ]);
  const [experience, setExperienceList] = useState([
    { company_name: "", position: "", start_date: "", end_date: "" },
  ]);
  const [projects, setProjectList] = useState([
    { proj_name: "", desc: "", link: "" },
  ]);

  const handleChange = (event, newValue) => setTabValue(newValue);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file)); // update preview
  };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/freelancer/get-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authToken"), // adjust if you use a token
          },
        });

        const data = await response.json();
        if (response.ok) {
          setName(data.name || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setAbout(data.about || "");
          setSkills((data.skills || []).join(", "));
          setPreview(data.image || "");
          if (data.education?.length) setEducationList(data.education);
          if (data.experience?.length) setExperienceList(data.experience);
          if (data.projects?.length) setProjectList(data.projects);
        } else {
          console.error("Failed to load profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSummarySubmit = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/freelancer/update-about-skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ about, skills }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Professional Summary updated successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error("Error updating professional summary:", err);
      alert("An unexpected error occurred.");
    }
  };


  const handleBasicInfoSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    if (photo) formData.append("photo", photo); // append only if selected

    try {
      const res = await fetch("http://localhost:4000/api/freelancer/basic-info", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
        body: formData, // don't set Content-Type manually!
      });

      const result = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An unexpected error occurred.");
    }
  };

  const handleEducationSubmit = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/freelancer/update-education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ education }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Education updated successfully!");
      } else {
        alert("Failed to update education: " + result.message);
      }
    } catch (error) {
      console.error("Error updating education:", error);
      alert("An unexpected error occurred.");
    }
  };

  const handleExperienceSubmit = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/freelancer/update-experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ experience }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Work experience updated successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error("Error updating experience:", err);
      alert("An unexpected error occurred.");
    }
  };

  const handleProjectsSubmit = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/freelancer/update-projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ projects }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Projects updated successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error("Error updating projects:", err);
      alert("An unexpected error occurred.");
    }
  };



  // === Education Handlers ===
  const handleEducationChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducationList(updated);
  };
  const handleAddEducation = () =>
    setEducationList([...education, { inst_name: "", degree: "", start_year: "", end_year: "" }]);
  const handleRemoveEducation = (index) => {
    const updated = [...education];
    updated.splice(index, 1);
    setEducationList(updated);
  };

  // === Experience Handlers ===
  const handleExperienceChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperienceList(updated);
  };
  const handleAddExperience = () =>
    setExperienceList([...experience, { company_name: "", position: "", start_date: "", end_date: "" }]);
  const handleRemoveExperience = (index) => {
    const updated = [...experience];
    updated.splice(index, 1);
    setExperienceList(updated);
  };

  // === Project Handlers ===
  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjectList(updated);
  };
  const handleAddProject = () =>
    setProjectList([...projects, { proj_name: "", desc: "", link: "" }]);
  const handleRemoveProject = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjectList(updated);
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
        onChange={handleChange}
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
        <Tab label="Professional Summary" />
        <Tab label="Education" />
        <Tab label="Work Experience" />
        <Tab label="Projects" />
      </Tabs>

      {/* === Basic Details === */}
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
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

      {/* === Professional Summary === */}
      {tabValue === 1 && (
        <Box sx={{ maxWidth: "80%", margin: "auto" }}>
          <TextField
            fullWidth
            label="About"
            multiline
            rows={3}
            sx={{ mt: 2 }}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <TextField
            fullWidth
            label="Skills"
            sx={{ mt: 2 }}
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#252526" }}
            onClick={handleSummarySubmit}
          >
            Make Changes
          </Button>

        </Box>
      )}

      {/* === Education === */}
      {tabValue === 2 && (
        <Box sx={{ maxWidth: "80%", margin: "auto" }}>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2, borderBottom: "1px solid #ccc", pb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="subtitle1">Education #{index + 1}</Typography>
                {education.length > 1 && (
                  <Button color="error" onClick={() => handleRemoveEducation(index)} sx={{ textTransform: "none" }}>
                    ✖ Cancel
                  </Button>
                )}
              </Box>
              <TextField
                fullWidth
                label="Institute Name"
                sx={{ mt: 2 }}
                value={edu.inst_name}
                onChange={(e) => handleEducationChange(index, "inst_name", e.target.value)}
              />
              <TextField
                fullWidth
                label="Degree Name"
                sx={{ mt: 2 }}
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
              />
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 2 }}
                value={edu.start_year}
                onChange={(e) => handleEducationChange(index, "start_year", e.target.value)}
              />
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 2 }}
                value={edu.end_year}
                onChange={(e) => handleEducationChange(index, "end_year", e.target.value)}
              />
            </Box>
          ))}
          <Button onClick={handleAddEducation} variant="outlined" sx={{ mt: 1 }}>
            + Add Education
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#252526" }}
            onClick={handleEducationSubmit}
          >
            Save Changes
          </Button>

        </Box>
      )}

      {/* === Work Experience === */}
      {tabValue === 3 && (
        <Box sx={{ maxWidth: "80%", margin: "auto" }}>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2, borderBottom: "1px solid #ccc", pb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="subtitle1">Experience #{index + 1}</Typography>
                {experience.length > 1 && (
                  <Button color="error" onClick={() => handleRemoveExperience(index)} sx={{ textTransform: "none" }}>
                    ✖ Cancel
                  </Button>
                )}
              </Box>
              <TextField
                fullWidth
                label="Company Name"
                sx={{ mt: 2 }}
                value={exp.company_name}
                onChange={(e) => handleExperienceChange(index, "company_name", e.target.value)}
              />
              <TextField
                fullWidth
                label="Position"
                sx={{ mt: 2 }}
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
              />
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 2 }}
                value={exp.start_date}
                onChange={(e) => handleExperienceChange(index, "start_date", e.target.value)}
              />
              <TextField
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 2 }}
                value={exp.end_date}
                onChange={(e) => handleExperienceChange(index, "end_date", e.target.value)}
              />
            </Box>
          ))}
          <Button onClick={handleAddExperience} variant="outlined" sx={{ mt: 1 }}>
            + Add Experience
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#252526" }}
            onClick={handleExperienceSubmit}
          >
            Save Changes
          </Button>

        </Box>
      )}

      {/* === Projects === */}
      {tabValue === 4 && (
        <Box sx={{ maxWidth: "80%", margin: "auto" }}>
          {projects.map((proj, index) => (
            <Box key={index} sx={{ mb: 2, borderBottom: "1px solid #ccc", pb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="subtitle1">Project #{index + 1}</Typography>
                {projects.length > 1 && (
                  <Button color="error" onClick={() => handleRemoveProject(index)} sx={{ textTransform: "none" }}>
                    ✖ Cancel
                  </Button>
                )}
              </Box>
              <TextField
                fullWidth
                label="Project Name"
                sx={{ mt: 2 }}
                value={proj.proj_name}
                onChange={(e) => handleProjectChange(index, "proj_name", e.target.value)}
              />
              <TextField
                fullWidth
                label="Brief Description"
                multiline
                rows={3}
                sx={{ mt: 2 }}
                value={proj.desc}
                onChange={(e) => handleProjectChange(index, "desc", e.target.value)}
              />
              <TextField
                fullWidth
                label="Project Link"
                sx={{ mt: 2 }}
                value={proj.link}
                onChange={(e) => handleProjectChange(index, "link", e.target.value)}
              />
            </Box>
          ))}
          <Button onClick={handleAddProject} variant="outlined" sx={{ mt: 1 }}>
            + Add Project
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#252526" }}
            onClick={handleProjectsSubmit}
          >
            Save Changes
          </Button>

        </Box>
      )}
    </Container>
  );
}
