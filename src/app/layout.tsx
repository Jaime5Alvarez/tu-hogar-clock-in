import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/ui/custom/logout-button";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tu hogar Clock In",
  description: "Clock In",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between border-b">
            <div className="flex items-center gap-6 ml-8">
              {session && (
                <>
                  <Link href="/" className="text-sm font-medium hover:underline">Registrar Fichaje</Link>
                  <Link href="/clock-history" className="text-sm font-medium hover:underline">Historial de Fichajes</Link>
                </>
              )}
            </div>
            <div className="ml-auto mr-4 flex items-center gap-2">
              <ToggleTheme />
              {session && <LogoutButton />}
            </div>
          </header>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
