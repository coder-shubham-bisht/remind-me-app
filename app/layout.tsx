import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToggleTheme } from "@/components/ToggleTheme";
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
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen w-full flex flex-col items-center dark:bg-black">
              <header className="flex justify-between items-center h-[60px] p-4 px-8 w-full">
                {/* logo */}
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                  RemindMe
                </h1>
                <div className="flex items-center gap-4">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <ToggleTheme />
                </div>
              </header>
              <Separator />
              <main className="flex justify-center items-center w-full grow">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
