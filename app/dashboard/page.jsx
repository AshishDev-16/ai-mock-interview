import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className='pt-32 space-y-12'>
      <div className='space-y-2'>
        <h1 className='text-4xl md:text-6xl font-black tracking-tight text-foreground uppercase'>
          Command <span className='text-primary italic'>Center</span>
        </h1>
        <p className='text-foreground/50 text-lg font-medium'>
          Initiate protocol or analyze previous session vectors.
        </p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <AddNewInterview/>
      </div>

      <div className='space-y-8'>
        <div className='flex items-center gap-4'>
          <h2 className='text-xl font-bold tracking-[0.2em] text-foreground/40 uppercase'>Session History //</h2>
          <div className='h-[1px] flex-1 bg-white/5' />
        </div>
        <InterviewList/>
      </div>
    </div>
  )
}

export default Dashboard