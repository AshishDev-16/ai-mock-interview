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
    <div className="fixed top-0 left-0 right-0 z-50 flex p-4 md:p-6 items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-primary text-white shadow-lg">
      <div className="flex items-center space-x-4">
        <Image src={'/logo.svg'} width={120} height={80} alt="logo" className="hover:scale-105 transition-transform duration-300" />
      </div>
      
      <nav className="hidden md:flex">
        <ul className="flex gap-6 items-center">
          <li>
            <Link 
              href="/dashboard" 
              className={`relative px-3 py-2 rounded-md transition-all duration-300 hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-1 hover:after:bg-white hover:after:rounded-full ${path === '/dashboard' ? 'font-bold' : 'font-medium'}`}
            >
              Dashboard
              {path === '/dashboard' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white rounded-full"></span>
              )}
            </Link>
          </li>
          {menuItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => scrollToSection(item.href)}
                className={`relative px-3 py-2 rounded-md transition-all duration-300 hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-1 hover:after:bg-white hover:after:rounded-full ${activeSection === item.href ? 'font-bold' : 'font-medium'}`}
              >
                {item.label}
                {activeSection === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-white rounded-full"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="md:hidden">
        <Button onClick={toggleMenu} variant="ghost" size="icon" className="text-white hover:bg-white hover:bg-opacity-20">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
          {!isSignedIn && (
            <SignInButton mode='modal'>
              <button className="block w-full text-left px-6 py-3 text-sm text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-200">
                Login
              </button>
            </SignInButton>
          )}
        </div>
      )}
      
      {isSignedIn ? (
        <UserButton 
          afterSwitchSessionUrl='/Landing'
          appearance={{
            elements: {
              avatarBox: "hover:scale-110 transition-transform duration-300"
            }
          }}
        />
      ) : (
        <div className="hidden md:flex items-center space-x-4">
          <SignInButton mode='modal'>
            <Button variant={'outline'} className="bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-300">
              <User className="w-5 h-5 mr-2" />
              Login
            </Button>
          </SignInButton>
        </div>
      )}
    </div>
  )
}

export default Header
