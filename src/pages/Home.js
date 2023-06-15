import React from 'react'
import ProductsList from '../components/ProductsList'

const Home = ({products, photos, incrementBasket, user}) => {
  return (
    <div>
        <ProductsList products={products} photos={photos} incrementBasket={incrementBasket} user={user}/>
    </div>
  )
}

export default Home
