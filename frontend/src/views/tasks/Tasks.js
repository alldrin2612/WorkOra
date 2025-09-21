import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Paper,
  CircularProgress
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskSearch, setTaskSearch] = useState("");
  const [loadingTaskId, setLoadingTaskId] = useState(null); // Track which task is being loaded
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/freelancer/assigned-campaigns", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        const formattedTasks = data.map((task) => ({
          id: task.campaignId,
          startupId: task.startupId,
          name: task.name,
          startDate: task.start_date,
          prize: task.prize,
          assigned: task.status === "Assigned"
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error fetching assigned campaigns:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskSearchChange = (event) => {
    setTaskSearch(event.target.value);
  };

  const handleViewTask = async (task) => {
    setLoadingTaskId(task.id); // Start loading for this task

    try {
      // Simulate API call or navigation
      // For actual navigation, use: navigate(`/freelancer/view-tasks/${task.startupId}/${task.id}`);
      setTimeout(() => {
        navigate(`/freelancer/view-tasks/${task.startupId}/${task.id}`);
      }, 1000); // Simulating delay for demonstration
    } catch (error) {
      console.error("Error viewing task:", error);
    } finally {
      setLoadingTaskId(null); // Stop loading after task is viewed
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(taskSearch.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4, maxWidth: 900, margin: "auto" }}>
      <TextField
        fullWidth
        placeholder="Search task by name..."
        variant="outlined"
        onChange={handleTaskSearchChange}
        sx={{ marginBottom: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <List disablePadding>
          {filteredTasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  padding: 2,
                  "&:hover": { backgroundColor: "#f9f9f9" }
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {task.name}
                </Typography>
                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 1 }}>
                  <ListItemIcon>
                    <EventIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="body2">Start Date: {task.startDate}</Typography>

                  <ListItemIcon>
                    <MonetizationOnIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="body2">Prize: {task.prize} ETH</Typography>

                  <ListItemIcon>
                    {task.assigned ? (
                      <AssignmentTurnedInIcon fontSize="small" color="success" />
                    ) : (
                      <NotInterestedIcon fontSize="small" color="error" />
                    )}
                  </ListItemIcon>
                  <Typography
                    variant="body2"
                    sx={{ color: task.assigned ? "green" : "red" }}
                  >
                    {task.assigned ? "Assigned" : "Not Assigned"}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="small"
                  endIcon={<ArrowForwardIosIcon />}
                  sx={{
                    backgroundColor: "#252526",
                    color: "#fff",
                    marginTop: 1,
                    "&:hover": {
                      backgroundColor: "#3a3a3a"
                    }
                  }}
                  onClick={() => handleViewTask(task)}
                  disabled={loadingTaskId === task.id} // Disable button while loading
                >
                  {loadingTaskId === task.id ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "View Task"
                  )}
                </Button>
              </ListItem>

              {index < filteredTasks.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}


// import { Box } from "@mui/system";
// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   InputAdornment,
//   Button,
//   Typography,
//   List,
//   ListItem,
//   ListItemIcon,
//   Divider,
//   Paper,
//   CircularProgress
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import EventIcon from "@mui/icons-material/Event";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import NotInterestedIcon from "@mui/icons-material/NotInterested";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useNavigate } from "react-router-dom";

// export default function Tasks() {
//   const [tasks, setTasks] = useState([]);
//   const [taskSearch, setTaskSearch] = useState("");
//   const [loadingTaskId, setLoadingTaskId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/api/freelancer/assigned-campaigns", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//           }
//         });

//         const data = await response.json();
//         const formattedTasks = data.map((task) => ({
//           id: task.campaignId,
//           startupId: task.startupId,
//           name: task.name,
//           startDate: task.start_date,
//           prize: task.prize,
//           assigned: task.status === "Assigned"
//         }));
//         setTasks(formattedTasks);
//       } catch (error) {
//         console.error("Error fetching assigned campaigns:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const handleTaskSearchChange = (event) => {
//     setTaskSearch(event.target.value);
//   };

//   const handleViewTask = async (task) => {
//     setLoadingTaskId(task.id); // Start loading for this task

//     try {
//       setTimeout(() => {
//         navigate(`/freelancer/view-tasks/${task.startupId}/${task.id}`);
//       }, 1000); // Simulating delay for demonstration
//     } catch (error) {
//       console.error("Error viewing task:", error);
//     } finally {
//       setLoadingTaskId(null); // Stop loading after task is viewed
//     }
//   };

//   const filteredTasks = tasks.filter((task) =>
//     task.name.toLowerCase().includes(taskSearch.toLowerCase())
//   );

//   return (
//     <Box sx={{ padding: 4, maxWidth: 900, margin: "auto", backgroundColor: "#1c1c1c", borderRadius: 3 }}>
//       <TextField
//         fullWidth
//         placeholder="Search task by name..."
//         variant="outlined"
//         onChange={handleTaskSearchChange}
//         sx={{
//           marginBottom: 3,
//           backgroundColor: "#2c2c2c",
//           borderRadius: 2,
//           input: {
//             color: "#fff",
//           },
//           "& .MuiOutlinedInput-root": {
//             fieldset: {
//               borderColor: "#444",
//             },
//           },
//         }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon sx={{ color: "#fff" }} />
//             </InputAdornment>
//           ),
//         }}
//       />

//       <Paper elevation={3} sx={{ borderRadius: 3, backgroundColor: "#2a2a2a" }}>
//         <List disablePadding>
//           {filteredTasks.map((task, index) => (
//             <React.Fragment key={task.id}>
//               <ListItem
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "start",
//                   padding: 3,
//                   "&:hover": {
//                     backgroundColor: "#3b3b3b",
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                     cursor: "pointer",
//                   },
//                 }}
//               >
//                 <Typography variant="h6" sx={{ fontWeight: "bold", color: "#00c9b4", mb: 1 }}>
//                   {task.name}
//                 </Typography>
//                 <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 1 }}>
//                   <ListItemIcon>
//                     <EventIcon fontSize="small" sx={{ color: "#fff" }} />
//                   </ListItemIcon>
//                   <Typography variant="body2" sx={{ color: "#fff" }}>Start Date: {task.startDate}</Typography>

//                   <ListItemIcon>
//                     <MonetizationOnIcon fontSize="small" sx={{ color: "#fff" }} />
//                   </ListItemIcon>
//                   <Typography variant="body2" sx={{ color: "#fff" }}>Prize: {task.prize} ETH</Typography>

//                   <ListItemIcon>
//                     {task.assigned ? (
//                       <AssignmentTurnedInIcon fontSize="small" color="success" />
//                     ) : (
//                       <NotInterestedIcon fontSize="small" color="error" />
//                     )}
//                   </ListItemIcon>
//                   <Typography
//                     variant="body2"
//                     sx={{ color: task.assigned ? "green" : "red" }}
//                   >
//                     {task.assigned ? "Assigned" : "Not Assigned"}
//                   </Typography>
//                 </Box>

//                 <Button
//                   variant="contained"
//                   size="small"
//                   endIcon={<ArrowForwardIosIcon />}
//                   sx={{
//                     backgroundColor: "#00c9b4",
//                     color: "#fff",
//                     marginTop: 1,
//                     "&:hover": {
//                       backgroundColor: "#00b3a4",
//                     },
//                     "&.Mui-disabled": {
//                       backgroundColor: "#444",
//                     },
//                   }}
//                   onClick={() => handleViewTask(task)}
//                   disabled={loadingTaskId === task.id}
//                 >
//                   {loadingTaskId === task.id ? (
//                     <CircularProgress size={24} color="inherit" />
//                   ) : (
//                     "View Task"
//                   )}
//                 </Button>
//               </ListItem>

//               {index < filteredTasks.length - 1 && <Divider sx={{ borderColor: "#444" }} />}
//             </React.Fragment>
//           ))}
//         </List>
//       </Paper>
//     </Box>
//   );
// }

