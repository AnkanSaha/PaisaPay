/* eslint-disable react/no-unescaped-entities */
import React from 'react' // import react module
import { useSelector } from 'react-redux' // import react-redux module

function AboutTopSection () {
  // States
  const ReduxStore = useSelector(state => state) // get redux store
  return (
    <div className='space-y-5'>
      <h1 className='font-mono, font-extrabold text-center lg:text-3xl text-xl my-5'>
        {' '}
        Few words about {ReduxStore.GeneralAppInfo.AppDetails.Static_Details.App_Name}
      </h1>
      <p className='font-normal mx-9 text-justify first-letter:text-2xl first-letter:text-red-500 lg:mx-36'>
        At {ReduxStore.GeneralAppInfo.AppDetails.Static_Details.App_Name}, we are driven by a simple yet powerful vision - to revolutionize the way people
        connect and transact through a seamless P2P payment experience. Our innovative platform empowers individuals to effortlessly pay anyone, anywhere,
        at any time, transforming the landscape of personal finance.
      </p>
      <strong className='ml-5 lg:ml-10'>Our Mission:</strong> <br />
      <p className='font-normal mx-9 text-justify lg:mx-36'>
        {ReduxStore.GeneralAppInfo.AppDetails.Static_Details.App_Name} is on a mission to redefine convenience and security in peer-to-peer payments. We
        believe that financial transactions should be as effortless as a conversation, and our cutting-edge technology makes this possible. We strive to
        be the go-to platform that bridges the gap between individuals, enabling them to exchange value with utmost ease.
      </p>
      <strong className='ml-5 lg:ml-10'>What Sets Us Apart:</strong> <br />
      <p className='lg:ml-44 ml-5 mr-5'>
        <p className='text-justify lg:text-base text-xs'>
          1. <strong>Unparalleled Convenience:</strong> {ReduxStore.GeneralAppInfo.AppDetails.Static_Details.App_Name} provides an intuitive and
          user-friendly interface that simplifies the process of sending and receiving payments. <br /> Whether you are settling a lunch bill with a friend
          or sharing expenses for a group gift,
          {ReduxStore.GeneralAppInfo.AppDetails.Static_Details.App_Name} ensures that the transaction is smooth and hassle-free. <br />{' '}
        </p>
        <p className='text-justify lg:text-base text-xs'>
          2. <strong>Secure and Trustworthy:</strong> We prioritize the security of your financial information above all else. With state-of-the-art
          encryption and robust security measures, {ReduxStore.GeneralAppInfo.AppDetails.Static_Details.App_Name} ensures that your transactions are
          conducted in a secure environment, giving you peace of mind with every payment you make. <br />{' '}
        </p>
        <p className='text-justify lg:text-base text-xs'>
          2. <strong>Anytime, Anywhere:</strong> Our platform is designed to accommodate your dynamic lifestyle. Whether you are at home, at work, or on
          the go, {ReduxStore.GeneralAppInfo.AppDetails.Static_Details.App_Name} is readily accessible through your preferred device, ensuring that you
          have the power to manage your payments wherever you are. <br />{' '}
        </p>
        <p className='text-justify lg:text-base text-xs'>
          2. <strong>Seamless Integration:</strong> {ReduxStore.GeneralAppInfo.AppDetails.Static_Details.App_Name} seamlessly integrates with your existing
          financial ecosystem, allowing you to link your bank accounts, cards, and digital wallets effortlessly. This level of integration enables you to
          manage your finances holistically and make transactions without the need for constant switching between apps. <br />{' '}
        </p>
      </p>
      <strong className='ml-5 lg:ml-10'>How It Works:</strong> <br />
      <p className='font-normal mx-9 text-justify lg:mx-36'>
        Using {ReduxStore.GeneralAppInfo.AppDetails.Static_Details.App_Name} is as simple as sending a message. Once you have registered on our platform,
        you can initiate payments to friends, family, or anyone else by selecting their contact and entering the amount. Our smart system takes care of
        the rest, ensuring that your payment reaches its intended recipient swiftly and securely.
      </p>
      <strong className='ml-5 lg:ml-10'>Join Us in Shaping the Future:</strong> <br />
      <p className='font-normal mx-9 text-justify lg:mx-36'>
        We invite you to be a part of the P2P payment revolution. Join &nbsp;
        {ReduxStore.GeneralAppInfo.AppDetails.Static_Details.App_Name}'s growing community and experience a new era of financial interactions that are
        seamless, secure, and tailored to your needs. Together, we are shaping the future of payments, one transaction at a time.
      </p>
    </div>
  )
}

export default AboutTopSection // export the component
