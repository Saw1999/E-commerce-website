import React from 'react';
import './footer.css';
import footerLogo from '../assets/logo_big.png';
import {Instagram, Facebook, WhatsApp, Pinterest} from '@mui/icons-material';

export const Footer = () => {
  return (
    <div className='footer'>
      <div className="footerLogo">
        <img src={footerLogo} alt='' />
        <p>SHOPPER</p>
      </div>
      <ul className='footerLinks'>
        <li className='footerLink'>Company</li>
        <li className='footerLink'>Products</li>
        <li className='footerLink'>offices</li>
        <li className='footerLink'>About</li>
        <li className='footerLink'>Contact</li>
      </ul>
      <div className='footerSocialIcons'>
        <Instagram className='footerSocialIcon'/>
        <Facebook className='footerSocialIcon'/>
        <Pinterest className='footerSocialIcon'/>
        <WhatsApp className='footerSocialIcon'/>
      </div>
      <div className='footerCopyRight'>
        <hr />
        <p>Copyright @ 2024 - All Rights Reserved.</p>
      </div>
    </div>
  )
}
