import React, { useEffect, useState } from 'react';
import './listProduct.css';
import {Clear} from '@mui/icons-material';

export const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  
  const fetchProducts = async() =>{
    await fetch("http://localhost:8888/allproducts")
    .then((res) => res.json())
    .then((data) =>{
      setAllProducts(data)
    });
  }

  useEffect(() => {
    fetchProducts();
  },[]);

  const removeProduct = async(id) =>{
    await fetch("http://localhost:8888/removeproduct", {
      method:'post',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    });
    fetchProducts();
  };

  return (
    <div className='listProduct'>
      <h1>All Products</h1>
      <div className="listProductFormatMain">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listProductAllProducts">
        <hr />
        {allProducts.map((product) =>{
          return (
            <div>
              <div key={product._id} className="listProductFormatMain listProductFormat">
              <img src={product.image} alt="" className="listProductImg" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <Clear onClick={() => {removeProduct(product.id)}} className='listProductRemoveIcon'/>
            </div>
            <hr />
          </div>
        )})}
      </div>
    </div>
  )
}
