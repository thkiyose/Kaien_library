import React, { useContext } from "react";
import { Context } from '../../App';
import styled from "styled-components";
import Color from "./Color"

const ModalContent = styled.div`
  background-color: white;
  padding : 40px;
  font-size:1.2rem;
  p {
    text-align: center;
  }
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
const Buttons = styled.div`
  margin: 0 auto;
  text-align: center;
`
const Button = styled.button`
  outline: 0;
  font-size: 1.2rem;
  background: ${Color.primary};
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  cursor: pointer;
  width: 100px;
  margin: 10px;
`

const YesButton = styled(Button)`
`

const NoButton = styled(Button)`
  background: ${Color.dark};
`

export const Modal = (props) => {
  const { showFlag, setShowModal, message, yesAction, adminGuide, targetId, targetAdmin } = props;
  const { currentUser } = useContext(Context);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      { showFlag && <>
        <OverLay onClick={() => {handleCloseModal()}}>
        <ModalContent>
          <p>{message}</p>
          { adminGuide && <p>{ targetAdmin? "管理者→一般" : "一般→管理者"}</p>}
          { adminGuide && targetAdmin && targetId === currentUser.id && <p>（あなたが一般ユーザーになると、管理画面から離れます。）</p>}
          <Buttons>
            <YesButton onClick={() => {yesAction()}}>はい</YesButton>
            <NoButton onClick={() => {handleCloseModal()}}>いいえ</NoButton>
          </Buttons>
        </ModalContent>
      </OverLay>
      </>}
    </>
  );
};
