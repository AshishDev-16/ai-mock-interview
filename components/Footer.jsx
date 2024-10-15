import React from 'react'
import { Heart } from 'lucide-react'

export default function Component() {
  return (
    <footer className=" py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <h2 className="text-xl font-serif font-bold text-gray-800">Interview Pro</h2>
          </div>
          
          {/* Hidden on small screens, visible on medium and up */}
          <div className=" sm:block text-center">
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()}All rights reserved.</p>
          </div>
          
          <div className="flex items-center">
            {/* <p className="flex items-center text-sm text-gray-600">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" />
            </p> */}
            {/* Hidden on small screens, visible on medium and up */}
            <span className="hidden sm:inline ml-1 text-sm text-gray-600">@MIT-WPU</span>
          </div>
        </div>
      </div>
    </footer>
  )
}