import React from 'react';
import './sidebar.css';
import {Link} from 'react-router-dom';
import {AddShoppingCart , Folder} from '@mui/icons-material';

export const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none", color: "black"}}>
            <div className="sidebarItem">
                <AddShoppingCart className='addProductIcon' />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none", color: "black"}}>
            <div className="sidebarItem">
                <Folder className='productListIcon' />
                <p>Product List</p>
            </div>
        </Link>
    </div>
  )
}
