import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Avatar, Button, Chip, Grid, Paper
} from '@mui/material';

const Explore = () => {
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    // Replace this with actual API call
    const dummyData = [
      {
        _id: '1',
        name: 'Aanya Mehra',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        skills: ['React', 'Node.js', 'MongoDB']
      },
      {
        _id: '2',
        name: 'Rohan Verma',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        skills: ['UI/UX', 'Figma', 'Adobe XD']
      },
      {
        _id: '3',
        name: 'Sana Kapoor',
        image: 'https://randomuser.me/api/portraits/women/65.jpg',
        skills: ['Python', 'Machine Learning', 'TensorFlow']
      }
    ];
    setFreelancers(dummyData);
  }, []);

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
                onClick={() => alert(`Viewing profile of ${freelancer.name}`)}
              >
                View Profile
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Explore;
