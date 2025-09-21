import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Grid, Typography, Avatar, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const TotalGrowthBarChart = ({ isLoading }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(isLoading);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch('http://localhost:4000/api/leaderboard/leaderboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  if (loading) {
    return <Typography sx={{ color: '#fff', textAlign: 'center', mt: 5 }}>Loading...</Typography>;
  }

  if (error) {
    return <Typography sx={{ color: 'red', textAlign: 'center', mt: 5 }}>Failed to load leaderboard data.</Typography>;
  }

  return (
    <MainCard sx={{ backgroundColor: '#1e1e2f', color: '#fff', p: 2, borderRadius: '15px', boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)' }}>
      <Grid container spacing={gridSpacing} justifyContent="center">
        <Grid item xs={15}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#fff', fontWeight: 700 }}>
            LeaderBoard
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ backgroundColor: '#2c2c3e', boxShadow: 'none', borderRadius: '10px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Rank</TableCell>
                  <TableCell align="left" sx={{ color: '#fff', fontWeight: 'bold' }}>Username</TableCell>
                  <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Campaigns Done</TableCell>
                  <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Ongoing Campaigns</TableCell>
                  <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Rewards</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(leaderboardData || []).map((user, index) => (
                  <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: '#3b3b50' }, transition: 'all 0.3s ease' }}>
                    <TableCell align="center" sx={{ color: '#fff' }}>{index + 1}</TableCell>
                    <TableCell align="left">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={user.profileImage} alt={user.name} sx={{ width: 32, height: 32, mr: 2 }} />
                        <Typography variant="subtitle2" sx={{ color: '#fff', textAlign: 'left', fontWeight: 500 }}>
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ color: '#fff' }}>{user.campaignsDone}</TableCell>
                    <TableCell align="center" sx={{ color: '#fff' }}>{user.ongoingCampaigns}</TableCell>
                    <TableCell align="center" sx={{ color: '#fff' }}>{user.rewards.toLocaleString()} ETH</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </MainCard>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
};

TotalGrowthBarChart.defaultProps = {
  isLoading: false,
};

export default TotalGrowthBarChart;
