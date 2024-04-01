import React from 'react';
import './navigation.css';
import navLogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg';

export const Navigation = () => {
  return (
    <div className='navbar'>
        <img src={navLogo} alt="" className="navLogo" />
        <img src={navProfile} alt="" className="navProfile" />
        
    </div>
  )
}
