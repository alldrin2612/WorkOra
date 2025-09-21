import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  //Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Typography,
  Chip,
  Link,
  //Grid,
  Paper
} from "@mui/material";

const SectionHeader = ({ title }) => (
  <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
    {title}
  </Typography>
);

const ViewFreelancer = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/startup/view-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ freelancerId: id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress size={50} thickness={5} />
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h6" color="error">
          Failed to load profile.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }} mb={3}>
            <Avatar
              src={profile.profileImage}
              sx={{ width: 100, height: 100, mr: { sm: 3 }, mb: { xs: 2, sm: 0 } }}
            />
            <Box textAlign={{ xs: "center", sm: "left" }}>
              <Typography variant="h5" fontWeight="bold">
                {profile.name}
              </Typography>
              <Typography color="textSecondary">{profile.email}</Typography>
              <Typography color="textSecondary">{profile.phone}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <SectionHeader title="About" />
          <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
            {profile.about || "No description available."}
          </Typography>

          <SectionHeader title="Skills" />
          <Box display="flex" flexWrap="wrap" mb={3}>
            {profile.skills[0]?.split(',').map((skill, index) => (
              <Chip
                key={index}
                label={skill.trim()}
                sx={{ mr: 1, mb: 1, backgroundColor: "#e3f2fd" }}
              />
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          <SectionHeader title="Education" />
          {profile.education.length > 0 ? (
            profile.education.map((edu) => (
              <Box key={edu._id} mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {edu.inst_name}
                </Typography>
                <Typography variant="body2">{edu.degree}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(edu.start_year).getFullYear()} - {new Date(edu.end_year).getFullYear()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No education details provided.</Typography>
          )}

          <Divider sx={{ my: 3 }} />

          <SectionHeader title="Experience" />
          {profile.experience.length > 0 ? (
            profile.experience.map((exp) => (
              <Box key={exp._id} mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {exp.company_name}
                </Typography>
                <Typography variant="body2">{exp.position}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(exp.start_date).toLocaleDateString()} -{" "}
                  {new Date(exp.end_date).toLocaleDateString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No experience details provided.</Typography>
          )}

          <Divider sx={{ my: 3 }} />

          <SectionHeader title="Projects" />
          {profile.projects.length > 0 ? (
            profile.projects.map((proj) => (
              <Box key={proj._id} mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {proj.proj_name}
                </Typography>
                <Typography variant="body2">{proj.desc}</Typography>
                <Link
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {proj.link}
                </Link>
              </Box>
            ))
          ) : (
            <Typography>No projects added yet.</Typography>
          )}
        </CardContent>
      </Paper>
    </Container>
  );
};

export default ViewFreelancer;
