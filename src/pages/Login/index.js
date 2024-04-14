import {
  Button,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  FormControl,
  ToggleButtonGroup,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useRouter } from "next/router";
import axiosClient from "@/components/helpers/axiosClient";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";

const ToggleButton = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#3659E3",
  },
});

export default function Index() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState("attendee");
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  const [errorMsgs, setErrorMsgs] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const onChangeField = (field) => (e) => {
    setFormDetails({
      ...formDetails,
      [field]: e.target.value,
    });
  };

  const validateFields = () => {
    let hasError = false;
    const { email, password } = formDetails;
    let newErrorMsg = "";

    if (email.length < 1 || !email.includes("@")) {
      hasError = true;
      newErrorMsg = newErrorMsg + "Email, ";
    }

    const pattern = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    if (
      password.length < 8 ||
      password.length > 20 ||
      !pattern.test(password)
    ) {
      hasError = true;
      newErrorMsg = newErrorMsg + "Password, ";
    }
    setErrorMsgs(newErrorMsg);
    return hasError;
  };

  const onLogin = async () => {
    const hasError = validateFields();
    if (!hasError) {
      //all fields are ok, we send data to BE
      //redirect to another page
      try {
        await axiosClient
          .post(
            `${userRole}/login`,
            //request body below
            formDetails
          )
          .then((response) => {
            localStorage.setItem("userId", response.data.id);
            localStorage.setItem("userType", userRole);
          });
        router.push(`/${userRole}`);
      } catch (error) {
        console.error(error);
        setSignUpError(
          "Something went wrong, did you enter the correct email? Or, try signing up."
        );
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col p-10 w-screen gap-3 ">
      <Typography
        variant="h4"
        className="text-orange font-bold cursor-pointer w-fit"
        onClick={() => router.push("/")}
      >
        eventbrite
      </Typography>
      <h4>Log In</h4>
      {errorMsgs.length > 0 && (
        <Alert severity="warning">
          Holy guacamole! You should check on these field(s):
          <strong> {errorMsgs.substring(0, errorMsgs.length - 2)}</strong>
        </Alert>
      )}
      {signUpError.length > 0 && <Alert severity="error">{signUpError}</Alert>}
      <TextField
        placeholder="Email address"
        variant="outlined"
        onChange={onChangeField("email")}
        value={formDetails.email}
      />
      <OutlinedInput
        onChange={onChangeField("password")}
        value={formDetails.password}
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
      <FormControl className="p-5 gap-5 flex flex-row items-center">
        <Typography variant="body2">I'm an: </Typography>
        <ToggleButtonGroup
          value={userRole}
          exclusive
          onChange={(e) => setUserRole(e.target.value)}
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
        onClick={onLogin}
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
