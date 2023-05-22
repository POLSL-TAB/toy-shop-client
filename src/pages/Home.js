import React from 'react'
import Navbar from '../components/Navbar'
import ProductsList from '../components/ProductsList'

const Home = ({products, incrementBasket}) => {
  return (
    <div>
        <ProductsList products={products} incrementBasket={incrementBasket}/>
    </div>
  )
}

export default Home
