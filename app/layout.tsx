import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RemindMe App",
  description: "this is remindme app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className="scroll-smooth antialiased"
        suppressHydrationWarning
      >
        <body className={cn("min-h-screen", inter.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* common header */}
            <header className="flex justify-between items-center h-14 container sticky top-0 z-50 w-full  bg-transparent backdrop-blur supports-[backdrop-filter]:bg-background/60">
              {/* logo of the webiste */}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                RemindMe
              </h1>
              {/* clerk user button */}
              <div className="flex items-center gap-4">
                <SignedIn>
                  <UserButton />
                </SignedIn>

                {/* theme switch dropdown */}
                <ToggleTheme />
              </div>
            </header>
            {/* header and main element seperator */}
            <Separator className="h-[2px]" />
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
