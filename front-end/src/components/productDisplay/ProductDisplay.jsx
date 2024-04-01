import React, { useContext } from 'react';
import './productDisplay.css';
import starIcon from '../assets/star_icon.png';
import starDullIcon from '../assets/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';

export const ProductDisplay = ({product}) => {

    const {addToCart} = useContext(ShopContext);

  return (
    <div className='productDisplay'>
        <div className='productDisplayLeft'>
            <div className="productDisplayImgList">
                <img src={product.image} alt='' />
                <img src={product.image} alt='' />
                <img src={product.image} alt='' />
                <img src={product.image} alt='' />
            </div>
            <div className="productDisplayImg">
            <img className='productDisplayMainImg' src={product.image} alt='' />
            </div>
        </div>
        <div className='productDisplayRight'>
            <h1>{product.name}</h1>
            <div className='productDisplayRightStars'>
                <img src={starIcon} alt='' />
                <img src={starIcon} alt='' />
                <img src={starIcon} alt='' />
                <img src={starIcon} alt='' />
                <img src={starDullIcon} alt='' />
                <p>(122)</p>
            </div>
            <div className="productDisplayRightPrices">
                <div className="productDisplayRightOldPrice">
                    ${product.old_price}
                </div>
                <div className="productDisplayRightNewPrice">
                    ${product.new_price}
                </div>
            </div>
            <div className="productDisplayRightDesc">
                This is the description of the product.
            </div>
            <div className="productDisplayRightSize">
                <h1>Size Options</h1>
                <div className="productDisplayRightSizes">
                    <div>XS</div>
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                </div>
            </div>
            <button onClick={() => {addToCart(product.id)}}>ADD TO CART</button>
            <p className='productDisplayRightCategory'><span>Category : </span>Women, T-Shirt, Crop Top</p>
            <p className='productDisplayRightCategory'><span>Tag : </span>Modern, Latest</p>
        </div>
    </div>
  )
}
