import React, { useContext } from 'react';
import './product.css';
import { ShopContext } from '../../context/ShopContext';
import {useParams} from 'react-router-dom';
import { Breadcrumb } from '../../components/breadcrumb/Breadcrumb';
import { ProductDisplay } from '../../components/productDisplay/ProductDisplay';
import { DescriptionBox } from '../../components/descriptionBox/DescriptionBox';
import { RelatedProducts } from '../../components/relatedProducts/RelatedProducts';

export const Product = () => {
  const {allProduct} = useContext(ShopContext);
  const {productId} =useParams();
  const product = allProduct.find((pro) => (
    pro.id === Number(productId)
  ))

  return (
    <div className='product'>
      <Breadcrumb product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox />
      <RelatedProducts />
    </div>
  )
}
