import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sammy Liddell",
  description: "A freshman at UH Manoa studying computer engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
