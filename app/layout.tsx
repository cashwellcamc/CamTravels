import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cam's Travels",
  description: "Personal travel maps by Cameron Cashwell",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <header className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <a href="/" className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">
            Cam&apos;s Travels
          </a>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
