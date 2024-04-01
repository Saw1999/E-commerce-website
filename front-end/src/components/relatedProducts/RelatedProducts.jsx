import React from 'react';
import './relatedProducts.css';
import dataProduct from '../assets/data';
import { Item } from '../item/Item';

export const RelatedProducts = () => {
  return (
    <div className='relatedProducts'>
        <h1>Related Product Items</h1>
        <hr />
        <div className="relatedProductItem">
          {dataProduct.map(productItem =>{
            return <Item key={productItem.id} id={productItem.id} 
            name={productItem.name} image={productItem.image} 
            new_price={productItem.new_price} old_price={productItem.old_price}/>
          } )}
        </div>
    </div>
  )
}
