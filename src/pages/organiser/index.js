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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useRouter } from "next/router";

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
      { name: "yuri", present: false },
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
              <Box
                className="p-10 flex flex-col w-1/3 h-min border-black border-solid border-2"
                sx={{ ":hover": { boxShadow: "3px 3px 3px 3px blue" } }}
              >
                <Box>place for picture</Box>
                <Typography variant="h6" className="font-bold">
                  {event.name}
                </Typography>
                <Typography variant="body1">{event.date}</Typography>
                <Typography variant="body1">{event.location}</Typography>
              </Box>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
