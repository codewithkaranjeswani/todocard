import "./globals.css";
import { Metadata } from "next";
import Navbar from "./components/Navbar";
import Providers from "./Providers";
import Footer from "./components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "👋 Welcome to TodoCard",
  description: "Productivity and Task Management App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <></>;
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen flex-col justify-between bg-neutral-100 dark:bg-neutral-900">
          <Providers session={session}>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
