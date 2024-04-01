import React from 'react';
import './shop.css';
import { New } from '../../components/new/New';
import { Popular } from '../../components/popular/Popular';
import { Offer } from '../../components/offer/Offer';
import { NewCollection } from '../../components/newCollection/NewCollection';
import { NewsLetter } from '../../components/newsLetter/NewsLetter';

export const Shop = () => {
  return (
    <div className='shopPage'>
        <New />
        <Popular />
        <Offer />
        <NewCollection />
        <NewsLetter />
    </div>
  )
}
