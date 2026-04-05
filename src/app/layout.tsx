import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LinguaConnect — Online English & Spanish Classes",
    template: "%s | LinguaConnect",
  },
  description:
    "Book affordable, flexible live language classes with vetted tutors. 1:1 and group sessions in English and Spanish. Start with a free trial.",
  keywords: ["online English classes", "Spanish tutoring", "language learning", "online tutor"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://linguaconnect.com",
    siteName: "LinguaConnect",
    title: "LinguaConnect — Speak English & Spanish with Confidence",
    description:
      "Live 1:1 and group language classes with expert tutors. Book your free trial today.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
