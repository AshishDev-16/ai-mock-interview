import React from 'react'
import Header from './_components/Header'

function DashboardLayout({children}) {
  return (

    <div className='min-h-screen bg-background relative overflow-hidden'>
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <Header/>
      <main className='relative z-10 mx-6 md:mx-20 lg:mx-32 pb-20'>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout