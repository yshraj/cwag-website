import { Inter, Noto_Sans_Gujarati } from "next/font/google";
import localFont from "next/font/local";

import type { Metadata } from "next";

import { CWAGFooter } from "@/components/cwag/footer";
import { CWAGNavbar } from "@/components/cwag/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/language-context";
import "@/styles/globals.css";

const dmSans = localFont({
  src: [
    {
      path: "../../fonts/dm-sans/DMSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../fonts/dm-sans/DMSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/dm-sans/DMSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  variable: "--font-noto-gujarati",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CWAG - Coaches Welfare Association Gujarat",
    template: "%s | CWAG",
  },
  description:
    "Coaches Welfare Association Gujarat - Empowering sports coaches across Gujarat through welfare, training, and community support. Join the largest network of sports coaches in Gujarat.",
  keywords: [
    "CWAG",
    "Coaches Welfare Association",
    "Gujarat",
    "sports coaches",
    "coach welfare",
    "sports training",
    "coaching community",
    "Gujarat sports",
    "કોચ વેલ્ફેર એસોસિએશન ગુજરાત",
    "રમતગમત કોચ",
    "ગુજરાત",
  ],
  authors: [{ name: "Coaches Welfare Association Gujarat" }],
  creator: "CWAG",
  publisher: "CWAG",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    title: "CWAG - Coaches Welfare Association Gujarat",
    description:
      "Empowering sports coaches across Gujarat through welfare, training, and community support",
    siteName: "CWAG",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coaches Welfare Association Gujarat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CWAG - Coaches Welfare Association Gujarat",
    description:
      "Empowering sports coaches across Gujarat through welfare, training, and community support",
    images: ["/og-image.jpg"],
  },
  alternates: {
    languages: {
      en: "/",
      gu: "/?lang=gu",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${inter.variable} ${notoSansGujarati.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <CWAGNavbar />
            <main>{children}</main>
            <CWAGFooter />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
