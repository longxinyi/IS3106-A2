import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import OrganiserNavBar from "@/components/OrganiserNavBar";
import AttendeeNavBar from "@/components/AttendeeNavBar";

export default function RootLayout({ children }) {
  const router = useRouter();
  const PUBLIC_PATHS = ["/"];

  return (
    <div className="w-screen h-screen">
      {PUBLIC_PATHS.includes(router.pathname) && <NavBar />}
      {router.pathname.includes("/organiser") && <OrganiserNavBar />}
      {router.pathname.includes("/attendee") && <AttendeeNavBar />}
      <div className="pb-10">{children}</div>
      <Footer />
    </div>
  );
}
