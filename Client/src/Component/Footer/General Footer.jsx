/* eslint-disable react/prop-types */
// import required modules
import React from 'react'; // Import React
import LinkedinLogo from '../../assets/icons/linkedin.svg'; // Import Linkedin Logo
import { useSelector } from 'react-redux'; // Import useSelector from react-redux

export default function GeneralFooter({FooterStyle}) {
  // Get All State Valuesfrom Redux
  const ReduxState = useSelector((state) => state); // Get All State Values

  // Make Start if IPV6
  const IPV6_Ofuscator = ()=> ReduxState.GeneralAppInfo.ClientDetails.IP_Type == 'IPv6' ? `${ReduxState.GeneralAppInfo.ClientDetails.ClientIP.substring(0, 7)} ****` : ReduxState.GeneralAppInfo.ClientDetails.ClientIP

    return (
        <footer className={`footer items-center p-4 bg-neutral text-neutral-content ${FooterStyle} bottom-0`} data-aos="flip-up">
        <div className="items-center grid-flow-col">
          <img width="36" height="36"  fillRule="evenodd" src={ReduxState.GeneralAppInfo.AppDetails.Static_Details.App_Logo} className="fill-current rounded-full"></img> 
          <p>Copyright © {ReduxState.GeneralAppInfo.AppDetails.Static_Details.App_Launch_Date} - {ReduxState.GeneralAppInfo.AppDetails.Static_Details.App_Name} All right reserved</p>
        </div> 
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <strong>Current IP: &nbsp; {IPV6_Ofuscator()} ({ReduxState.GeneralAppInfo.ClientDetails.IP_Type})</strong>
          <strong className='lg:block hidden'>State : {ReduxState.GeneralAppInfo.ClientDetails.Client_Location.region}</strong>
          <strong className='lg:block hidden'>Timezone : {ReduxState.GeneralAppInfo.ClientDetails.Client_Location.timezone}</strong>
          <strong className='lg:block hidden lg:mr-[4.25rem]' >Country : {ReduxState.GeneralAppInfo.ClientDetails.Client_Location.country}</strong>
          <a href={`https://twitter.com/${ReduxState.GeneralAppInfo.OwnerDetails.Owner_Social_Media.Owner_Twitter}`}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> 
          <a href={`https://www.youtube.com/channel/${ReduxState.GeneralAppInfo.OwnerDetails.Owner_Social_Media.Owner_Youtube}`}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
          <a href={`https://www.linkedin.com/in/${ReduxState.GeneralAppInfo.OwnerDetails.Owner_Social_Media.Owner_LinkedIn}`}><img width="30" height="30" className="fill-current" src={LinkedinLogo} alt="" /></a>
        </div>
      </footer>
    )
} // end of GeneralFooter() function

GeneralFooter.defaultProps = {
    FooterStyle: 'fixed'
}; // set the default props