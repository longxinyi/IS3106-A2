import { useRouter } from "next/router";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const OrganiserNavBar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOnLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("userId");
    router.push("/");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewProfile = () => {
    handleClose();
    router.push("/organiser/profile");
  };

  return (
    <div className="w-screen sticky top-0 flex flex-row justify-between p-4 bg-white">
      <Typography
        variant="h5"
        className="text-orange font-bold cursor-pointer"
        onClick={() => router.push("/organiser")}
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
          className="gap-1 flex flex-row text-black font-bold bg-transparent"
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
          <MenuItem onClick={handleOnLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default OrganiserNavBar;
