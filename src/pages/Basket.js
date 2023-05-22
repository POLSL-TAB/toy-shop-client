import {useEffect, useState} from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import ProductBasketMiniature from '../components/ProductBasketMiniature'

import Button from '@mui/material/Button';

import Modal from '../components/Modal';

let mockProducts = [
    {
        "name": "asd",
        "productId": 1,
        "quantity": 4,
        "price": 29.99
    },
    {
        "name": "zxc",
        "productId": 2,
        "quantity": 2,
        "price": 29.99
    },
    {
        "name": "qwe",
        "productId": 3,
        "quantity": 12,
        "price": 29.99
    },
    {
        "name": "rrr",
        "productId": 4,
        "quantity": 1,
        "price": 29.99
    },
    {
        "name": "hhh",
        "productId": 5,
        "quantity": 3,
        "price": 29.99
    },
    {
        "name": "jjj",
        "productId": 6,
        "quantity": 2,
        "price": 29.99
    }
]

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

const Basket = () => {

    const [open, setOpen] = useState(false)

    const [products, updateProducts] = useState(mockProducts)

    const [totalPrice, setTotalPrice] = useState(0)

    const removeProduct = (productId) => {
        updateProducts(products.filter(elem=>elem.productId!=productId))
        // TU POWINIEN BYĆ CALL DO API USUWAJĄCY PRODUKT Z KOSZYKA
    }

    const incrementQuantity = productId => {
        let obj = products.find(product => product.productId==productId)
        let newProducts = products
        newProducts[newProducts.indexOf(obj)] = {...obj, quantity: obj.quantity+1}
        updateProducts([...newProducts])
    }

    const decrementQuantity = productId => {
        let obj = products.find(product => product.productId==productId)
        let newProducts = products
        if (obj.quantity>1) {
            newProducts[newProducts.indexOf(obj)] = {...obj, quantity: obj.quantity-1}
            updateProducts([...newProducts])
        }
        else {
            removeProduct(productId)
        }
    }

    const calcTotalPrice = (products) => {
        let totalPrice = 0;
        products.forEach(product => {
            totalPrice+= product.price*product.quantity
        })
        return totalPrice
    }

    const checkout = (e) => {
        e.preventDefault()
        setOpen(true)
    }

    useEffect(()=>{
        setTotalPrice(calcTotalPrice(products))
    },[products])

    return (
        <>
            <Container>
                <ListWrapper>
                    { products.map( product=><ProductBasketMiniature key={product.productId} product={product} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} /> ) }
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
            <Modal open={open} setOpen={setOpen}/>
        </>
    )
}

export default Basket