import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";
import TopNav from "@/components/Navbar";
import ReactQueryProvider from "./ReactQueryProvider";
import AuthProvider from "./AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <TopNav />
            {children}
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
