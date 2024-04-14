import {
  Typography,
  Button,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import axiosClient from "@/components/helpers/axiosClient";
import Error from "@/components/Error";
import ImageHandler from "@/components/ImageHandling";

const Index = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [noAccess, setNoAccess] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("userId") == null ||
      localStorage.getItem("userType") !== "organiser"
    ) {
      setNoAccess(true);
    }
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [userId, setUserId] = useState("");
  const [errorMsgs, setErrorMsgs] = useState("");

  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    profilePic: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    retrieveUserProfile(userId);
  }, []);

  const retrieveUserProfile = async (userId) => {
    try {
      await axiosClient.get(`/organiser/profile/${userId}`).then((res) => {
        setUserDetails(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeField = (field) => (e) => {
    if (field == "profilePic") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails({
          ...userDetails,
          profilePic: reader.result,
        });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
      return;
    }

    setUserDetails({
      ...userDetails,
      [field]: e.target.value,
    });
  };

  const validateFields = () => {
    let hasError = false;
    const { name, phone, email, password } = userDetails;
    let newErrorMsg = "";

    if (name.length < 1) {
      hasError = true;
      newErrorMsg = newErrorMsg + "Name, ";
    }

    if (phone.length < 8) {
      hasError = true;
      newErrorMsg = newErrorMsg + "Phone, ";
    }

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

  const onUpdateProfile = async () => {
    const hasError = validateFields();
    if (!hasError) {
      try {
        await axiosClient
          .post(`/organiser/updateProfile`, { ...userDetails, id: userId })
          .then((res) => setUserDetails(res.data));
        router.push("/organiser");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (noAccess == true) {
    return <Error />;
  }

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
          {errorMsgs.length > 0 && (
            <Alert severity="warning">
              Holy guacamole! You should check on these field(s):
              <strong> {errorMsgs.substring(0, errorMsgs.length - 2)}</strong>
            </Alert>
          )}
          <div>
            <Typography variant="h6" className="font-bold">
              Profile Photo
            </Typography>
            <ImageHandler localStorageName="organiser"></ImageHandler>
          </div>
          <div>
            <Typography variant="h6" className="font-bold">
              Details
            </Typography>
            <div className="flex flex-col gap-5">
              <TextField
                label="Name"
                variant="outlined"
                value={userDetails.name}
                onChange={onChangeField("name")}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={userDetails.email}
                onChange={onChangeField("email")}
              />
              <TextField
                label="Phone"
                variant="outlined"
                value={userDetails.phone}
                onChange={onChangeField("phone")}
              />
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={userDetails.password}
                onChange={onChangeField("password")}
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
          onClick={onUpdateProfile}
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default Index;
