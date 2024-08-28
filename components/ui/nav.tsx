"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/app/context/themeProvider";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { Separator } from "./separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function ModeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Nav() {
  const [width, setwidth] = useState(0);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setwidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setwidth(window.innerWidth);
      });
    };
  }, []);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <nav className="flex items-center justify-between p-5 w-full min-h-20">
        <div className="flex items-center space-x-4">
          <p className="font-bold capitalizese">Code vault</p>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </nav>
      <Separator orientation="horizontal" />
    </ThemeProvider>
  );
}

export default Nav;
