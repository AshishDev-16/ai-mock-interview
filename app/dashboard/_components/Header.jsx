  "use client"
  import { UserButton, useUser } from '@clerk/nextjs'
  import { User } from 'lucide-react'
  import Image from 'next/image'
  import Link from 'next/link'
  import { usePathname } from 'next/navigation'
  import React, { useEffect } from 'react'

  function Header() {

    const {user, isSignedIn} = useUser();

    const path = usePathname();
    useEffect(() => { })
    return (
      <div className="flex p-6 items-center justify-between bg-secondary shadow-sm">
        <Image src={'/logo.svg'} width={160} height={100} alt="logo" />
        
        <ul className="hidden md:flex gap-6">
          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-bold'}`}>
            <Link href={"/dashboard"}>
            Dashboard 
            </Link>
            </li>
            

          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && 'text-primary font-bold'}`}>
            Questions</li>

          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}>
          <Link href={""}>
            Upgrade
            </Link>
            </li>

          <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && 'text-primary font-bold'}`}>
            How it works?</li>

        </ul>
        {isSignedIn?
        <UserButton 
        afterSwitchSessionUrl='/Landing'
        />
        :
        <div className="flex items-center space-x-4">
        <Link
            href="/sign-in"
            className="flex items-center space-x-1 hover:text-primary hover:font-bold transition-all cursor-pointer"
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        </div>}
      </div>
    )
  }

  export default Header