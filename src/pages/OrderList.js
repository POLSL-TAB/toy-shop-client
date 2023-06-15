import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import ConfirmationModal from '../components/ConfirmationModal';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

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
    padding: 50px;
`

const StyledTableHeadRow = styled(TableRow)`
  background-color: lightGray;
  color: #ffffff;
  font-weight: bold;
`;
const StyledButton = styled(Button)`
    &&{
        height: 40px;
        width: 120px;
        font-weight: bold;
        color: white;
        background: var(--color-primary);
        &:hover {
            background-color: var(--color-primary-accent);
        }
    }
`

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    });
}

const getQuantity = orderItems => {
    let sum = 0;
    orderItems.forEach(item => sum+=item.quantity)
    return sum
}

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
            <TableContainer component="div">
            <Table>
                <StyledTableHeadRow>
                <TableCell style={{ width: '150px' }}>ID ZAMÓWIENIA</TableCell>
                <TableCell>DATA ZAMÓWIENIA</TableCell>
                <TableCell>LICZBA ARTYKUŁÓW</TableCell>
                <TableCell style={{width: "250px"}}>STATUS ZWROTU</TableCell>
                <TableCell style={{ width: '150px' }}></TableCell>
                </StyledTableHeadRow>
                <TableBody>
                {orders.map(elem => (
                    <TableRow>
                        <TableCell component="div">{elem.id}</TableCell>
                        <TableCell component="div">{formatDate(elem.created)}</TableCell>
                        <TableCell component="div">{getQuantity(elem.oderItems)}</TableCell>
                        <TableCell component="div">{elem.returned?"ZWRÓCONO":"-"}</TableCell>
                        <TableCell component="div">
                            <StyledButton variant="contained" disabled={elem.returned}>
                                <Link to={`/zwrot?id=${elem.id}`} style={{ textDecoration: 'none', color: "white" }}>ZWRÓĆ</Link>
                            </StyledButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Wrapper>
    </Container>
    </>
  );
};

export default OrderList;
