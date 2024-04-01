import React, { useEffect, useState } from 'react';
import './popular.css';
import { Item } from '../item/Item';

export const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/popularwomenitems")
    .then((res) => res.json())
    .then((data) => {setPopularProducts(data)});
  },[]);

  return (
    <div className='popular'>
        <h1>Popular Among Women</h1>
        <hr />
        <div className="popularItem">
            {popularProducts.map(productItem => {
                return <Item key={productItem._id} id={productItem.id} 
                name={productItem.name} image={productItem.image} 
                new_price={productItem.new_price} old_price={productItem.old_price}/>
            })}
        </div>
    </div>
  )
}
