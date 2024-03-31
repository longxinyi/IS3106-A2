import {
  Typography,
  Button,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="pl-44 pr-44 pt-5 pb-5">
      <Typography
        variant="button"
        className="text-blue cursor-pointer"
        onClick={() => router.push("/organiser")}
      >
        <ChevronLeftOutlinedIcon />
        Back to Home
      </Typography>
      <div className="p-6 flex flex-col gap-5">
        <Typography variant="h5" className="font-bold">
          Account Information
        </Typography>
        <div className="flex flex-col gap-10">
          <div>
            <Typography variant="h6" className="font-bold">
              Profile Photo
            </Typography>
            <label htmlFor="contained-button-file">
              <Button
                variant="text"
                component="span"
                className="border-blue border-dashed border-2 w-full h-20 gap-3"
              >
                <AddAPhotoIcon /> Add a profile image
                <input
                  accept="image/*"
                  className="hidden"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
              </Button>
            </label>
          </div>
          <div>
            <Typography variant="h6" className="font-bold">
              Details
            </Typography>
            <div className="flex flex-col gap-5">
              <TextField label="Name" variant="outlined" />
              <TextField label="Email" variant="outlined" />
              <TextField label="Phone" variant="outlined" />
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Password"
              />
            </div>
          </div>
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
