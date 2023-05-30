import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import Button from '@mui/material/Button';
import ConfirmationModal from '../components/ConfirmationModal';

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
const ProductDetails = ({incrementBasket, user}) => {

    const [product, setProduct] = useState({})    
    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const [image, setImage] = useState("")

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        var myHeaders = new Headers();

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(process.env.REACT_APP_API+"/api/products/get?id="+productId, requestOptions)
        .then(response => response.text())
        .then(result => {
            setProduct(JSON.parse(result))
        })
        .catch(error => {
            console.log('error', error)
            setSuccess(false)
            setOpen(true)
        });
    }, []);

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        var myHeaders = new Headers();

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(process.env.REACT_APP_API+"/api/products/images?productId="+productId, requestOptions)
        .then(response => response.text())
        .then(result => {
            setImage(`data:image/jpeg;base64,${JSON.parse(result)[0].pictureB64}`)
        })
        .catch(error => console.log('error', error));
    },[])

    const addProduct = () => {
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

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

    return (
        <>
        <ConfirmationModal open={open} setOpen={setOpen} success={success} />
        <Container>
            <Wrapper>
                <ImagePlaceholder>
                    {image?<img src={image}  style={{objectFit: "contain"}}/>:<HideImageOutlinedIcon style={{fontSize: '100px', color: "gray"}}/>}
                </ImagePlaceholder>
                <DescriptionWrapper>
                    <Name>
                        {product.name}
                    </Name>
                    <Price>
                        CENA: {product.price} zł
                    </Price>
                    <Price>
                        POZOSTAŁO: {product.stock} szt.
                    </Price>
                    <Description>
                        {product.description}
                    </Description>
                    <AddToCart onClick={addProduct} variant="contained">DODAJ DO KOSZYKA</AddToCart>
                </DescriptionWrapper>
            </Wrapper>
        </Container>
        </>
    )
}

export default ProductDetails
