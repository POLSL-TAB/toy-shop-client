import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import logo from '../media/toy-shop-logo-no-background.png'

import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import { IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';



const image=false;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 140px;
    border-bottom: 1px solid #f4f4f4;
`
const ImagePlaceholder = styled.div`
    width: 160px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &>img {
        width: 100%;
        height: 100%;
    }
`
const Name = styled.h2`
    margin: 0 50px;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Price = styled.h3`
    font-size: larger;
    font-weight: bold;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const QuantityContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 20%;
  `
  
  const QuantityValue = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
`
  
const ProductBasketMiniature = ({product, incrementQuantity, decrementQuantity}) => {

    return (
        <>
            <Container>
                <Wrapper>
                    <ImagePlaceholder>
                        {image?<img src={logo} />:<HideImageOutlinedIcon style={{fontSize: '80px', color: "gray"}}/>}
                    </ImagePlaceholder>
                    <Name>
                        {product.name}
                    </Name>
                    <Price>
                        {product.price}
                    </Price>
                    <QuantityContainer>
                        <IconButton
                            color="primary"
                            aria-label="decrease quantity"
                            onClick={()=>decrementQuantity(product.productId)}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <QuantityValue>{product.quantity}</QuantityValue>
                        <IconButton
                            color="primary"
                            aria-label="increase quantity"
                            onClick={()=>incrementQuantity(product.productId)}
                        >
                            <AddIcon />
                        </IconButton>
                    </QuantityContainer>
                </Wrapper>
            </Container>
        </>
    )
}

export default ProductBasketMiniature