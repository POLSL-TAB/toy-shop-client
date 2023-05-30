import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import ProductBasketMiniature from '../components/ProductBasketMiniature'
import ConfirmationModal from '../components/ConfirmationModal';

import Button from '@mui/material/Button';

import Modal from '../components/Modal';

const Container = styled.div`
    margin-top: 160px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`
const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 900px;
    width: 60%;
    background: white;
    padding: 20px;
`

const Summary = styled.div`
    max-width: 500px;
    width: 36%;
    height: fit-content;
    background: white;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    margin-left: 20px;
    padding: 20px;
    top: 160px;
`
const Heading = styled.h2`
    height: 50px;
    border-bottom: 1px solid #f4f4f4;
`
const Section = styled.div`
    height: 50px;
    border-bottom: 1px solid #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const OrderButton = styled(Button)`
    &&{
        margin-top: 20px;
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

const Basket = ({incrementBasket, photos, user}) => {

    const [checkoutOpen, setCheckoutOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const removeProduct = (productId) => {
        setProducts(products.filter(elem=>elem.productId!=productId))
        var myHeaders = new Headers();
        let user = JSON.parse(window.localStorage.getItem("user"))
        myHeaders.append("Authorization", `Basic ${btoa(`${user.email}:${user.password}`)}`)

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(process.env.REACT_APP_API+"/api/cart/delete?id="+productId, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            let productToRemove = products.filter(elem=>elem.productId==productId)[0]
            setProducts(products.filter(elem=>elem.productId!=productId))
            incrementBasket(-productToRemove.quantity)
        })
        .catch(error => console.log('error', error));
    }

    const incrementQuantity = productId => {
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        let user = JSON.parse(window.localStorage.getItem("user"))
        myHeaders.append("Authorization", `Basic ${btoa(`${user.email}:${user.password}`)}`)
        
        var raw = JSON.stringify({
          "productId": productId,
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
            let obj = products.find(product => product.productId==productId)
            let newProducts = products
            newProducts[newProducts.indexOf(obj)] = {...obj, quantity: obj.quantity+1}
            setProducts([...newProducts])
            incrementBasket()
          })
          .catch(error => {
            console.log('error', error)
            setSuccess(false)
            setOpen(true)
          });
    }

    const calcTotalPrice = (products) => {
        let totalPrice = 0;
        products.forEach(product => {
            totalPrice+= parseFloat(product.price)*product.quantity
        })
        return totalPrice
    }

    const checkout = (e) => {
        e.preventDefault()
        var myHeaders = new Headers();

        let user = JSON.parse(window.localStorage.getItem("user"))
        myHeaders.append("Authorization", `Basic ${btoa(`${user.email}:${user.password}`)}`);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(process.env.REACT_APP_API+"/api/order/create", requestOptions)
        .then(response => response.text())
        .then(result => {  
            setSuccess(true)
            setOpen(true)
        })
        .then(incrementBasket(0))
        .catch(error => {
            setSuccess(false)
            setOpen(true)
            console.log('error', error)
        });
    }

    const getProduct = async (id) => {
        var myHeaders = new Headers();

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        return fetch(process.env.REACT_APP_API+"/api/products/get?id="+id, requestOptions)
        .then(response => response.text())
        .then(result => {
            return(result)
        })
        .catch(error => {
            console.log('error', error)
            setSuccess(false)
            setOpen(true)
        });
    }

    async function fetchProducts(parsedProducts) {
        const productPromises = parsedProducts.map(product => getProduct(product.productId))
        const gottenProducts = await Promise.all(productPromises);
        return gottenProducts
    }  

    useEffect(() => {
        var myHeaders = new Headers();
        let user = JSON.parse(window.localStorage.getItem("user"))
        myHeaders.append("Authorization", `Basic ${btoa(`${user.email}:${user.password}`)}`);
      
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        let newState = []

        fetch(process.env.REACT_APP_API + "/api/cart/items", requestOptions)
          .then(response => response.text())
          .then(result => JSON.parse(result))
          .then(parsedProducts => {
            newState=parsedProducts
            return fetchProducts(parsedProducts)
          })
          .then(gottenProducts => {
            gottenProducts = gottenProducts.map((product, index)=>(product={...JSON.parse(product), ...newState[index]}))
            setProducts(gottenProducts)
          })
          .catch(error => {
            console.log('error', error)
            setSuccess(false)
            setOpen(true)
          });
      }, []);      

    useEffect(()=>{
        setTotalPrice(calcTotalPrice(products))
    },[products])

    return (
        <>
            <ConfirmationModal open={open} setOpen={setOpen} success={success} navigate={()=>navigate("/zamowienia")}/>
            <Container>
                <ListWrapper>
                    { products.map( product=><ProductBasketMiniature key={product.productId} product={product} photo={photos.find(photo=>photo["productId"]==product.productId)} incrementQuantity={incrementQuantity} removeProduct={removeProduct}/> ) }
                </ListWrapper>
                <Summary>
                    <Heading>PODSUMOWANIE ZAMÓWIENIA</Heading>
                    <Section>
                        <h3>CENA:</h3>
                        <h3>{totalPrice.toFixed(2)} zł</h3>
                    </Section>
                    <OrderButton variant="contained" onClick={checkout}><h3>ZAMÓW</h3></OrderButton>
                </Summary>
            </Container>
            <Modal open={checkoutOpen} setOpen={setCheckoutOpen}/>
        </>
    )
}

export default Basket