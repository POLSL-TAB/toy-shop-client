import React from 'react'
import styled from 'styled-components'

import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';

import Button from '@mui/material/Button';

import logo from '../media/toy-shop-logo-no-background.png'

import { Link } from 'react-router-dom';

const image=false;

const Container = styled.div`
    display: flex;
    justify-content: center;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 330px;
    margin: 10px;
`
const ImagePlaceholder = styled(Link)`
    width: 330px;
    height: 330px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &>img {
        width: 100%;
        height: 100%;
    }
`
const Name = styled.div`
    padding-top: 20px;
`
const Price = styled.div`
    padding-top: 20px;
    font-size: larger;
    font-weight: bold;
`
const AddToCart = styled(Button)`
    &&{
        margin: 20px 0;
        height: 60px;
        font-weight: bold;
        color: white;
        background: var(--color-primary);
        &:hover {
            background-color: var(--color-primary-accent);
        }
    }
`

const ProductCard = ({product, incrementBasket}) => {

    const addProduct = () => {
        incrementBasket()
    }
    return (
        <Container>
            <Wrapper>
                <ImagePlaceholder to={`/produkt?id=${product.productId}`}>
                    {product.image?<img src={logo} />:<HideImageOutlinedIcon style={{fontSize: '100px', color: "gray"}}/>}
                </ImagePlaceholder>
                <Name>
                    {product.name}
                </Name>
                <Price>
                    {product.price}
                </Price>
                <AddToCart variant="contained" onClick={addProduct}>DODAJ DO KOSZYKA</AddToCart>

            </Wrapper>
        </Container>
    )
}

export default ProductCard
