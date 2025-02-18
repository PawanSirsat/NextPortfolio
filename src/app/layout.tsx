import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme";
import { Provider } from "@/lib/Provider";
import { Toaster } from "sonner";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-Nunito",
});

export const metadata: Metadata = {
  title: "NextPortfolio",
  description: "Create Your Own Porfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" className={`${nunito.variable}`}>
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Provider>{children}</Provider>
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
