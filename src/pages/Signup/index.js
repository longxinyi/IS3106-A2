import {
  Button,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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
    <div className="flex flex-col p-10 w-screen gap-3">
      <Typography
        variant="h4"
        className="text-orange font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        eventbrite
      </Typography>
      <h4>Create an account</h4>
      <TextField placeholder="Name" variant="outlined" />
      <TextField placeholder="Phone" variant="outlined" />
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
      <FormControl className="pl-5 p-3">
        <FormLabel>I'm an: </FormLabel>
        <RadioGroup defaultValue="attendee" row>
          <FormControlLabel
            value="attendee"
            control={<Radio />}
            label="Attendee"
          />
          <FormControlLabel
            value="organiser"
            control={<Radio />}
            label="Organiser"
          />
        </RadioGroup>
      </FormControl>
      <Button className="bg-orange font-semibold text-white">Sign Up</Button>
      <div className="flex flex-row gap-2">
        <p>Already have an account?</p>
        <button
          className="font-bold text-blue"
          onClick={() => router.push("/Login")}
        >
          Log In
        </button>
      </div>
    </div>
  );
}
