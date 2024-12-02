import styled from 'styled-components';

interface ConfirmModalProps {
  title: string;
  description: string;
  leftBtnText: string;
  rightBtnText: string;
  rightBtnAction: () => void;
  closeModal: () => void;
}

const ConfirmModal = ({
  title,
  description,
  leftBtnText,
  rightBtnText,
  rightBtnAction,
  closeModal
}: ConfirmModalProps) => {
  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContainer>
        <ModalHeader>
          <h2>{title}</h2>
        </ModalHeader>
        <ModalBody>
          <p>{description}</p>
        </ModalBody>
        <ModalFooter>
          <CancelBtn
            onClick={() => {
              closeModal();
            }}
          >
            {leftBtnText}
          </CancelBtn>
          <ConfirmBtn
            onClick={() => {
              closeModal();
              rightBtnAction();
            }}
          >
            {rightBtnText}
          </ConfirmBtn>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ConfirmModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  max-width: 400px;
  width: 90%;
  padding: 20px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 2px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 769px) {
    width: 600px;
  }
`;

const ModalHeader = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 15px;

  h2 {
    ${({ theme }) => theme.tokenTypographys['display-bold16']};
    color: ${({ theme }) => theme.tokenColors['text-weak']};
  }
`;

const ModalBody = styled.div`
  width: 100%;
  margin-bottom: 20px;
  p {
    ${({ theme }) => theme.tokenTypographys['display-medium14']};
    color: ${({ theme }) => theme.tokenColors['text-default']};
    text-align: center;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 5px;
  width: 100%;
`;

const CancelBtn = styled.button`
  width: 50%;
  background-color: #313131;
  border: none;
  border-radius: 5px;
  padding: 5px 0;
  color: ${({ theme }) => theme.tokenColors['color-white']};
  cursor: pointer;
  ${({ theme }) => theme.tokenTypographys['display-bold14']};

  &:hover {
    background-color: #505050;
  }
`;

const ConfirmBtn = styled.button`
  width: 50%;
  background-color: #d9534f;
  border: none;
  border-radius: 5px;
  padding: 5px 0;
  color: ${({ theme }) => theme.tokenColors['color-white']};
  cursor: pointer;
  ${({ theme }) => theme.tokenTypographys['display-bold14']};

  &:hover {
    background-color: #c9302c;
  }
`;
