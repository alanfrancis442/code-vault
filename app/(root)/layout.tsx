import Nav from "@/components/ui/nav";
import { ThemeProvider } from "../context/themeProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen overflow-hidden">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Nav />
        {children}
      </ThemeProvider>
    </main>
  );
}
