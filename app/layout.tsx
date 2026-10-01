import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoteHub | Your thoughts, in order",
  description: "A simple, efficient home for your personal notes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <div className="site-shell">
            <Header />
            {children}
            <Footer />
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
