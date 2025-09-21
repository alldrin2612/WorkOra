import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const userTestimonials = [
  {
    avatar: <Avatar alt="Carlos Sainz" src="https://i.redd.it/carlos-sainz-via-instagram-cover-shoot-for-esquireitalia-v0-we31uizxjpmc1.jpg?width=1178&format=pjpg&auto=webp&s=6c8540388c9945661aac511998ee37ad71a8ead5" />,
    name: 'Carlos Sainz',
    occupation: 'Freelance Developer',
    testimonial:
      "Working with startups through this platform has been an incredible experience. The flexibility and diverse projects allow me to enhance my skills while contributing meaningfully to emerging businesses.",
  },
  {
    avatar: <Avatar alt="Sophia Green" src="https://randomuser.me/api/portraits/women/2.jpg" />,
    name: 'Sophia Green',
    occupation: 'Freelance Graphics Designer',
    testimonial:
      "This platform has connected me with some amazing startups. I love the creative freedom I get while designing branding materials and interfaces for early-stage companies!",
  },
  {
    avatar: <Avatar alt="Charles Lecler" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQJTuWUHin_j4sZa1vEuOhQJltYQpCozDgHA&s" />,
    name: 'Charles Lecler',
    occupation: 'Freelance Full Stack Developer',
    testimonial:
      "I’ve written compelling content for various startup blogs and social media campaigns. The collaboration tools provided make it easy to align with the startup’s vision and goals.",
  },
  {
    avatar: <Avatar alt="Emma Stone" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlEBPz3_RUkINJCoVQj5canf3RUGXax7gw7A&s" />,
    name: 'Emma Stone',
    occupation: 'Freelance Blockchain Developer',
    testimonial:
      "Startups need agile marketing strategies, and this platform has been perfect for bridging the gap between innovative businesses and skilled freelancers like myself!",
  },
  {
    avatar: <Avatar alt="Daniel Brooks" src="https://randomuser.me/api/portraits/men/5.jpg" />,
    name: 'Daniel Brooks',
    occupation: 'Freelance Data Analyst',
    testimonial:
      "Analyzing startup growth trends has been an exciting challenge. This platform ensures smooth collaboration and real-time insights, making my job seamless.",
  },
  {
    avatar: <Avatar alt="Fernando Alonso" src="https://randomuser.me/api/portraits/men/46.jpg" />,
    name: 'Fernando Alonso',
    occupation: 'Freelance UX/UI Designer',
    testimonial:
      "Analyzing startup growth trends has been an exciting challenge. This platform ensures smooth collaboration and real-time insights, making my job seamless.",
  },

  //   name: 'Max Verstappen',
  //   occupation: 'Freelance Buisness Analyst',
  //   testimonial:
  //     "This platform ensures smooth collaboration and real-time insights, making my job seamless.",
  // },
];

// const logoStyle = {
//   width: '64px',
//   opacity: 0.3,
// };

export default function Testimonials() {
  return (
    <Container
      id="testimonials"
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
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="white" sx={{ fontSize:24, paddingBottom:'12px'}}>
          Freelancer Testimonials
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover how freelancers are making an impact by collaborating with startups and helping them grow with their expertise and innovation.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
                backgroundColor: "#5c5b5b"
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ color: '#F4F4F4' }}>
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={<Typography sx={{ color: 'white' }}>{testimonial.name}</Typography>}
                  subheader={testimonial.occupation}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
