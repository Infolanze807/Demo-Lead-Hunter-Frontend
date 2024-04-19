import React from 'react'
import Img1 from "../../Images/sign-up.png";
import Img2 from "../../Images/step-2.png";
import Img3 from "../../Images/step-3.png";

function WorkSection() {
  return (
    <div className='lg:px-20 md:px-7 px-4 py-16 font-family'>
        <div className='text-center'>
            <div className='text-4xl font-semibold pb-2'>Here's how it works</div>
            <div className='text-lg'>We know you're busy, so we'll make this easy.</div>
        </div>
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-14 pt-16'>
            <div className='p-12 rounded-lg bg-[--main-color] lg:text-start md:text-center text-start'>
                <div className='rounded-lg pb-2'><img className='rounded-lg md:mx-auto ' src={Img1} alt="Sign UP" /></div>
                <div className='text-4xl py-5 font-semibold'>Step - 1</div>
                <div className='text-lg'>Sign up for Lead Hunter - it only takes a minute to get started.</div>
            </div>
            <div className='p-12 rounded-lg bg-[--main-color] lg:text-start md:text-center text-start'>
                <div className='rounded-lg pb-2'><img className='rounded-lg md:mx-auto' src={Img2} alt="Sign UP" /></div>
                <div className='text-4xl py-5 font-semibold'>Step - 2</div>
                <div className='text-lg'>Find the best leads for you. Search & filter leads by site technology, platform, location, and more.</div>
            </div>
            <div className='p-12 rounded-lg bg-[--main-color]    lg:text-start md:text-center text-start'>
                <div className='rounded-lg pb-2'><img className='rounded-lg md:mx-auto h-[310px]' src={Img3} alt="Sign UP" /></div>
                <div className='text-4xl py-5 font-semibold'>Step - 3</div>
                <div className='text-lg'>Start getting in touch with qualified business owners through verified email and social profiles to start closing more deals.</div>
            </div>
        </div>
    </div>
  )
}

export default WorkSection