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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axiosClient from "@/components/helpers/axiosClient";

const Index = () => {
  const router = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [createdEvents, setCreatedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(createdEvents);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getAllCreatedEvents(userId);
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const getAllCreatedEvents = async (userId) => {
    try {
      await axiosClient.get(`/events`).then((res) => {
        setCreatedEvents(res.data);
        setFilteredEvents(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSearch = (e) => {
    if (e.target.value == "") {
      setFilteredEvents(createdEvents);
    }
    setSearchValue(e.target.value);
    const filteredEvents = createdEvents.filter((event) =>
      event.name.includes(e.target.value)
    );
    setFilteredEvents(filteredEvents);
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
          value={searchValue}
          onChange={handleOnSearch}
        />
        <Divider orientation="vertical" flexItem />
        <Button
          className="bg-orange text-white rounded-full"
          onClick={() => router.push("/organiser/createNewEvent")}
          variant="contained"
          endIcon={<AddIcon />}
        >
          Create New Event
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center p-5">
        {filteredEvents.length < 1 ? (
          <div className="flex flex-col justify-center items-center">
            <CalendarMonthIcon />

            <Typography variant="subtitle1" className="text-grey">
              No events to show
            </Typography>
          </div>
        ) : (
          <div className="flex flex-wrap gap-10">
            {filteredEvents.map((event) => (
              <div>
                <Box
                  className="p-10 flex flex-col min-w-fit h-min border-black border-solid border-2"
                  sx={{ ":hover": { boxShadow: "3px 3px 3px 3px blue" } }}
                >
                  <Box>place for picture</Box>
                  <Typography variant="h6" className="font-bold">
                    {event.name}
                  </Typography>
                  <Typography variant="body1">{event.description}</Typography>
                  <Typography variant="body1">{event.dateOfEvent}</Typography>
                  <Typography variant="body1">{event.location}</Typography>
                  <Button
                    onClick={() => router.push(`/organiser/event/${event.id}`)}
                  >
                    Manage Attendance
                  </Button>
                  <Button
                    className="bg-orange text-white font-bold"
                    onClick={handleClickOpen}
                    sx={{
                      ml: 1,
                      "&.MuiButtonBase-root:hover": {
                        bgcolor: "#D1410C",
                      },
                    }}
                  >
                    Delete Event
                  </Button>
                </Box>
                <Dialog
                  open={openDialog}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Are you sure?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      This step is irreversible and you will lose all data about
                      this event.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setOpenDialog(false)}
                      autoFocus
                      className="bg-orange text-white font-bold"
                      sx={{
                        ml: 1,
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "#D1410C",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleClose}
                      className="bg-orange text-white font-bold"
                      sx={{
                        ml: 1,
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "#D1410C",
                        },
                      }}
                    >
                      Proceed
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
