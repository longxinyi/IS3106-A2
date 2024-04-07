import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import OrganiserNavBar from "@/components/OrganiserNavBar";

export default function RootLayout({ children }) {
  const router = useRouter();
  const PUBLIC_PATHS = ["/"];
  const ORGANISER_PATHS = [
    "/organiser",
    "/organiser/createNewEvent",
    "/organiser/profile",
  ];
  const ATTENDEE_PATHS = ["/attendee"];
  // const preLoginSignUp = router.pathname.includes("");
  return (
    <div className="w-screen h-screen">
      {PUBLIC_PATHS.includes(router.pathname) && <NavBar />}
      {router.pathname.includes("/organiser") && <OrganiserNavBar />}
      <div className="pb-10">{children}</div>
      <Footer />
    </div>
  );
}
