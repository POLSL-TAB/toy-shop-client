import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import Basket from './pages/Basket';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';


let mockProducts = [
  {
      "name": "asd",
      "productId": 1,
      "quantity": 4,
      "price": 29.99
  },
  {
      "name": "zxc",
      "productId": 2,
      "quantity": 2,
      "price": 29.99
  },
  {
      "name": "qwe",
      "productId": 3,
      "quantity": 12,
      "price": 29.99
  },
  {
      "name": "rrr",
      "productId": 4,
      "quantity": 1,
      "price": 29.99
  },
  {
      "name": "hhh",
      "productId": 5,
      "quantity": 3,
      "price": 29.99
  },
  {
      "name": "jjj",
      "productId": 6,
      "quantity": 2,
      "price": 29.99
  }
]


function App() {

  const [basketQuantity, setBasketQuantity] = useState(0)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(()=>{
    setBasketQuantity(0)
    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  },[])

  const filterProducts = query => {
      setFilteredProducts(products.filter(product=>(
        product.name.toLowerCase().includes(query.toLowerCase())
      )))
  }

  const incrementBasket = () => {
    setBasketQuantity(basketQuantity+1)
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home products={filteredProducts} incrementBasket={incrementBasket}/>} />
        <Route path="/produkt" element={<ProductDetails incrementBasket={incrementBasket}/>} />
        <Route path="/koszyk" element={<Basket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rejestracja" element={<Register />} />
      </Routes>
      <Navbar basketQuantity={basketQuantity} filterProducts={filterProducts}/>
    </Router>
    </>
  );
}

export default App;
