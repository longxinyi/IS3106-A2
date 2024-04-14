import { Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import ImageHandler from "./ImageHandling";

const Error = () => {
  const router = useRouter();
  return (
    <div className="z-50 absolute p-10 gap-5 flex flex-col w-full h-full bg-white top-0">
      <Typography
        variant="h5"
        className="text-orange font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        eventbrite
      </Typography>
      <Typography variant="h6" className="text-black font-bold">
        Oops! You do not have access to this page. <br></br> Try visiting our
        <Button
          variant="text"
          className="text-blue font-black"
          onClick={() => router.push("/")}
        >
          homepage
        </Button>
        instead.
      </Typography>
    </div>
  );
};

export default Error;
