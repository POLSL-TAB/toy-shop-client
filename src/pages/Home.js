import React from 'react'
import Navbar from '../components/Navbar'
import ProductsList from '../components/ProductsList'

const Home = ({products, photos, incrementBasket}) => {
  return (
    <div>
        <ProductsList products={products} photos={photos} incrementBasket={incrementBasket}/>
    </div>
  )
}

export default Home
