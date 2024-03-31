import {
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  TextField,
  Input,
  InputAdornment,
} from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { useRouter } from "next/router";
import { useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Index = () => {
  const router = useRouter();

  const [checked, setChecked] = useState([false, false, false]);

  const handleOpenTabs = (number) => () => {
    const prevState = checked[number];
    if (number == 0) {
      setChecked([!prevState, checked[1], checked[2]]);
    } else if (number == 1) {
      setChecked([checked[0], !prevState, checked[2]]);
    } else if (number == 2) {
      setChecked([checked[0], checked[1], !prevState]);
    }
  };
  return (
    <div className="pl-44 pr-44 pt-5 pb-5">
      <Typography
        variant="button"
        className="text-blue cursor-pointer"
        onClick={() => router.push("/organiser")}
      >
        <ChevronLeftOutlinedIcon />
        Back to Events
      </Typography>

      <div className="p-6 flex flex-col gap-10">
        <div>
          <Typography variant="subtitle1" className="font-bold">
            Build your event page
          </Typography>
          <Typography variant="body1">
            Add all of your event details and let attendees know what to expect
          </Typography>
        </div>
        <div className="pl-10 pr-10 flex flex-col gap-5">
          <Collapse in={checked[0]} collapsedSize={60}>
            <Box
              className={`${
                checked[0] ? "border-blue border-solid border-2" : ""
              }  w-full h-96 bg-offwhite text-blue pl-5 pr-5 pt-5 pb-5 flex flex-col justify-between`}
            >
              <div
                className="flex flex-row justify-center font-bold gap-2 w-full"
                onClick={handleOpenTabs(0)}
              >
                <FileUploadOutlinedIcon /> Upload photos of your event
                {checked[0] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>
              <label htmlFor="contained-button-file">
                <Button
                  variant="text"
                  component="span"
                  className="border-blue border-dashed border-2 w-full h-20"
                >
                  Select Image
                  <input
                    accept="image/*"
                    className="hidden"
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                </Button>
              </label>
            </Box>
          </Collapse>
          <Collapse in={checked[1]} collapsedSize={64}>
            <Box
              className={`${
                checked[1] ? "border-blue border-solid border-2" : ""
              }  w-full h-min bg-offwhite text-black pl-5 pr-5 pt-5 pb-5 flex flex-col`}
            >
              <div
                className="flex flex-row justify-start font-bold gap-2 w-full"
                onClick={handleOpenTabs(1)}
              >
                <Typography variant="h6" className="font-bold">
                  Event Overview
                </Typography>
                {checked[1] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>
              <div className="mt-16 gap-10 flex flex-col">
                <div className="gap-5 flex flex-col">
                  <div>
                    <Typography variant="subtitle1">Event Title</Typography>
                    <Typography variant="caption">
                      Be clear and descriptive with a title that tells people
                      what your event is about.
                    </Typography>
                  </div>
                  <TextField variant="outlined" label="Event title" />
                </div>
                <div className="gap-5 flex flex-col">
                  <div>
                    <Typography variant="subtitle1">Summary</Typography>
                    <Typography variant="caption">
                      Grab people's attention with a short description about
                      your event. Attendees will see this at the top of your
                      event page. (140 characters max)
                    </Typography>
                  </div>

                  <TextField
                    variant="outlined"
                    label="Event Description"
                    multiline
                  />
                </div>
              </div>
            </Box>
          </Collapse>
          <Collapse in={checked[2]} collapsedSize={64}>
            <Box
              className={`${
                checked[2] ? "border-blue border-solid border-2" : ""
              }  w-full h-min bg-offwhite text-black pl-5 pr-5 pt-5 pb-5 flex flex-col justify-between`}
            >
              <div
                className="flex flex-row justify-start font-bold gap-2 w-full"
                onClick={handleOpenTabs(2)}
              >
                <Typography variant="h6" className="font-bold">
                  Date and Location
                </Typography>
                {checked[2] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>
              <div className="mt-16 gap-10 flex flex-col">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Date" disablePast />
                </LocalizationProvider>
                <TextField
                  label="Location"
                  variant="outlined"
                  InputProps={{
                    startAdornment: <LocationOnIcon />,
                  }}
                />
              </div>
            </Box>
          </Collapse>
        </div>
        <Button
          className="bg-orange text-white font-bold"
          sx={{
            ml: 1,
            "&.MuiButtonBase-root:hover": {
              bgcolor: "#D1410C",
            },
          }}
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default Index;
