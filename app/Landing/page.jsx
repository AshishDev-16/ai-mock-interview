import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import How from '@/components/How'
import Questions from '@/components/Questions'
import React from 'react'


function LandingPage() {
  return (
    <div className="">
      <div className="">
      <Hero />
      </div>
        <How />
        <div className="">
          <Features/>
        </div>
        <Questions/>
        <Footer/>
    </div>
  )
}

export default LandingPage