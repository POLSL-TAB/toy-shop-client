import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';
import styled from 'styled-components';
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
    justify-content: center;
    padding: 30px 0;
    max-width: 1400px;
    width: 100%;
    height: 600px;
    background: white;
`
const OrderItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReturnButton = styled(Button)`
    &&{
        margin: 0 20px;
        height: 40px;
        font-weight: bold;
        color: white;
        background: var(--color-primary);
        &:hover {
            background-color: var(--color-primary-accent);
        }
    }
`;

const OrderList = ({user}) => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Basic ${btoa(`${user.email}:${user.password}`)}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(process.env.REACT_APP_API+"/api/order/all", requestOptions)
    .then(response => response.text())
    .then(result => {
        setOrders(JSON.parse(result))
    })
    .catch(error => {
        console.log('error', error)
        setSuccess(false)
        setOpen(true)
    });

  }, []);

  return (
    <>
    <ConfirmationModal open={open} setOpen={setOpen} success={success} />
    <Container>
        <Wrapper>
            <List>
                {orders.map((order) => (
                <OrderItem key={order.id}>
                    <ListItemText
                    primary={`NUMER ZAMÓWIENIA: ${order.id}`}
                    secondary={`DATA: ${format(new Date(order.created), 'yyyy-MM-dd')}`}
                    />
                    <Link to={`/zwrot?id=${order.id}`} style={{ textDecoration: 'none' }}>
                    <ReturnButton variant="contained" color="primary">
                        ZWRÓĆ ZAMÓWIENIE
                    </ReturnButton>
                    </Link>
                </OrderItem>
                ))}
            </List>
        </Wrapper>
    </Container>
    </>
  );
};

export default OrderList;
