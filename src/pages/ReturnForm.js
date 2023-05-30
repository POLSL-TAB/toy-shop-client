import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FormControl, FormGroup, FormLabel, Button } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

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
    max-width: 1400px;
    width: 100%;
    justify-content: center;
    padding: 50px;
    background: white;
`
const StyledFormControl = styled.div`
  margin-bottom: 20px;
  width: 400px;
`
const SubmitButton = styled(Button)`
&&{
    margin-top: 20px;
    height: 40px;
    width: 100%;
    font-weight: bold;
    color: white;
    background: var(--color-primary);
    &:hover {
        background-color: var(--color-primary-accent);
    }
}
`
const StyledFormGroup = styled(FormGroup)`
    display: flex;
    flex-direction: row;
    width: 100%;
    background: red;
`

const ReturnForm = ({user}) => {
    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

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
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('id');

      var myHeaders = new Headers();
  
      let user = JSON.parse(window.localStorage.getItem("user"))
      myHeaders.append("Authorization", `Basic ${btoa(`${user.email}:${user.password}`)}`);
  
      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };

      let newState = []
  
      fetch(process.env.REACT_APP_API+"/api/order/all", requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result).find(order=>order.id==orderId))
      .then(parsedOrder => {
        setOrder(parsedOrder)
        newState=parsedOrder.oderItems
        console.log(parsedOrder.oderItems)
        return fetchProducts(parsedOrder.oderItems)
      })
      .then(gottenProducts => {
            gottenProducts = gottenProducts.map((product, index)=>(product={...JSON.parse(product), ...newState[index]}))
            setProducts(gottenProducts)
            console.log(gottenProducts)
      })
      .catch(error => {
          console.log('error', error)
          setSuccess(false)
          setOpen(true)
      });
    }, []);

    const handleSubmit = (e) => {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('id');

        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Basic ${btoa(`${user.email}:${user.password}`)}`);
        
        var raw = JSON.stringify({
        "orderId": orderId,
        "reason": "jakiś powód reklamacji"
        });
        
        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        
        fetch(process.env.REACT_APP_API+"/api/order/complaint/create", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            setSuccess(true)
            setOpen(true)
        })
        .catch(error => {
            console.log('error', error)
            setSuccess(false)
            setOpen(true)
        });
    };

  return (
    <>
    <ConfirmationModal open={open} setOpen={setOpen} success={success} navigate={()=>navigate(-1)}/>
    <Container>
        <Wrapper>
            <form style={{display: "flex", flexDirection:"column"}} onSubmit={handleSubmit}>
                <h1 style={{textAlign: "center", marginBottom: "20px"}}>FORMULARZ ZWROTU</h1>
                <h3 style={{textAlign: "center", marginBottom: "20px"}}>ZAMÓWIENIE NR {order.id}</h3>

                <StyledFormControl>
                <FormControl>
                <FormLabel>PRODUKTY DO ZWROTU</FormLabel>
                <List>
                    {products?.map((product) => (
                        <>
                        <ListItem key={product.product_id}>
                            <ListItemIcon>
                                <FiberManualRecordIcon />
                            </ListItemIcon>
                            <ListItemText primary={product.name} secondary={"Liczba produktów: "+product.quantity} />
                        </ListItem>
                        </>
                    ))}
                </List>
                </FormControl>
                </StyledFormControl>

                <SubmitButton variant="contained" color="primary" type="submit">
                ZWRÓĆ
                </SubmitButton>
            </form>
        </Wrapper>
    </Container>
    </>
  );
};

export default ReturnForm;
