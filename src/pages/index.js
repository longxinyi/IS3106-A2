import { Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import NavBar from "@/components/NavBar";

const DEFAULT_EVENTS = [
  {
    name: "Sustainability Symposium 2024: Existential Solutions",
    dateOfEvent: "Thursday 12:00PM SGT",
    description: "From $30.00 By Green Builder Media",
    picURL: "symposium.jpeg",
  },
  {
    name: "SCA Gala Concert 2024 - Our Voices, Our Songs",
    dateOfEvent: "Today 5:00PM SGT",
    description: "From $24.00 By Singapore Choral Artists",
    picURL: "galaConcert.jpeg",
  },
  {
    name: "Dine With Strangers: AI Matching You with Perfect Strangers!",
    dateOfEvent: "Wed, Apr 24 8:00PM SGT",
    description: "From $17.32 By Kult Yard",
    picURL: "dining.jpeg",
  },
  {
    name: "Holiday Crafty Camp",
    dateOfEvent: "Thurs 2:00PM SGT",
    description: "From $80.00 By Study House Academy",
    picURL: "craft.jpeg",
  },
];

export default function Index() {
  const [filteredEvents, setFilteredEvents] = useState(DEFAULT_EVENTS);
  const [searchValue, setSearchValue] = useState("");
  const onSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value == "") {
      setFilteredEvents(DEFAULT_EVENTS);
      return;
    }
    const newFilteredEvents = filteredEvents.filter(
      (event) =>
        event.name.toLowerCase().includes(e.target.value) ||
        event.description.toLowerCase().includes(e.target.value)
    );
    setFilteredEvents(newFilteredEvents);
  };
  return (
    <div>
      <NavBar searchValue={searchValue} onChange={onSearch}></NavBar>
      <div className="flex flex-col p-10 w-screen gap-10">
        <div className="w-full min-w-2.5">
          <img src="eventbriteLogo.png" alt="eventbrite logo"></img>
        </div>
        <div className="flex flex-col">
          <Typography variant="h6" className="font-bold">
            Current Events in Singapore
          </Typography>
          <div className="flex-wrap flex flex-row">
            {filteredEvents.map((event) => (
              <Tooltip title="Login or Sign up to view more details!">
                <div className="flex flex-col m-8 w-1/3 transition-transform ease-in-out duration-300 transform-gpu hover:-translate-y-2 hover:translate-z-2 hover:rotate-x-3 hover:shadow-md rounded-lg p-5">
                  <img
                    src={event.picURL}
                    alt="defaultPic"
                    className="min-h-0.5 min-w-0.5"
                  ></img>
                  <Typography variant="button" className="font-bold">
                    {event.name}
                  </Typography>
                  <Typography variant="button">{event.dateOfEvent}</Typography>
                  <Typography variant="button">{event.description}</Typography>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
