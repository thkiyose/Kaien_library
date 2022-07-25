import React from "react";
import styled from "styled-components";
import Color from "./Color"

const ModalContent = styled.div`
  background-color: white;
  padding : 40px;
  font-size:1.2rem;
`

const OverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = styled.button`
  outline: 0;
  background: ${Color.primary};
  border: 0;
  font-size: 1.2rem;
  padding: 15px;
  color: #FFFFFF;
  cursor: pointer;
  margin:10px;
  width: 100px;
`

const YesButton = styled(Button)`
`

const NoButton = styled(Button)`
  background: ${Color.dark};
`

export const Modal = (props) => {
  const { setShowModal, message, yesAction } = props;
  const handleCloseModal = () => {
    setShowModal(false);
    };
  return (
    <>
      { props.showFlag && <>
        <OverLay onClick={() => {handleCloseModal()}}>
        <ModalContent>
          <p>{message}</p>
          <YesButton onClick={() => {yesAction()}}>はい</YesButton>
          <NoButton onClick={() => {handleCloseModal()}}>いいえ</NoButton>
        </ModalContent>
      </OverLay>
      </>}
    </>
  );
};
