import React, { useState,useEffect } from 'react'
import styled from 'styled-components'

import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';

import Button from '@mui/material/Button';

import logo from '../media/toy-shop-logo-no-background.png'

const image=false;

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
    flex-direction: row;
    max-width: 1400px;
    width: 100%;
    height: 600px;
`
const DescriptionWrapper = styled.div`
    background: white;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    max-width: 600px;
    width: 100%;
    height: 600px;
    padding: 20px 50px;
    justify-content: flex-end;
`
const ImagePlaceholder = styled.div`
    background: white;
    width: 800px;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &>img {
        width: 100%;
        height: 100%;
    }
`
const AddToCart = styled(Button)`
    &&{
        height: 60px;
        width: 100%;
        font-weight: bold;
        color: white;
        background: var(--color-primary);
        &:hover {
            background-color: var(--color-primary-accent);
        }
    }
`
const Name = styled.h2`
    padding-bottom: 20px;
`
const Price = styled.h3`
    padding-bottom: 20px;
    font-size: larger;
    font-weight: bold;
`
const Description = styled.div`
    padding-bottom: 20px;
    font-size: larger;
`
const ProductDetails = ({incrementBasket}) => {

    const [product, setProduct] = useState({})

    useEffect(()=>{
        //fetch product using id from url qurey
        setProduct({
            name: "testowy name",
            price: 66.6,
            description: "asd zxc"
        })
    },[])

    const addProduct = () => {
        incrementBasket()
    }

    return (
        <Container>
            <Wrapper>
                <ImagePlaceholder>
                    {image?<img src={logo} />:<HideImageOutlinedIcon style={{fontSize: '100px', color: "gray"}}/>}
                </ImagePlaceholder>
                <DescriptionWrapper>
                    <Name>
                        {product.name}
                    </Name>
                    <Price>
                        {product.price}
                    </Price>
                    <Description>
                        {product.description}
                    </Description>
                    <AddToCart onClick={addProduct} variant="contained">DODAJ DO KOSZYKA</AddToCart>
                </DescriptionWrapper>
            </Wrapper>
        </Container>
    )
}

export default ProductDetails
