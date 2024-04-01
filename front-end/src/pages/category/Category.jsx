import React, { useContext } from 'react';
import './category.css';
import { ShopContext } from '../../context/ShopContext';
import dropdownIcon from '../../components/assets/dropdown_icon.png';
import {Item} from '../../components/item/Item';


export const Category = (props) => {
  const {allProduct} = useContext(ShopContext)
  return (
    <div className='category'>
        <img className ='categoryBannerImg' src={props.banner} alt='' />
        <div className="categoryIndexSort">
          <p>
            <span>Showing 1 - 12</span> out of 36 products
          </p>
          <div className="categorySort">
            Sort by <img src={dropdownIcon} alt='' />
          </div>
        </div>
        <div className="categoryProducts">
          {allProduct.map((productItem) => {
            if (props.category === productItem.category) {
              return <Item key={productItem.id} id={productItem.id} 
              name={productItem.name} image={productItem.image} 
              new_price={productItem.new_price} old_price={productItem.old_price}/>
            }
            else {
              return null;
            }
          })}
        </div>
        <div className='categoryLoadmore'>
          Explore More
        </div>
    </div>
  )
}
