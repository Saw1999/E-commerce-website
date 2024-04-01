import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart = {};
    for (let i=0; i < 300+1 ; i++){
        cart[i] = 0; // i is the key of object cart
    }
    return cart;
};


const ShopContextProvider = ({children}) =>{
    const [allProduct, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
   
    useEffect(() =>{
        fetch("http://localhost:8888/allproducts")
        .then((res) => res.json())
        .then((data) => {setAllProduct(data)});

        if (localStorage.getItem('auth-token')) {
            fetch("http://localhost:8888/cart", {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token' : `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:"",
            })
            .then((res) => res.json())
            .then((data) => {setCartItems(data)});
        }
    },[]);

    const addToCart =(itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        if (localStorage.getItem('auth-token')){
            fetch("http://localhost:8888/addtocart", {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'itemId' : itemId})
            })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId]-1}))
        if (localStorage.getItem('auth-token')){
            fetch("http://localhost:8888/removefromcart", {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'itemId' : itemId})
            })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const itemIndex in cartItems ){
            if(cartItems[itemIndex] > 0){
                let item = allProduct.find(product=> product.id === Number(itemIndex));
                totalAmount += item.new_price * cartItems[itemIndex];

            }

        }

        return totalAmount;
       
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const itemIndex in cartItems){
            if (cartItems[itemIndex] > 0) {
                totalItems += cartItems[itemIndex];
            }
        }
        return totalItems;
    };

    const contextValue = {allProduct, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems} ;

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
