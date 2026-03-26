import React from 'react'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-white/5 py-12 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-primary/5 blur-[100px] rounded-[100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={'/logo.svg'} width={120} height={80} alt="logo" className="brightness-110" />
            </Link>
            <p className="text-foreground/50 text-sm max-w-sm font-medium leading-relaxed">
              The premier AI-driven simulation protocol for elite technical and behavioral interview preparation. Achieve strategic mastery in your professional journey.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/AshishDev-16" target="_blank" className="p-2 rounded-lg bg-white/5 border border-white/10 text-foreground/40 hover:text-primary hover:border-primary/30 transition-all duration-300">
                <Github size={20} />
              </Link>
              <Link href="https://linkedin.com/in/ashish-kadu1016" target="_blank" className="p-2 rounded-lg bg-white/5 border border-white/10 text-foreground/40 hover:text-primary hover:border-primary/30 transition-all duration-300">
                <Linkedin size={20} />
              </Link>
              <Link href="mailto:kaduashish15@gmail.com" className="p-2 rounded-lg bg-white/5 border border-white/10 text-foreground/40 hover:text-primary hover:border-primary/30 transition-all duration-300">
                <Mail size={20} />
              </Link>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-sm font-bold tracking-[0.2em] text-foreground uppercase">Protocol</h3>
            <ul className="space-y-4">
              <li><Link href="#hero" className="text-foreground/40 hover:text-primary text-sm font-medium transition-colors">Hero</Link></li>
              <li><Link href="#features" className="text-foreground/40 hover:text-primary text-sm font-medium transition-colors">Features</Link></li>
              <li><Link href="#how" className="text-foreground/40 hover:text-primary text-sm font-medium transition-colors">Process</Link></li>
              <li><Link href="#questions" className="text-foreground/40 hover:text-primary text-sm font-medium transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-sm font-bold tracking-[0.2em] text-foreground uppercase">System</h3>
            <ul className="space-y-4">
              <li><Link href="/dashboard" className="text-foreground/40 hover:text-primary text-sm font-medium transition-colors">Dashboard</Link></li>
              <li><Link href="/privacy" className="text-foreground/40 hover:text-primary text-sm font-medium transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-foreground/40 hover:text-primary text-sm font-medium transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold tracking-widest text-foreground/20 uppercase">
            &copy; {new Date().getFullYear()} INTERVIEW PRO PROTOCOL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-1 text-xs font-bold tracking-widest text-foreground/20 uppercase">
            BUILD WITH <Heart size={12} className="text-primary fill-primary" /> BY ASHISH DEV
          </div>
        </div>
      </div>
    </footer>
  )
}