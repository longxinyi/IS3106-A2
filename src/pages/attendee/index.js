import {
  Typography,
  OutlinedInput,
  InputAdornment,
  Divider,
  TextField,
  Box,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axiosClient from "@/components/helpers/axiosClient";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(allEvents);
  const [searchValue, setSearchValue] = useState("");
  const [userRegisteredEvents, setUserRegisteredEvents] = useState([]);
  //const [category, setCategory] = useState("allEvents");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getAllEvents();
    getAllRegisteredEvents(userId);
  }, []);

  const getAllEvents = async () => {
    try {
      await axiosClient.get(`/events`).then((res) => {
        setAllEvents(res.data);
        setFilteredEvents(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSearch = (e) => {
    if (e.target.value == "") {
      setFilteredEvents(allEvents);
    }
    setSearchValue(e.target.value);
    const filteredEvents = allEvents.filter((event) =>
      event.name.includes(e.target.value)
    );
    setFilteredEvents(filteredEvents);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const filterOptions = [
    { value: "allEvents", label: "All Events" },
    { value: "registeredEvents", label: "Registered Events" },
  ];

  const getAllRegisteredEvents = async (userId) => {
    try {
      await axiosClient.get(`/attendee/profile/${userId}`).then((res) => {
        const listOfRegisteredEvents = res.data.listOfRegisteredEvents;
        const registeredEventsId = listOfRegisteredEvents.map((e) => e.id);
        setUserRegisteredEvents(registeredEventsId);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const registerEvent = async (eventId) => {
    const userId = localStorage.getItem("userId");
    try {
      await axiosClient.post(`/attendee/${userId}/register/${eventId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onRegisterEvent = (eventId) => {
    const userId = localStorage.getItem("userId");
    registerEvent(eventId);
    getAllRegisteredEvents(userId);
  };

  const handleUnregister = async (eventId) => {
    const userId = localStorage.getItem("userId");
    try {
      await axiosClient.post(`/attendee/${userId}/unregister/${eventId}`);
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  const onChangeCategory = (e) => {
    const userId = localStorage.getItem("userId");
    if (e.target.value == "allEvents") {
      setFilteredEvents(allEvents);
    } else {
      const registeredEvents = allEvents.filter((event) =>
        event.listOfAttendees.some((attendee) => attendee.id == userId)
      );
      setFilteredEvents(registeredEvents);
    }
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
        <TextField
          select
          defaultValue="allEvents"
          className="bg-buttonBlue w-52"
          onChange={onChangeCategory}
          //value={category}
        >
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <div className="text-black ">{option.label}</div>
            </MenuItem>
          ))}
        </TextField>
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
                <Box className="p-10 flex flex-col min-w-fit h-min border-black border-solid border-2">
                  <Box>place for picture</Box>
                  <Typography variant="h6" className="font-bold">
                    {event.name}
                  </Typography>
                  <Typography variant="body1">{event.date}</Typography>
                  <Typography variant="body1">{event.location}</Typography>
                  {userRegisteredEvents.includes(event.id) ? (
                    <div>
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
                        Unregister
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          Unregister from this event?
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            You will no longer receive notifications for this
                            event. You are also not guaranteed to have a spot
                            should you choose to register again.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => setOpen(false)}
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
                            onClick={() => handleUnregister(event.id)}
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
                  ) : (
                    <Button
                      className="bg-orange text-white font-bold"
                      sx={{
                        ml: 1,
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "#D1410C",
                        },
                      }}
                      onClick={() => onRegisterEvent(event.id)}
                    >
                      Register
                    </Button>
                  )}
                </Box>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
