import React from 'react';
import './newsLetter.css';

export const NewsLetter = () => {
  return (
    <div className='newsLetter'>
        <h1>Get Exclusive Offers On Your Email Now!</h1>
        <p>Click on the Subscribe button to stay updated</p>
        <div className='newsLetterForm'>
            <input type='email' placeholder='Enter your email'></input>
            <button>Subscribe</button>
        </div>
    </div>
  )
}
