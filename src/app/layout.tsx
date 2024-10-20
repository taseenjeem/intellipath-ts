import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "/styles/globals.scss";
import { ThemeProvider } from "../../providers/ThemProvider";
import Footer from "../components/global/Footer/Footer";
import Navbar from "../components/global/Navigation/Navbar";
import ReduxProvider from "@/providers/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import connectMongodb from "@/database/services/connectMongodb";
import { SessionProvider } from "next-auth/react";
import ModalContainer from "../components/global/Modals/ModalContainer";

const fontStyle = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "IntelliPath - Navigate Your Future with IntelliPath",
  description:
    "IntelliPath is a cutting-edge online education platform designed to empower learners of all ages with personalized and engaging learning experiences. Our platform offers a vast array of courses across various disciplines, utilizing advanced technology to tailor learning paths that suit individual needs and goals. Whether you're looking to advance your career, develop new skills, or explore new interests, IntelliPath provides the tools and support to help you succeed.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectMongodb();

  return (
    <html lang="en">
      <body className={fontStyle.className}>
        <ThemeProvider>
          <SessionProvider>
            <ReduxProvider>
              <Navbar>
                <ToastContainer theme="colored" />
                {children}
                <ModalContainer />
                <Footer />
              </Navbar>
            </ReduxProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
