import React from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-foreground/5 py-24 px-8 overflow-hidden">
      {/* Background Precision Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src={"/logo.svg"}
                width={140}
                height={100}
                alt="logo"
                className="brightness-110 group-hover:brightness-125 transition-all duration-500 invert dark:invert-0"
              />
            </Link>
            <p className="text-foreground/60 text-[11px] max-w-sm font-medium leading-relaxed tracking-wider uppercase">
              The premier AI-driven simulation protocol for elite technical and
              behavioral interview preparation. Engineered for operational
              mastery in your professional journey.
            </p>
            <div className="flex items-center gap-4">
              {[
                {
                  icon: <Github size={18} />,
                  href: "https://github.com/AshishDev-16",
                },
                {
                  icon: <Linkedin size={18} />,
                  href: "https://linkedin.com/in/ashish-kadu1016",
                },
                {
                  icon: <Mail size={18} />,
                  href: "mailto:kaduashish15@gmail.com",
                },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  target="_blank"
                  className="w-10 h-10 rounded-sm bg-foreground/[0.03] border border-foreground/10 flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-500"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-black tracking-[0.4em] text-foreground uppercase">
              Protocol
            </h3>
            <ul className="space-y-5">
              {[
                { name: "Architecture", href: "#hero" },
                { name: "Intelligence", href: "#features" },
                { name: "Operational Flow", href: "#how" },
                { name: "Documentation", href: "#questions" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-foreground/50 hover:text-primary text-[10px] font-bold tracking-widest uppercase transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-black tracking-[0.4em] text-foreground uppercase">
              Terminal
            </h3>
            <ul className="space-y-5">
              {[
                { name: "Access Dashboard", href: "/dashboard" },
                { name: "Privacy Protocol", href: "/privacy" },
                { name: "Service Terms", href: "/terms" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-foreground/50 hover:text-primary text-[10px] font-bold tracking-widest uppercase transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-32 pt-10 border-t border-foreground/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-black tracking-[0.3em] text-foreground/40 uppercase">
            &copy; {new Date().getFullYear()} INTERVIEW PRO PROTOCOL //
            [SYSTEM_SECURE]
          </p>
          <div className="flex items-center gap-2 text-[9px] font-black tracking-[0.3em] text-foreground/40 uppercase">
            DESIGNED BY{" "}
            <Link
              href="https://github.com/AshishDev-16"
              className="text-primary/40 hover:text-primary transition-colors"
            >
              ASHISH DEV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
