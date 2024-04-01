import './App.css';
import { Navigation } from './components/navigation/Navigation';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { SigninSignup } from './pages/SigninSignup/SigninSignup';
import { Shop } from './pages/shop/Shop';
import { Product } from './pages/product/Product';
import { Cart } from './pages/cart/Cart';
import { Category } from './pages/category/Category';
import manBanner from './components/assets/banner_mens.png';
import womanBanner from './components/assets/banner_women.png';
import kidBanner from './components/assets/banner_kids.png';
import { Footer } from './components/footer/Footer';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/login' element={ <SigninSignup />} />
          <Route path='/' element={ <Shop />} />
          <Route path='/men' element={ <Category banner={manBanner} category="men"/>} />
          <Route path='/women' element={ <Category banner={womanBanner} category="women" />} />
          <Route path='/kids' element={ <Category banner={kidBanner} category="kid"/>} />
          <Route path='/product/' element={ <Product />}>
            <Route path=':productId' element={<Product />} />
          </Route> 
          <Route path='/cart' element={ <Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
