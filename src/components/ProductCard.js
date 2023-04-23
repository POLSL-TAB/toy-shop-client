import React from 'react'
import styled from 'styled-components'

import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';

import Button from '@mui/material/Button';

import logo from '../media/toy-shop-logo-no-background.png'

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
const ImagePlaceholder = styled.a`
    width: 330px;
    height: 330px;
    border: 1px solid gray;
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

const ProductCard = ({product={id:""}}) => {
  return (
    <Container>
        <Wrapper>
            <ImagePlaceholder href={`/produkt/${product.id}`}>
                {image?<img src={logo} />:<HideImageOutlinedIcon style={{fontSize: '100px', color: "gray"}}/>}
            </ImagePlaceholder>
            <Name>
                NAZWA PRODUKTU
            </Name>
            <Price>
                39.99
            </Price>
            <AddToCart>DODAJ DO KOSZYKA</AddToCart>

        </Wrapper>
    </Container>
  )
}

export default ProductCard
