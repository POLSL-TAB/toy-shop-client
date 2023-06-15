import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import ConfirmationModal from '../components/ConfirmationModal';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';

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
    align-items: center;
    padding: 50px;
    max-width: 1400px;
    width: 100%;
    background: white;
`

const FormWrapper = styled.div`
  background: white;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  justify-content: center;
`;

const InputField = styled(TextField)`
   &&{
        margin: 10px 0;
   }
`;

const StyledButton = styled(Button)`
    &&{
        height: 40px;
        width: 100%;
        margin: 10px 0;
        font-weight: bold;
        color: white;
        background: var(--color-primary);
        &:hover {
            background-color: var(--color-primary-accent);
        }
    }
`

const ImagePicker = styled.input`
    display: none;
`;

const ImagePickerButton = styled.label`
    height: 40px;
    width: 100%;
    font-weight: bold;
    color: white;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background-color: var(--color-primary-accent);
    }
`;

const ImagePreview = styled.div`
    width: 100%;
    height: 150px;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    &&>img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const AddProduct = ({ user }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const addProduct = () => {

        fetch(process.env.REACT_APP_API + "/api/staff/products/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(`${user.email}:${user.password}`)}`
            },
            body: JSON.stringify({
                "name": name,
                "description": description,
                "price": price,
                "stock": parseInt(stock)?parseInt(stock):0,
              }),
        })
            .then((response) => {
                if (response.ok) {
                    setName('');
                    setDescription('');
                    setPrice('');
                    setStock('');
                    setImageFile(null);
                    setImagePreview(null);
                } else {
                    throw new Error("Failed to add product");
                }
            })
            .then((data) => {
                console.log("Product added successfully:", data);
                // Perform additional actions or update state as needed
            })
            .catch((error) => {
                console.log("Error adding product:", error);
                // Handle the error or display a notification to the user
            });
    };

    return (
        <>
            <ConfirmationModal open={open} setOpen={setOpen} success={success} />
            <Container>
                <Wrapper>
                    <h1>DODAJ PRODUKT</h1>
                    <FormWrapper>
                        <InputField
                            label="NAZWA"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <InputField
                            label="OPIS"
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <InputField
                            label="CENA"
                            variant="outlined"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <InputField
                            label="LICZBA W MAGAZYNIE"
                            variant="outlined"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                        <ImagePicker
                            type="file"
                            accept="image/*"
                            id="image-input"
                            onChange={handleImageChange}
                        />
                        <ImagePreview>
                            {imagePreview?<img src={imagePreview} alt="toy" />:<HideImageOutlinedIcon style={{fontSize: '100px', color: "gray"}}/>}
                        </ImagePreview>
                        {/* {imagePreview && <ImagePreview src={imagePreview} alt="Image Preview" />} */}
                        <ImagePickerButton htmlFor="image-input">
                            DODAJ ZDJĘCIE
                        </ImagePickerButton>
                        <StyledButton onClick={addProduct} variant="contained">
                            DODAJ PRODUKT
                        </StyledButton>
                    </FormWrapper>
                </Wrapper>
            </Container>
        </>
    );
};

export default AddProduct;
