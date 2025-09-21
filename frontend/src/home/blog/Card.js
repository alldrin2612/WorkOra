import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';
import './blog.css';

export default function BlogCard({ title, date, description, image, buttonText, linkedInProfile }) {
  return (
    <Card 
      sx={{ 
        maxWidth: 300, 
        borderRadius: '16px', 
        backgroundColor: '#1e1e1e', 
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0px 4px 20px rgba(105, 118, 190, 0.4)',
          transform: 'translateY(-5px)'
        }
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={`${title} profile`}
        />
        <CardContent sx={{ backgroundColor: "#252526", paddingBottom: 2 }}>
          <Typography 
            className="our-font"
            sx={{ color: "white", fontSize: "20px", paddingTop: "16px" }}
          >
            {title}
          </Typography>
          <Typography 
            sx={{ color: "#6976be", fontSize: "12px", marginBottom: 1 }}
          >
            {date}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ color: "#cccccc", fontSize: "13px", marginBottom: 2 }}
          >
            {description}
          </Typography>
          <Button 
            variant="outlined" 
            size="small"
            sx={{ 
              borderColor: "#6976be", 
              color: "#6976be", 
              fontSize: '11px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: "#6976be",
                color: "white"
              }
            }}
            component="a"
            href={linkedInProfile}
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonText}
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
