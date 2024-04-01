import React from 'react';
import './admin.css';
import { Sidebar } from '../../components/sidebar/Sidebar';
import {Routes, Route} from 'react-router-dom';
import { AddProduct } from '../../components/addProduct/AddProduct';
import { ListProduct } from '../../components/listProduct/ListProduct';

export const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar />
        <Routes>
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
        </Routes>
        
    </div>
  )
}
