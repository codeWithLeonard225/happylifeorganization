import "./globals.css";
// app/layout.js

export const metadata = {
  title: "Happy Life Organization (HLF) – Empowering Lives in Sierra Leone",
  description:
    "Happy Life Organization (HLF) is a humanitarian and community-based organization in Sierra Leone focused on education, empowerment, health, and social development.",

  manifest: "/manifest.webmanifest",

  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },

  keywords: [
    "Happy Life Organization",
    "HLF Sierra Leone",
    "NGO in Sierra Leone",
    "Community Development Sierra Leone",
    "Youth Empowerment Sierra Leone",
    "Education Support Sierra Leone",
    "Humanitarian Organization Sierra Leone",
    "Non Governmental Organization Sierra Leone",
    "Happy Life Foundation",
    "HLF Portal",
  ],

  authors: [{ name: "Happy Life Organization (HLF)" }],
  creator: "Happy Life Organization (HLF)",
  publisher: "Happy Life Organization (HLF)",

  metadataBase: new URL("https://www.happylifeorganization.sl"),
  applicationName: "Happy Life Organization Portal",
  classification: "Non-Profit / Community Organization",

  robots: { index: true, follow: true },
  referrer: "strict-origin-when-cross-origin",

  alternates: {
    canonical: "https://www.happylifeorganization.sl",
  },

  openGraph: {
    title: "Happy Life Organization (HLF) – Empowering Communities",
    description:
      "Happy Life Organization (HLF) is dedicated to improving lives through education, empowerment programs, and community development across Sierra Leone.",
    url: "https://www.happylifeorganization.sl",
    siteName: "Happy Life Organization (HLF)",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hlf.jpg",
        width: 1200,
        height: 630,
        alt: "Happy Life Organization Community Outreach",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Happy Life Organization (HLF) – Sierra Leone",
    description:
      "Empowering lives and communities through education, health, and development programs in Sierra Leone.",
    images: ["/images/hlf.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1a3a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0a1a3a" />
        <meta name="color-scheme" content="light" />
      </head>
      <body>{children}</body>
    </html>
  );
}
