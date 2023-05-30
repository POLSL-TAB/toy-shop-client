import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import Button from '@mui/material/Button';
import logo from '../media/toy-shop-logo-no-background.png'
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

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

const ProductCard = ({product, photos, incrementBasket}) => {

    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const [image, setImage] = useState("")

    const addProduct = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        let user = JSON.parse(window.localStorage.getItem("user"))
        myHeaders.append("Authorization", `Basic ${btoa(`${user.email}:${user.password}`)}`);
        
        var raw = JSON.stringify({
          "productId": product.id,
          "quantity": 1
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(process.env.REACT_APP_API+"/api/cart/add", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            incrementBasket()
          })
          .catch(error => {
            console.log('error', error)
            setSuccess(false)
            setOpen(true)
          });
    }
    useEffect(()=>{
        if (photos.find(photo=>photo["productId"]==product.id)) {
            setImage(`data:image/jpeg;base64,${(photos.find(photo=>photo["productId"]==product.id)).pictureB64}`)
        }
    },[photos])

    return (
        <>
        <ConfirmationModal open={open} setOpen={setOpen} success={success} />
        <Container>
            <Wrapper>
                <ImagePlaceholder to={`/produkt?id=${product.id}`}>
                    {image?<img src={image} style={{objectFit: "contain"}}/>:<HideImageOutlinedIcon style={{fontSize: '100px', color: "gray"}}/>}
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
        </>
    )
}

export default ProductCard
