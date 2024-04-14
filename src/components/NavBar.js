import { useRouter } from "next/router";
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Input,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = ({ onChange, searchValue }) => {
  const router = useRouter();

  return (
    <div className="w-screen sticky top-0 flex flex-row justify-between p-4 bg-white items-center">
      <Typography
        variant="h5"
        className="text-orange font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        eventbrite
      </Typography>
      <OutlinedInput
        className="h-6 rounded-full text-black bg-offwhite p-5"
        placeholder="Search events"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        value={searchValue}
        onChange={onChange}
      />

      <div className="flex flex-row gap-3">
        <Button
          onClick={() => router.push("/signup")}
          variant="text"
          className="bg-transparent text-black font-bold"
        >
          Sign Up
        </Button>
        <Button
          onClick={() => router.push("/login")}
          variant="text"
          className="bg-transparent text-black font-bold"
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
