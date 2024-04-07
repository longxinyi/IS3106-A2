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

const OrganiserNavBar = () => {
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
    <div className="w-screen sticky top-0 flex flex-row justify-between p-4 bg-white">
      <Typography
        variant="h5"
        className="text-orange font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        eventbrite
      </Typography>

      <div>
        <Button
          variant="text"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="gap-1 flex flex-row text-black bg-transparent"
        >
          <AccountCircleIcon /> Profile
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={viewProfile}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default OrganiserNavBar;
