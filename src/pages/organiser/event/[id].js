import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from "@mui/material";
import axiosClient from "@/components/helpers/axiosClient";

const ManageAttendance = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentEventAttendees, setCurrentEventAttendees] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [attendance, setAttendance] = useState("unattend");

  const retrieveEventById = async () => {
    try {
      await axiosClient.get(`/events/${id}`).then((res) => {
        setCurrentEventAttendees(res.data.listOfAttendees);
        console.log(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeAttendance = (attendeeId) => async (e) => {
    const action = e.target.value;
    try {
      await axiosClient
        .post(`/attendee/${attendeeId}/${action}/${id}`)
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAttendedEvents = async (userId) => {
    try {
      await axiosClient.get(`/attendee/profile/${userId}`).then((res) => {
        const listOfAttendedEvents = res.data.listOfAttendedEvents;
        const attendedEventsId = listOfAttendedEvents.map((e) => e.id);
        return attendedEventsId;
        //setAttendance([...attendance, { [userId]: attendedEventsId }]);
        //console.log(attendance);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfPresent = (userId) => () => {
    getAllAttendedEvents(userId).then((res) => {
      console.log("this ran");
      if (res.includes(id)) {
        return "attend";
      }
      return "unattend";
    });
  };

  useEffect(() => {
    retrieveEventById();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [showPopup]);

  return (
    <div className="p-20">
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

            <ToggleButtonGroup
              value={attendance}
              exclusive
              //onChange={onChangeAttendance(attendee.id)}
              onChange={(e) => {
                setAttendance(e.target.value);
                setShowPopup(true);
              }}
            >
              <ToggleButton value="attend">Present</ToggleButton>
              <ToggleButton value="unattend">Absent</ToggleButton>
            </ToggleButtonGroup>
          </div>
        ))
      ) : (
        <Typography variant="subtitle1" className="text-grey">
          No registered attendees
        </Typography>
      )}
    </div>
  );
};

export default ManageAttendance;
