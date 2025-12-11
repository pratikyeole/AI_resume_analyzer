import React from 'react'
import Navbar from '../navbar/Navbar'
import Hero from '../heroSection/Hero'
import Working from '../working/Working'
import Testimonial from '../testimonial/Testimonial'
function HomePage() {
  return (
    <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <Working></Working>
        <Testimonial></Testimonial>
    </div>
  )
}

export default HomePage