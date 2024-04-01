import React, { useContext, useRef, useState } from 'react';
import './navigation.css';
import logo from '../assets/mylogo.jpg';
import cart_icon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import {ArrowDropDown} from '@mui/icons-material';


export const Navigation = () => {
    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const navMenuToggle = (e) =>{
        menuRef.current.classList.toggle('navMenuVisible');
        e.target.classList.toggle('open');
    };

    return (
        <div className='navbar'>
            <div className='navLogo'>
                <img className="navLogoImg" src={logo} alt='' />
                <h2>ShoppingHub</h2>
            </div>
            <ArrowDropDown className='navDropDown' onClick={navMenuToggle} />
            <ul className="navMenu" ref={menuRef}>
                <li onClick={() => setMenu("shop")} >
                    <Link to='/' style={{textDecoration:'none', color:'rgb(167, 132, 86)'}}>Shop</Link>{menu==="shop" ? <hr /> : <></>} 
                </li>
                <li onClick={() => setMenu("men")} >
                    <Link to='/men' style={{textDecoration:'none', color:'rgb(167, 132, 86)'}}>Men</Link> {menu==="men" ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu("women")} >
                    <Link to='/women' style={{textDecoration:'none', color:'rgb(167, 132, 86)'}}>Women</Link>{menu==="women" ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu("kids")}>
                    <Link to='/kids' style={{textDecoration:'none', color:'rgb(167, 132, 86)'}}>Kids</Link> {menu==="kids" ? <hr /> : <></>}
                </li>
            </ul>
            <div className="navCart">
                {localStorage.getItem('auth-token')
                ? <button className='navLoginBtn' onClick={() => {localStorage.removeItem('auth-token'); window.location.replace("/")}}>Log Out</button>
                : <Link to='/login'><button className='navLoginBtn'>Log In</button></Link>
                }
                <Link to='/cart'><img src={cart_icon} alt="" className="navCartIcon" /></Link>
                <div className="navCartCount">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}
