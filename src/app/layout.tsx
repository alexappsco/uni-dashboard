import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import ThemeProvider from "src/theme";
import { SettingsProvider } from "src/components/settings";
import { getMessages } from "next-intl/server";
import DashboardLayout from "src/layouts/DashboardLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Youni لوحة التحكم",
  description: "لوحة تحكم المشروع مع مكونات MUI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SettingsProvider
          defaultSettings={{
            themeStretch: false,
            themeMode: "light",
            themeDirection: "rtl",
            themeContrast: "default",
            themeLayout: "vertical",
            themeColorPresets: "default",
          }}
        >
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <DashboardLayout>{children}</DashboardLayout>
            </NextIntlClientProvider>
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
