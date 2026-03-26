"use client"

import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { User, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['how', 'features', 'questions'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 100) {
          current = section;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
      className={`fixed top-0 left-0 right-0 z-50 flex px-6 py-4 items-center justify-between transition-all duration-300 ${
        activeSection ? "backdrop-blur-xl bg-background/70 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={'/logo.svg'} width={100} height={60} alt="logo" className="hover:scale-105 transition-transform duration-300 brightness-110" />
        </Link>
        
        <nav className="hidden md:flex">
          <ul className="flex gap-4 items-center">
            {menuItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm tracking-wide transition-all duration-300 hover:text-primary ${
                    activeSection === item.href ? 'text-primary font-semibold' : 'text-foreground/70'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <Link 
                href="/dashboard" 
                className={`text-sm tracking-wide transition-all duration-300 hover:text-primary ${
                  path?.includes('dashboard') ? 'text-primary font-semibold' : 'text-foreground/70'
                }`}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <UserButton 
            afterSwitchSessionUrl='/Landing'
            appearance={{
              elements: {
                avatarBox: "h-9 w-9 border border-white/20 hover:scale-110 transition-transform duration-300"
              }
            }}
          />
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <SignInButton mode='modal'>
              <Button variant="ghost" className="text-foreground/80 hover:text-primary transition-colors">
                Sign In
              </Button>
            </SignInButton>
            <SignInButton mode='modal'>
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 transform hover:scale-105">
                Join Now
              </Button>
            </SignInButton>
          </div>
        )}
        
        <div className="md:hidden">
          <Button onClick={toggleMenu} variant="ghost" size="icon" className="text-foreground">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 p-4 border-b border-white/10 glassmorphism md:hidden">
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
            <Link href="/dashboard" className="py-2 text-foreground/80 hover:text-primary transition-colors">
              Dashboard
            </Link>
            {!isSignedIn && (
              <SignInButton mode='modal'>
                <Button className="w-full mt-2">Get Started</Button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
