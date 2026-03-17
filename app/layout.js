import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "GitHub Repo Explorer",
  description: "Search and save GitHub repositories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Toaster position="top-right" />
        <div className="max-w-6xl mx-auto px-6 py-12">
          {children}
        </div>
      </body>
    </html>
  );
}