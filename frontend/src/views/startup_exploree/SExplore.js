import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Avatar, Button, Chip, Grid, Paper, Dialog, DialogTitle, DialogContent,
} from '@mui/material';

const SExplore = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dummyData = [
      {
        _id: '1',
        name: 'Aanya Mehra',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        bio: 'A full-stack developer passionate about scalable apps.',
        skills: ['React', 'Node.js', 'MongoDB'],
        education: [
          'B.Tech in Computer Science - IIT Delhi',
          'M.Sc in Data Science - IIIT Hyderabad'
        ],
        experience: [
          'Frontend Intern at Zomato',
          'Backend Developer at Swiggy'
        ],
        projects: [
          'Task Manager App',
          'Real-time Chat Application'
        ]
      },
      {
        _id: '2',
        name: 'Rohan Verma',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        bio: 'UI/UX Designer with a love for clean and intuitive design.',
        skills: ['UI/UX', 'Figma', 'Adobe XD'],
        education: ['B.Des from NID Ahmedabad'],
        experience: ['UI Designer at Paytm'],
        projects: ['E-commerce Redesign', 'Portfolio Website']
      }
    ];
    setFreelancers(dummyData);
  }, []);

  const handleOpenProfile = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFreelancer(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Explore Freelancers</Typography>
      <Grid container spacing={3}>
        {freelancers.map(freelancer => (
          <Grid item xs={12} md={6} lg={4} key={freelancer._id}>
            <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={freelancer.image}
                alt={freelancer.name}
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>{freelancer.name}</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {freelancer.skills.map((skill, index) => (
                  <Chip label={skill} key={index} color="primary" />
                ))}
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleOpenProfile(freelancer)}
              >
                View Profile
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedFreelancer?.name}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <Avatar
              src={selectedFreelancer?.image}
              alt={selectedFreelancer?.name}
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">Bio</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{selectedFreelancer?.bio}</Typography>

              <Typography variant="subtitle1" fontWeight="bold">Skills</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {selectedFreelancer?.skills.map((skill, idx) => (
                  <Chip label={skill} key={idx} />
                ))}
              </Box>

              <Typography variant="subtitle1" fontWeight="bold">Education</Typography>
              {selectedFreelancer?.education.map((edu, idx) => (
                <Typography key={idx} variant="body2">• {edu}</Typography>
              ))}

              <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>Experience</Typography>
              {selectedFreelancer?.experience.map((exp, idx) => (
                <Typography key={idx} variant="body2">• {exp}</Typography>
              ))}

              <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>Projects</Typography>
              {selectedFreelancer?.projects.map((proj, idx) => (
                <Typography key={idx} variant="body2">• {proj}</Typography>
              ))}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SExplore;
