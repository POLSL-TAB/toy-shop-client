import React from 'react'
import styled from 'styled-components'
import ProductCard from './ProductCard'

const Container = styled.div`
    margin-top: 120px;
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
`

const ProductsList = () => {
  return (
    <Container>
        <Wrapper>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </Wrapper>
    </Container>
  )
}

export default ProductsList
