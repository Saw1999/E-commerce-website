import React, { useState } from 'react';
import './addProduct.css';
import uploadArea from '../../assets/upload_area.svg';

export const AddProduct = () => {
    const [image, setImage] =useState(false);
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) =>{
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    };

    const addProduct = async() =>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:8888/upload',{
            method:'post',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        })
        .then ((res) => res.json())
        .then((data) => {responseData=data});

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:8888/addproduct', {
                method:"post",
                headers:{
                    Accept:'application/json',
                    "Content-Type":'application/json',
                },
                body:JSON.stringify(product),
            })
            .then((res) => res.json())
            .then((data) => {
                data.success ? alert("Product successfully added!") : alert("Failed!");
            });
        }
    }


  return (
    <div className='addProduct'>
        <div className="addProductItemField">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Product Name'/>
        </div>
        <div className="addProductPrice">
            <div className="addProductItemField">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Old Price' />
            </div>
            <div className="addProductItemField">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='New Price' />
            </div>
        </div>
        <div className="addProductItemField">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name='category' className='addProductSelector' placeholder='Category'>
                <option value='men'>Men</option>
                <option value='women'>Women</option>
                <option value='kid'>Kid</option>
            </select>
        </div>
        <div className="addProductItemField">
            <label htmlFor='fileInput'>
                <img src={image ? URL.createObjectURL(image) : uploadArea} alt='' className='uploadAreaImg' />
            </label>
            <input onChange={imageHandler} type='file' name='image' id='fileInput' hidden /> 
        </div>
        <button onClick={() => {addProduct()}} className='addProductBtn'>Add</button>

    </div>
  )
}
