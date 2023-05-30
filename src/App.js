import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import Basket from './pages/Basket';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import ReturnForm from './pages/ReturnForm';
import OrderList from './pages/OrderList';
import ConfirmationModal from './components/ConfirmationModal';

function App() {

  const [basketQuantity, setBasketQuantity] = useState(0)
  const [products, setProducts] = useState([])
  const [photos, setPhotos] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")))

  useEffect(()=>{
      setBasketQuantity(0)

      var myHeaders = new Headers();
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch(process.env.REACT_APP_API+"/api/products/all", requestOptions)
        .then(response => response.text())
        .then(result => {
            setProducts(JSON.parse(result))
            setFilteredProducts(JSON.parse(result))
        })
        .catch(error => console.log('error', error));

        var myNewHeaders = new Headers();
        if (user) {
          myNewHeaders.append("Authorization", `Basic ${btoa(`${user.email}:${user.password}`)}`);
  
          let newRequestOptions = {
            method: 'GET',
            headers: myNewHeaders,
            redirect: 'follow'
          };
  
        fetch(process.env.REACT_APP_API + "/api/cart/items", newRequestOptions)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(parsedProducts => {
                let quantity = 0
                parsedProducts.forEach(product => {
                  quantity+=product.quantity
                })
                setBasketQuantity(quantity)
            })
            .catch(error => {
              console.log('error', error)
              setSuccess(false)
              setOpen(true)
            });
        }
      
  },[user])

  useEffect(()=>{
    var myHeaders = new Headers();
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(process.env.REACT_APP_API+"/api/products/images/all", requestOptions)
      .then(response => response.text())
      .then(result => setPhotos(JSON.parse(result)))
      .catch(error => {
        console.log('error', error)
        setSuccess(false)
        setOpen(true)
      });
  },[])

  const filterProducts = query => {
      setFilteredProducts(products.filter(product=>(
        product.name.toLowerCase().includes(query.toLowerCase())
      )))
  }

  const incrementBasket = (x=null) => {
    if (x==null) setBasketQuantity(basketQuantity+1)
    else if (x==0) setBasketQuantity(0)
    else if (x) setBasketQuantity(basketQuantity+x) 
  }

  return (
    <>
    <ConfirmationModal open={open} setOpen={setOpen} success={success} />
    <Router>
      <Routes>
        <Route path="/produkt" element={<ProductDetails incrementBasket={incrementBasket} user={user}/>} />
        <Route path="/koszyk" element={user?(<Basket incrementBasket={incrementBasket} photos={photos} user={user}/>):<Home products={filteredProducts} photos={photos} incrementBasket={incrementBasket}/>} />
        <Route path="/zwrot" element={user?<ReturnForm user={user}/>:<Home products={filteredProducts} photos={photos} incrementBasket={incrementBasket}/>} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/rejestracja" element={<Register />} />
        <Route path="/zamowienia" element={user?<OrderList user={user}/>:<Home products={filteredProducts} photos={photos} incrementBasket={incrementBasket}/>} />
        <Route path="*" element={<Home products={filteredProducts} photos={photos} incrementBasket={incrementBasket}/>} />
      </Routes>
      <Navbar basketQuantity={basketQuantity} filterProducts={filterProducts} user={user} setUser={setUser}/>
    </Router>
    </>
  );
}

export default App;
