import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Pricing: React.FC = () => {
  return (
    <div className='bg-sky-200'>
      <Header/>
      <div className='min-h-screen py-12 px-52'>
        <h2 className='text-4xl sm:text-6xl font-bold'>Currently all the features are free... <br />
        Grab the Opportunity!</h2>
      </div>
      <Footer/>
    </div>
  )
}

export default Pricing;
