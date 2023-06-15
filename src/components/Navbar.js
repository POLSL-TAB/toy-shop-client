import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import logo from '../media/toy-shop-logo-no-background.png'
import SimpleMenu from './SimpleMenu';

const Container = styled.div`
    position: fixed;
    top: 0;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 110px;
    background: white;
    z-index: 10;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    width: 100%;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Center = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    padding: 5px;
`
const Input = styled.input`
    border: none;
    &:focus {
        outline: none;
    }
    font-size: 20px;
    padding: 2px;
`
const Logo = styled.div`
    font-weight: bold;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    &>img {
        max-width: 90%;
        height: auto;
    }
    background: white;
`

const MenuItem = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 24px;
    cursor: pointer;
    margin-left: 30px;
`
const Welcome = styled.div`
    margin: 0 20px;
`

const Navbar = ({basketQuantity, filterProducts, user, setUser}) => {

    const logout = () => {
        window.localStorage.removeItem("user")
        setUser(null)
        // window.location.reload()
    }
    
  return (
    <Container>
        <Wrapper>
            <Left>
                <SearchContainer>
                    <Input onInput={(e)=>filterProducts(e.target.value)} placeholder="Wyszukaj..."/>
                    <SearchIcon style={{color: "var(--color-secondary)", fontSize: "24px"}}/>
                </SearchContainer>
            </Left>
            <Center>
                <Link to="/">
                    <Logo><img src={logo} /></Logo>
                </Link>
            </Center>
            <Right>
                {
                    user?
                    (<>
                        <MenuItem to="/koszyk">
                            <Badge badgeContent={basketQuantity}   sx={{"& .MuiBadge-badge": {color: "white", backgroundColor: "var(--color-secondary)"} }}>
                                <ShoppingCartIcon />
                            </Badge>
                        </MenuItem>
                        <Welcome>
                            <SimpleMenu text={"Witaj, "+user.email} user={user}/>
                        </Welcome>
                        <LogoutIcon style={{cursor: "pointer"}} onClick={logout} />
                    </>):
                    (<>
                        <MenuItem to="/rejestracja">ZAREJESTRUJ</MenuItem>
                        <MenuItem to="/login">ZALOGUJ</MenuItem>
                    </>)
                }
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar
