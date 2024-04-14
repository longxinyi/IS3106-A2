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
    <div>
      <img
        src="organiserPic.jpeg"
        className="w-full min-w-2.5 h-96"
        alt="organiserPic"
      ></img>
      <div className="p-10 flex flex-col gap-5">
        <Typography variant="h5" className="text-black font-bold">
          Your Created Events
        </Typography>

        <div className="flex flex-row justify-evenly">
          <OutlinedInput
            className="h-6 rounded-full text-black bg-offwhite p-5"
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
            sx={{
              ml: 1,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "#3659E3",
              },
            }}
            className="bg-blue text-white rounded-full"
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
            <div className="flex flex-wrap flex-row">
              {filteredEvents.map((event) => (
                <div>
                  <Box className="min-w-fit flex flex-col m-8 w-1/2 transition-transform ease-in-out duration-300 transform-gpu hover:-translate-y-2 hover:translate-z-2 hover:rotate-x-3 hover:shadow-md rounded-lg p-5 bg-offwhite">
                    <Box>place for picture</Box>
                    <Typography variant="button" className="font-bold">
                      {event.name}
                    </Typography>
                    <Typography variant="button">
                      {event.description}
                    </Typography>
                    <Typography variant="button">
                      {event.dateOfEvent}
                    </Typography>
                    <Typography variant="button">{event.location}</Typography>
                    <div className="mt-5 flex flex-row">
                      <Button
                        sx={{
                          ml: 1,
                          "&.MuiButtonBase-root:hover": {
                            bgcolor: "#3659E3",
                          },
                        }}
                        className="bg-blue text-white font-bold min-w-fit"
                        onClick={() =>
                          router.push(`/organiser/event/${event.id}`)
                        }
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
                    </div>
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
                        This step is irreversible and you will lose all data
                        about this event.
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
    </div>
  );
};

export default Index;
