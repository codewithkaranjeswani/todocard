import "./globals.css";
import { Metadata } from "next";
import Navbar from "./components/Navbar";
import Providers from "./Providers";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "👋 Welcome to TodoCard",
  description: "Productivity and Task Management App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen flex-col justify-between bg-neutral-100 dark:bg-neutral-900">
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
