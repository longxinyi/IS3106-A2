import { useRouter } from "next/router";
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Input,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewProfile = () => {
    handleClose();
    router.push("/organiser/profile");
  };
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <div className="w-screen sticky top-0 flex flex-row justify-between p-4">
      <Typography
        variant="h5"
        className="text-orange font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        eventbrite
      </Typography>
      <Input
        className="h-6"
        placeholder="Search events"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />

      <div className="flex flex-row gap-3">
        <Button
          onClick={() => router.push("/signup")}
          variant="text"
          className="bg-transparent text-black"
        >
          Sign Up
        </Button>
        <Button
          onClick={() => router.push("/login")}
          variant="text"
          className="bg-transparent text-black"
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
