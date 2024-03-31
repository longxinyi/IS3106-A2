import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function RootLayout({ children }) {
  const router = useRouter();
  const PUBLIC_PATHS = ["/", "/organiser", "/attendee"];
  // const preLoginSignUp = router.pathname.includes("");
  return (
    <div className="w-screen h-screen">
      {/* {PUBLIC_PATHS.includes(router.pathname) && <NavBar />} */}
      <NavBar />
      <div className="pb-10">{children}</div>
      <Footer />
    </div>
  );
}
