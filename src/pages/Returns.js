import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import { BlobProvider, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const formatStatus = (status) => {
  switch (status) {
    case "CREATED":
      return "utworzony";
    case "SENT_TO_MANUFACTURER":
      return "wysłany do producenta";
    case "REJECTED_BY_SELLER":
      return "odrzucony przez sprzedawce";
    case "REJECTED_BY_MANUFACTURER":
      return "odrzucony przez producenta";
    case "WAITING_FOR_DELIVERY":
      return "oczekujący na dostawę";
    case "COMPLETED":
      return "zaakceptowany";
    default:
      return status;
  }
};

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
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 20,
    boxSizing: "border-box"
  },
  table: {
    display: 'table',
    width: '100%',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  tableHeaderCell: {
    margin: 5,
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    margin: 5,
    padding: 5,
    fontSize: 12,
    textAlign: 'center'
  },
});


const MyPDF = ({ returns }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <Text>LISTA ZWROTÓW</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeaderCell, { width: `10%` }]}>ID</Text>
            <Text style={[styles.tableHeaderCell, { width: `30%` }]}>STATUS ZWROTU</Text>
            <Text style={[styles.tableHeaderCell, { width: `30%` }]}>DATA ZAMÓWIENIA</Text>
            <Text style={[styles.tableHeaderCell, { width: `30%` }]}>ZMODYFIKOWANO</Text>
          </View>
          {returns.map((elem) => (
            <View style={styles.tableRow} key={elem.id}>
              <Text style={[styles.tableCell, { width: `10%` }]}>{elem.orderId}</Text>
              <Text style={[styles.tableCell, { width: `30%` }]}>{formatStatus(elem.status)}</Text>
              <Text style={[styles.tableCell, { width: `30%` }]}>{formatDate(elem.created)}</Text>
              <Text style={[styles.tableCell, { width: `30%` }]}>{formatDate(elem.updated)}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};


const Container = styled.div`
    margin-top: 150px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1400px;
    width: 100%;
    justify-content: center;
    padding: 50px;
    background: white;
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
        &:hover {
            background-color: var(--color-primary-accent);
        }
    }
`
const StyledBlobProvider = styled(BlobProvider)`
  && {
    height: 40px;
    width: 120px;
    font-weight: bold;
    color: white;
    &:hover {
      background-color: var(--color-primary-accent);
    }
  }
`;


const Returns = ({ user }) => {
  const [returns, setReturns] = useState([])
  const [complaint, setComplaint] = useState('');
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const tableRef = useRef(null);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${btoa(`${user.email}:${user.password}`)}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(process.env.REACT_APP_API + "/api/staff/complaints/all", requestOptions)
      .then(response => response.text())
      .then(result => setReturns(JSON.parse(result)))
      .catch(error => {
        console.log('error', error)
        setSuccess(false)
        setOpen(true)
      });
  })

  const handleComplaint = (orderId, status) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Basic ${btoa(`${user.email}:${user.password}`)}`);

    var raw = JSON.stringify({
      "id": orderId,
      "status": status
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(process.env.REACT_APP_API + "/api/staff/complaints/update", requestOptions)
      .then(response => response.text())
      .then(setComplaint(""))
      .catch(error => console.log('error', error));
  }

  return (
    <>
      <ConfirmationModal open={open} setOpen={setOpen} success={success} navigate={() => navigate(-1)} />
      <Container>
        <Wrapper>
          <TableContainer component="div" ref={tableRef}>
            <Table>
              <StyledTableHeadRow>
                <TableCell style={{ width: '150px' }}>ID ZAMÓWIENIA</TableCell>
                <TableCell style={{ width: "250px" }}>STATUS ZWROTU</TableCell>
                <TableCell>DATA ZAMÓWIENIA</TableCell>
                <TableCell>ZMODYFIKOWANO</TableCell>
                <TableCell style={{ width: '150px' }}></TableCell>
                <TableCell style={{ width: '150px' }}></TableCell>
              </StyledTableHeadRow>
              <TableBody>
                {returns.map(elem => (
                  <TableRow>
                    <TableCell component="div">{elem.orderId}</TableCell>
                    <TableCell component="div">{formatStatus(elem.status)}</TableCell>
                    <TableCell component="div">{formatDate(elem.created)}</TableCell>
                    <TableCell component="div">{formatDate(elem.updated)}</TableCell>
                    <TableCell><StyledButton style={{ background: "var(--color-primary)" }} onClick={() => { handleComplaint(elem.id, "COMPLETED") }}>ZAAKCEPTUJ</StyledButton></TableCell>
                    <TableCell><StyledButton style={{ background: "var(--color-secondary)" }} onClick={() => { handleComplaint(elem.id, "REJECTED_BY_SELLER") }}>ODRZUĆ</StyledButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
          <BlobProvider style={{ display: "none" }} document={<MyPDF returns={returns} />}>
            {({ blob, url, loading, error }) => {
              if (loading) {
                return <div>Loading...</div>;
              }

              if (error) {
                return <div>Error occurred while generating PDF.</div>;
              }

              return (
                <StyledButton style={{ background: "var(--color-primary)", margin: "15px", width: "275px"}} >
                  <a href={url} download="returns.pdf" style={{ width: "100%", height: "100%", color: "white", textDecoration: "none" }}>
                    GENERUJ PDF
                  </a>
                </StyledButton>
              );
            }}
          </BlobProvider>
        </div>
        </Wrapper>
      </Container>
    </>
  );
};

export default Returns;
