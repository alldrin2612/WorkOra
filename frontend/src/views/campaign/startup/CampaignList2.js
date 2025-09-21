import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import { NavLink } from 'react-router-dom';

const CampaignList2 = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError("");

      const accessToken = localStorage.getItem("authToken"); // Get Bearer token

      if (!accessToken) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/startup/manage-campaign", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          }
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch campaigns");
        }

        setCampaigns(data.campaigns);
        setFilteredCampaigns(data.campaigns);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    const filtered = campaigns.filter(campaign => 
      campaign.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCampaigns(filtered);
    setPage(0);
  }, [search, campaigns]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: '#252526' }}>Manage Campaign</Typography>
        <Button component={NavLink} to="/startup/campaign/create-campaign" sx={{ color: 'white', backgroundColor: '#252526', '&:hover': { backgroundColor: 'white', color: '#252526' } }} variant="contained">Create New Campaign</Button>
      </Box>

      <TextField
        label="Search Campaign"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Campaign Name</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Prize</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCampaigns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>{campaign.start_date}</TableCell>
                      <TableCell>{campaign.prize}</TableCell>
                      <TableCell>{campaign.status}</TableCell>
                      <TableCell align="right">
                        <Button component={NavLink} to={`/startup/campaign/view/${campaign.id}`} variant="contained" size="small">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredCampaigns.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default CampaignList2;
