import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Typography, Alert, Button, Snackbar } from "@mui/material";
import axiosClient from "@/components/helpers/axiosClient";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import Error from "@/components/Error";

const ManageAttendance = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentEventAttendees, setCurrentEventAttendees] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [attendance, setAttendance] = useState({});
  const [noAccess, setNoAccess] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("userId") == null ||
      localStorage.getItem("userType") !== "organiser"
    ) {
      setNoAccess(true);
    }
  }, []);

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const retrieveEventById = async () => {
    try {
      await axiosClient.get(`/events/${id}`).then((res) => {
        const listOfAttendees = res.data.listOfAttendees;
        const constructDictObj = listOfAttendees.map((a) => {
          return { [a.id]: [] };
        });
        Object.assign({}, constructDictObj[0]);
        setCurrentEventAttendees(listOfAttendees);
        setAttendance(Object.assign({}, constructDictObj[0]));
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    retrieveEventById();
  }, []);

  useEffect(() => {
    currentEventAttendees.forEach((attendee) =>
      getAllAttendedEvents(attendee.id)
    );
  }, [currentEventAttendees]);

  const updateAttendance = async (attendeeId, action) => {
    try {
      await axiosClient.post(`/attendee/${attendeeId}/${action}/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeAttendance = (attendeeId) => (e) => {
    const action = e.target.value;
    updateAttendance(attendeeId, action);
    handleClickSnackbar();
    if (action == "attend") {
      const updateAttendance = [...attendance[attendeeId], Number(id)];

      setAttendance({ ...attendance, [attendeeId]: updateAttendance });
      return;
    }

    if (action == "unattend") {
      const updateAttendance = attendance[attendeeId].filter(
        (eId) => eId != Number(id)
      );
      setAttendance({ ...attendance, [attendeeId]: updateAttendance });
      return;
    }
  };

  const getAllAttendedEvents = async (userId) => {
    try {
      await axiosClient.get(`/attendee/profile/${userId}`).then((res) => {
        const listOfAttendedEvents = res.data.listOfAttendedEvents;
        const attendedEventsId = listOfAttendedEvents.map((e) => e.id);
        setAttendance({ ...attendance, [userId]: attendedEventsId });
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [showPopup]);

  if (noAccess == true) {
    return <Error />;
  }

  return (
    <div className="p-20 flex flex-col">
      <Typography
        variant="button"
        className="text-blue cursor-pointer mb-12"
        onClick={() => router.push("/organiser")}
      >
        <ChevronLeftOutlinedIcon />
        Back to Events
      </Typography>
      <div className="pl-6">
        <Typography variant="h5" className="font-bold">
          Mark Attendance
        </Typography>
        {showPopup && (
          <Alert variant="filled" severity="success">
            Attendance updated
          </Alert>
        )}
        {currentEventAttendees.length > 0 ? (
          currentEventAttendees.map((attendee) => (
            <div className="flex flex-row gap-3 justify-between items-center">
              <Typography variant="body1">{attendee.name}</Typography>

              {!attendance[attendee.id].includes(Number(id)) ? (
                <Button
                  className="bg-blue text-white font-bold"
                  onClick={onChangeAttendance(attendee.id)}
                  value="attend"
                  sx={{
                    ml: 1,
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "#3659E3",
                    },
                  }}
                >
                  Mark as Present
                </Button>
              ) : (
                <Button
                  className="bg-orange text-white font-bold"
                  onClick={onChangeAttendance(attendee.id)}
                  value="unattend"
                  sx={{
                    ml: 1,
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "#D1410C",
                    },
                  }}
                >
                  Mark as Absent
                </Button>
              )}
            </div>
          ))
        ) : (
          <Typography
            variant="subtitle1"
            className="text-grey flex flex-row items-center gap-3 pt-10"
          >
            <NoAccountsIcon />
            No registered attendees yet. Check back in soon!
          </Typography>
        )}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Registration Updated!"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </div>
  );
};

export default ManageAttendance;
