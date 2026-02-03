import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ajay Kumar | Software Engineer",
  description: "Software Engineer specializing in Flutter, React, Next.js, Node.js, Django, and Rust. Building scalable applications and beautiful experiences.",
  keywords: ["Software Engineer", "Flutter", "React", "Next.js", "Rust", "Node.js", "Django", "Web Developer", "Mobile Developer"],
  authors: [{ name: "Ajay Kumar" }],
  openGraph: {
    title: "Ajay Kumar | Software Engineer",
    description: "Software Engineer specializing in Flutter, React, Next.js, Node.js, Django, and Rust.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
