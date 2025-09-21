import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Dummy data for transactions
    const dummyTransactions = [
      {
        id: 1,
        campaign: { name: 'Web3 Expo' },
        cost: 0.5,
        transaction_id: 'TX12345',
      },
      {
        id: 2,
        campaign: { name: 'Firewall 10X' },
        cost: 1.2,
        transaction_id: 'TX67890',
      },
      {
        id: 3,
        campaign: { name: 'UI Express' },
        cost: 0.9,
        transaction_id: 'TX11121',
      },
      {
        id: 4,
        campaign: { name: 'Automated Phone' },
        cost: 1.2,
        transaction_id: 'TX11222',
      },
      {
        id: 5,
        campaign: { name: 'FintechAI' },
        cost: 1.9,
        transaction_id: 'TX11124',
      },

    ];
    
    // Set the dummy data
    setTransactions(dummyTransactions);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Transactions</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column">
                  {transactions.length === 0 ? (
                    <Typography variant="subtitle1">No transactions yet</Typography>
                  ) : (
                    transactions.map((transaction) => (
                      <React.Fragment key={transaction.id}>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {transaction.campaign.name}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="subtitle1" color="inherit">
                                    {transaction.cost} ETH
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Avatar
                                    variant="rounded"
                                    sx={{
                                      width: 16,
                                      height: 16,
                                      borderRadius: '5px',
                                      backgroundColor: theme.palette.success.light,
                                      color: theme.palette.success.dark,
                                      ml: 2
                                    }}
                                  >
                                    <KeyboardArrowLeftIcon fontSize="small" color="inherit" />
                                  </Avatar>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                            {transaction.transaction_id}
                          </Typography>
                        </Grid>
                        <Divider sx={{ my: 1.5 }} />
                      </React.Fragment>
                    ))
                  )}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
