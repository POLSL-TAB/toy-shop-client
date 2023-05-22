import React from 'react'
import styled from 'styled-components'
import ProductCard from './ProductCard'

const Container = styled.div`
    margin-top: 150px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1400px;
    width: 100%;
    background: white;
`

const ProductsList = ({products, incrementBasket}) => {
  return (
    <Container>
        <Wrapper>
            {products.map(product => (<ProductCard product={product} incrementBasket={incrementBasket}/>))}
        </Wrapper>
    </Container>
  )
}

export default ProductsList
