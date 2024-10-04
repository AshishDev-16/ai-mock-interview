import React from 'react'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className=" py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-serif font-bold">Interview Pro</h2>
          </div>
          <div className="mb-4 md:mb-0 text-center">
            <p>&copy; 2024 Interview Pro</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="flex items-center mb-2">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> @MIT-WPU
            </p>
            <a href="mailto:contact@interviewpro.com" className="hover:underline">
              contact@interviewpro.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}