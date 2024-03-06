/* eslint-disable react/no-unescaped-entities */
import React from 'react'

export default function Chat_Animation () {
  return (
    <>
      {/* First Chat */}
      <div className=' w-[68%] lg:w-[92%]'>
        <div className='lg:mt-[7rem] mt-[5.25rem]'>
          <div className='chat chat-start' data-aos='fade-right'>
            <div className='chat-bubble'>
              Is Any Simple Way To Send Money? <br /> I'm Tired Of The Stress
            </div>
          </div>
          <div className='chat chat-end' data-aos='fade-left'>
            <div className='chat-bubble'>
              {' '}
              Yes, There Is A Simple Way To Send Money <br /> Just Sign Up And Start Sending Money
            </div>
          </div>
          {/* Second  */}
        </div>
        <div className='lg:mt-[7rem] mt-[5.25rem]'>
          <div className='chat chat-start' data-aos='fade-right'>
            <div className='chat-bubble'>
              {' '}
              what about the fees? <br /> Is It Free?
            </div>
          </div>
          <div className='chat chat-end' data-aos='fade-left'>
            <div className='chat-bubble'>
              {' '}
              Yes, It's Free To Sign Up <br /> Just Click On The Get Started Button <br /> but there is only a small fee when you add money to your account
            </div>
          </div>
        </div>
        <div className='lg:mt-[7rem] mt-[5.25rem] lg:py-24 pb-48'>
          <div className='chat chat-start' data-aos='fade-right'>
            <div className='chat-bubble'>
              {' '}
              Now I'm Going To Sign Up <br /> Thank You{' '}
            </div>
          </div>
          <div className='chat chat-end' data-aos='fade-left'>
            <div className='chat-bubble'>
              {' '}
              You're Welcome <br /> Have A Nice Day
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
