import {
  Button,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Index() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col p-10 w-screen gap-3 ">
      <Typography
        variant="h4"
        className="text-orange font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        eventbrite
      </Typography>
      <h4>Log In</h4>
      <TextField placeholder="Email address" variant="outlined" />
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
      <FormControl className="pl-5 p-3 gap-2">
        <Typography variant="body2">I'm an: </Typography>
        <ToggleButtonGroup
          value="attendee"
          exclusive
          //onChange={handleAlignment}
        >
          <ToggleButton value="attendee">Attendee</ToggleButton>
          <ToggleButton value="organiser">Organiser</ToggleButton>
        </ToggleButtonGroup>
      </FormControl>
      <Button
        className="bg-orange font-semibold text-white"
        sx={{
          ml: 1,
          "&.MuiButtonBase-root:hover": {
            bgcolor: "#D1410C",
          },
        }}
      >
        Log In
      </Button>
      <div className="flex flex-row gap-2">
        <p>Don't have an account?</p>
        <button
          className="font-bold text-blue"
          onClick={() => router.push("/signup")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
