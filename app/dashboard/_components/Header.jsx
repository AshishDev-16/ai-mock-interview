"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { User, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ["how", "features", "questions"];
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 100) {
          current = section;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { href: "how", label: "How it works?" },
    { href: "features", label: "Features" },
    { href: "questions", label: "Questions" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex px-8 transition-all duration-500 items-center justify-between ${
        isScrolled
          ? "py-4 bg-background/80 backdrop-blur-xl border-b border-foreground/5 shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="relative">
            <Image
              src={"/logo.svg"}
              width={120}
              height={80}
              alt="logo"
              className="transition-all duration-500 brightness-110 group-hover:brightness-125 invert dark:invert-0"
            />
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </Link>

        <nav className="hidden md:flex ml-4">
          <ul className="flex gap-8 items-center border-l border-foreground/10 pl-8">
            {menuItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-primary relative group py-2 
                    ${activeSection === item.href ? "text-primary" : "text-foreground/60"}`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1px] bg-primary transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100 ${activeSection === item.href ? "scale-x-100" : ""}`}
                  />
                </button>
              </li>
            ))}
            <li>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-all duration-300 hover:text-primary relative group py-2
                  ${path?.includes("dashboard") ? "text-primary" : "text-foreground/60"}`}
              >
                Intelligence
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1px] bg-primary transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100 ${path?.includes("dashboard") ? "scale-x-100" : ""}`}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {isSignedIn ? (
          <UserButton
            afterSwitchSessionUrl="/Landing"
            appearance={{
              elements: {
                avatarBox:
                  "h-9 w-9 border border-foreground/20 hover:scale-110 transition-transform duration-300",
              },
            }}
          />
        ) : (
          <div className="hidden md:flex items-center gap-6">
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-sm font-medium text-foreground/60 hover:text-primary transition-all"
              >
                Login
              </Button>
            </SignInButton>
            <div className="h-6 w-[1px] bg-foreground/10" />
            <SignInButton mode="modal">
              <Button className="h-10 px-6 rounded-lg bg-primary hover:bg-primary/90 text-sm font-medium text-primary-foreground shadow-md transition-all">
                Execute Protocol
              </Button>
            </SignInButton>
          </div>
        )}

        <div className="md:hidden">
          <Button
            onClick={toggleMenu}
            variant="ghost"
            size="icon"
            className="text-foreground"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 p-4 border-b border-foreground/10 glassmorphism md:hidden">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-left py-2 text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Link
              href="/dashboard"
              className="py-2 text-foreground/80 hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            {!isSignedIn && (
              <SignInButton mode="modal">
                <Button className="w-full mt-2">Get Started</Button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
