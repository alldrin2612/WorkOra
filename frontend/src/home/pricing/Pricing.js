import * as React from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      'Basic freelancer analytics',
      'Skill verification (limited)',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Professional',
    subheader: 'Recommended',
    price: '1500',
    description: [
      'Advanced freelancer insights',
      'Verified skill credentials',
      'Priority access & support',
    ],
    buttonText: 'Start now',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '3000',
    description: [
      'Dedicated onboarding',
      'Full-stack analysis suite',
      'Enterprise-level integrations',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

export default function Pricing() {
  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: 'center',
        }}
      >
<Typography
  component="h2"
  variant="h3"
  sx={{
    color: 'white',
    fontWeight: 'bold',
    fontSize: { xs: 28, sm: 36 },
    pb: 2,
  }}
>
  Choose the plan that&apos;s right for you
</Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ maxWidth: '70%', mx: 'auto' }}
        >
          Scalable pricing built to support freelancers, professionals, and enterprises.
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === 'Enterprise' ? 12 : 6}
            md={4}
          >
            <Card
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                borderRadius: 4,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: 4,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
                border: tier.title === 'Professional' ? '2px solid' : '1px solid',
                borderColor: tier.title === 'Professional' ? 'primary.main' : 'grey.700',
                background:
                  tier.title === 'Professional'
                    ? 'linear-gradient(to bottom right, #0d47a1, #1976d2)'
                    : '#2c2c2c',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: tier.title === 'Professional' ? 'grey.100' : '',
                  }}
                >
                  <Typography component="h3" sx={{ color: 'white' }} variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.subheader && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={tier.subheader}
                      size="small"
                      sx={{
                        backgroundColor: 'white',
                        '& .MuiChip-label': {
                          color: 'primary.dark',
                        },
                        '& .MuiChip-icon': {
                          color: 'primary.dark',
                        },
                      }}
                    />
                  )}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    color: tier.title === 'Professional' ? 'grey.50' : undefined,
                  }}
                >
                  <Typography component="h3" sx={{ color: 'white' }} variant="h2">
                    ₹{tier.price}
                  </Typography>
                  <Typography component="h3" sx={{ color: 'white' }} variant="h6">
                    &nbsp; per month
                  </Typography>
                </Box>

                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: 'grey.500',
                  }}
                />

                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'center',
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        width: 20,
                        color:
                          tier.title === 'Professional'
                            ? 'primary.light'
                            : 'primary.main',
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: tier.title === 'Professional' ? 'grey.200' : 'white',
                      }}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>

              <CardActions>
              {tier.title === 'Free' ? (
  <Button
    fullWidth
    variant={tier.buttonVariant}
    component={Link}
    to="/Register"
  >
    {tier.buttonText}
  </Button>
) : (
  <Button
    fullWidth
    variant={tier.buttonVariant}
    component="a"
    href="/material-ui/getting-started/templates/checkout/"
    target="_blank"
  >
    {tier.buttonText}
  </Button>
)}

              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
