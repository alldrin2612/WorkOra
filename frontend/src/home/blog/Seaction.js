// Seaction.js
import React from "react";
import { Box } from "@mui/system";
import BlogCard from "./Card";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import "./blog.css";

export default function Section() {
// Section.js
const cardsData = [
  {
    name: "Sinoya",
    skill: "Frontend Engineer (WorkOra)",
    location: "New York",
    //image: "https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg?ga=GA1.1.81839668.1714920053&semt=ais_hybrid&w=740"
    image: "https://media-hosting.imagekit.io/3cbbace7eaf846fb/20240828_130444.jpg?Expires=1840255114&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=EC4Et4pKWYXWzT5CpxKLthVyfVh8-7WJC76ApCJwnRR1GXFPEM3TDyJpEoImxl~Fx39TkOPNeF0A3reWlnNFrtzpS~D6wGDG5U2Vsu-SHvuZm8LC1rwp4uC1BUo4gzfzeDdXDUIq1Kj9KUa0~hL3muJ3Q3KQgoXwYSxWgLBKL2Z8AIbHhXOpo2pl4RPIxHdu35-IE6z1a7kH3M3YUbua3aAsl2ab8XsDAKHjf4w2iAiXTyCHkjF9a95w~vNFywSm2O7~8BdTxpu-WqaPpIqvbSbmq5kgGg4I7Ch8~6OgkkglzsUoaWXS2oPDOcKayf8TgvKjsGFYfBNbOhsnsJ8j0Q__",
    linkedInProfile: "https://in.linkedin.com/in/sinoya-dcunha-6b5690226"
  },
  {
    name: "Siya",
    skill: "Smart Contract Auditor",
    location: "San Francisco",
   //image: "https://img.freepik.com/free-photo/picture-beautiful-pretty-girl-her-twenties-waking-outdoors-vibrant-street-enjoying-nice-summer-day-smiling-joyfully-people-summertime-youth-travel-lifestyle-concept_343059-2899.jpg?ga=GA1.1.81839668.1714920053&semt=ais_hybrid&w=740"
    image: "https://media-hosting.imagekit.io/49f4a360e31a49b1/20240828_130538.jpg?Expires=1840255057&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XufXTTmm8cFK~mKFs3Zszas37nSN1wUR5tTx-ST6~DEy0VydjVfty7z~wsM2-VstDybbL3DCAEHhWNLkfeu3nPAiuEGlmK7UTxy4-Syu1i6~9AAaXTz3lIbwa4HMZhTEaX2ZzHLDZGtRXqfXOuyWuFH3DdmYqqZkKHRQ-dZSpj68nq4aMRi1zxYgJDzEbGE~8nOpTzBcMBjBa2JGsc6LQd7OJrJMB-e9w-pj0CvG0z~k7ouNNcpfQf3EU1adwLPw62mxeAM9JVCQQZxfe18hX6g4QruJ2SKauYqIgh54YcVf2G5pjqqq~jEiZn08x4cVIM3CRaoTm3kUK9FhVZ1nkw__",
    linkedInProfile: "https://in.linkedin.com/in/siya-vaz-a23b94216"
  },
  {
    name: "Shubael",
    skill: "Solidity Developer",
    location: "Singapore",
    image: "https://media-hosting.imagekit.io/dd8cda011a504ebe/20240828_130349.jpg?Expires=1840254721&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=lNxrFRNuZn8-IxZN0-syX-2dA8vJ5KoEahmtDFSkwFFWHwGHctvB9mGY9uf61zMlqksHs14QHYsbgVroBlKr8Orgc9ECuO6zgfQRYDhGCJ4TkjUt0JIo05cOCC-natQMp0CQyA30ErQ9QBmC9d19E1cYWBmTY1nyiKzeYMyE2KDqiHD6Xrc5QOLAbInNr71dIZPEDlWVtnRpbihZpfuliT0dBv5WR52V-WoWJkxvZg1tLgSLbe2RN9WTi4cUR0IR8dLfzlFcVM3XUZq-0Da3PT4CV-fcmyXaUwrNhdprUR~WBBioqGw4MApUPQpwax304IFNiwOc4l9aSo6UW1uK-A__",
    linkedInProfile: "https://in.linkedin.com/in/shubael-vaz-954479244"
  },
  {
    name: "Alldrin",
    skill: "Fullstack dApp Builder",
    location: "Germany",
    image: "https://media-hosting.imagekit.io/a7106883db8a4f53/20240828_130254.jpg?Expires=1840254551&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=hEoQrnYCOnVVKrYPezzpGxQU7JkAk1zK6NdFqFzqw4-SZi2kkZTsCalkgp~c6fDC-fHceBhiSsO2DCyRbw4gzKbYvxbFrFKJeOWQ-PYqfl8e9yVAWhYmUE59TbgP7lCKqJgKSwGOKbqiKYO0pMqjwRNrK6IrmFz7cLusq47slmUEp85CDqG6mD45XGJo0j48xh8btqeUYzpB-7~lZ9erkYoryTV5c85onZvhIiPxdM81yKQ-wYkOPdqcsEHq7bZ6H1zCASSx7sRsZA2rL9Omb4puBNzRpoNczHU7ZIOsok6aIoKW5uUYKV7zkClkMyGhfz2gGQBt1LOBQDr8BulIvQ__",
    linkedInProfile: "https://in.linkedin.com/in/alldrin-tuscano"
  },
];



  return (
    <Box sx={{ marginTop: "60px", width: "90%", mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "30px",
        }}
      >
        <Typography
          className="our-font"
          sx={{
            color: "white",
            fontSize: "28px",
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Featured Talent Nodes
        </Typography>
        <Button
          className="our-font"
          variant="outlined"
          sx={{
            color: "#A970FF",
            borderColor: "#A970FF",
            textTransform: "none",
            "&:hover": {
              borderColor: "#CBA3FF",
              color: "#CBA3FF",
            },
          }}
        >
          Explore Network
        </Button>
      </Box>

      <Box sx={{ width: 1 }}>
        <Grid container spacing={3}>
          {cardsData.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
<BlogCard
  title={card.name}
  date={card.skill + ' - ' + card.location}
  description={`Explore ${card.name}'s expertise in ${card.skill} from ${card.location}.`}
  image={card.image}
  buttonText="View Profile"
  linkedInProfile={card.linkedInProfile} // Pass the LinkedIn link
/>

            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
