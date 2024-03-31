import {
  Typography,
  Input,
  InputAdornment,
  TextField,
  OutlinedInput,
  Button,
  MenuItem,
  IconButton,
  Divider,
  Box,
  Drawer,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useRouter } from "next/router";
import { useState } from "react";

let DUMMY_EVENTS = [
  {
    picture: "",
    name: "Taylor Swift",
    location: "Singapore",
    description: "Eras Tour 2024",
    date: "02/04/2024",
    registrationDeadline: "03/04/2024",
    registeredAttendees: [
      { name: "xinyi", present: false },
      { name: "yuri", present: false },
    ],
  },
  {
    picture: "",
    name: "Jap food",
    location: "Singapore",
    description: "2024",
    date: "02/04/2024",
    registrationDeadline: "03/04/2024",
    registeredAttendees: [
      { name: "xinyi", present: false },
      { name: "kenneth", present: false },
    ],
  },
];

const Index = () => {
  const router = useRouter();
  const filterOptions = [
    { value: "allEvents", label: "All Events" },
    { value: "upcomingEvents", label: "Upcoming Events" },
    { value: "pastEvents", label: "Past Events" },
  ];
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="p-10 flex flex-col gap-5">
      <Typography variant="h5" className="text-black font-bold">
        Events
      </Typography>
      <div className="flex flex-row justify-evenly">
        <OutlinedInput
          className="h-6 p-5"
          placeholder="Search events"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <Divider orientation="vertical" flexItem />
        <TextField
          select
          defaultValue="allEvents"
          className="bg-buttonBlue rounded-full text-black border-transparent"
        >
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <div className="text-white">{option.label}</div>
            </MenuItem>
          ))}
        </TextField>
        <IconButton onClick={() => router.push("/organiser/createNewEvent")}>
          <AddIcon className="bg-orange text-white rounded-full" />
        </IconButton>
      </div>
      <div className="flex flex-col justify-center items-center p-5">
        {DUMMY_EVENTS.length < 1 ? (
          <div className="flex flex-col justify-center items-center">
            <CalendarMonthIcon />

            <Typography variant="subtitle1" className="text-grey">
              No events to show
            </Typography>
          </div>
        ) : (
          <div className="flex flex-wrap gap-10">
            {DUMMY_EVENTS.map((event) => (
              <div>
                <Box
                  className="p-10 flex flex-col min-w-fit h-min border-black border-solid border-2"
                  sx={{ ":hover": { boxShadow: "3px 3px 3px 3px blue" } }}
                >
                  <Box>place for picture</Box>
                  <Typography variant="h6" className="font-bold">
                    {event.name}
                  </Typography>
                  <Typography variant="body1">{event.date}</Typography>
                  <Typography variant="body1">{event.location}</Typography>
                  <Button onClick={toggleDrawer(true)}>
                    Manage Attendance
                  </Button>
                </Box>
                <Drawer
                  open={open}
                  onClose={toggleDrawer(false)}
                  anchor="right"
                >
                  <div className="flex flex-col gap-5 p-10">
                    <Typography variant="h5" className="font-bold">
                      Mark Attendance
                    </Typography>
                    {event.registeredAttendees.map((attendee) => (
                      <div className="flex flex-row gap-3 justify-between items-center">
                        <Typography variant="body1">{attendee.name}</Typography>
                        <ToggleButtonGroup
                          value={attendee.present}
                          exclusive
                          //onChange={handleAlignment}
                        >
                          <ToggleButton value={true}>Present</ToggleButton>
                          <ToggleButton value={false}>Absent</ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                    ))}
                  </div>
                </Drawer>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
