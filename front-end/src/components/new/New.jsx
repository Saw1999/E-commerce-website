import React from 'react';
import './new.css';
import handIcon from '../assets/hand_icon.png';
import heroImg from '../assets/hero_image.png';
import {East} from '@mui/icons-material';

export const New = () => {
  return (
    <div className='new'>
      <div className="newLeft">
          <h2>New Arrivals</h2> 
          <div>
              <div className='newHandIcon'>
                  <p>New</p>
                  <img src={handIcon} alt=''/>
              </div>
              <p>Collections</p>
              <p>For Everyone</p>
          </div>
          <div className="newLatest">
              <div className="latestText">Latest Collections</div>
              <East className="newArrowIcon"/>
          </div>
      </div>
      <div className="newRight">
          <img src={heroImg} alt='' />
      </div>
    </div>
  )
}
