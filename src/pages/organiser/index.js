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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useRouter } from "next/router";

const DUMMY_EVENTS = [];

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
          <p>display events</p>
        )}
      </div>
    </div>
  );
};

export default Index;
