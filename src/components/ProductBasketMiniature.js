import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import logo from '../media/toy-shop-logo-no-background.png'

import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import { IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
  
const ProductBasketMiniature = ({product, photo, incrementQuantity, removeProduct}) => {

    return (
        <>
            <Container>
                <Wrapper>
                    <ImagePlaceholder>
                        {photo.pictureB64?<img src={`data:image/jpeg;base64,${photo.pictureB64}`}  style={{objectFit: "contain"}}/>:<HideImageOutlinedIcon style={{fontSize: '80px', color: "gray", objectFit: "cover"}}/>}
                    </ImagePlaceholder>
                    <Name>
                        {product.name}
                    </Name>
                    <Price>
                        {product.price}
                    </Price>
                    <QuantityContainer>
                        <QuantityValue>{product.quantity}</QuantityValue>
                        <IconButton
                            color="primary"
                            aria-label="increase quantity"
                            onClick={()=>incrementQuantity(product.productId)}
                        >
                            <AddIcon />
                        </IconButton>
                        <IconButton
                            color="primary"
                            aria-label="remove product"
                            onClick={()=>removeProduct(product.productId)}
                        >
                            <DeleteOutlineIcon />
                        </IconButton>
                    </QuantityContainer>
                </Wrapper>
            </Container>
        </>
    )
}

export default ProductBasketMiniature