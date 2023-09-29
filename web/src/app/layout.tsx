import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TodoList",
  description: "Productivity and Task Management App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
