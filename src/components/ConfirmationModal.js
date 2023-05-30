import styled from 'styled-components';

import { Button } from '@mui/material';

// Styled Components
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
`;

const CloseModal = styled(Button)`
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

const ConfirmationModal = ({ open, setOpen, success, navigate }) => {
  return (
    <>
      {open && (
        <ModalContainer>
          <ModalContent>
            {
                success?
                ("OPERACJA ZAKOŃCZONA POWODZENIEM"):
                ("UPS! COŚ POSZŁO NIE TAK!")
            }
            <CloseModal variant="contained" onClick={()=>{
              setOpen(false)
              if (success&&navigate) navigate()
            }}>ZAMKNIJ</CloseModal>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

export default ConfirmationModal;
