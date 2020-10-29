import React, { forwardRef } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { ReactComponent as CheckMark } from './../../assets/svg/checkmark.svg';
import StyledCloseButton from './CloseButton.styled';
// import { ReactComponent as Trees } from 'assets/svg/trees.svg';

const StyledModal = styled.div`
  position: absolute;
  background: powderblue;
  z-index: 20;
  border-radius: 10px;
  /* opacity: ${({ isModalVisible }) => (isModalVisible ? '1' : '0')}; */
  overflow: hidden;
  display: none;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 3rem;
  text-align: center;
  padding: 0 30px;

  & .check-mark-icon {
    fill: green;
    animation: check-appear 1000ms ease-in-out;
    transform-origin: bottom;
    height: 50px;
    width: 50px;
    position: absolute;
    bottom: 100px;
  }

  @keyframes check-appear {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Modal = forwardRef(({ isModalVisible, showDayModal, children, correctAnswer, dayNumber }, ref) => {
  const [cookies, setCookie] = useCookies(['correctAnswersCards']);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cookies.correctAnswersCards, dayNumber);
    if (e.target.children[0].value === correctAnswer.toString()) {
      const days = cookies.correctAnswersCards ? [...cookies.correctAnswersCards, dayNumber] : [dayNumber];
      setCookie('correctAnswersCards', days, { expires: new Date('November 10, 2021 03:24:00') });
    }
  };

  return (
    <StyledModal ref={ref} isModalVisible={isModalVisible}>
      <StyledCloseButton onClick={() => showDayModal()} />
      {children}
      {!cookies.correctAnswersCards.includes(dayNumber) ? (
        <form action='' onSubmit={(e, dayNumber) => handleSubmit(e, dayNumber)}>
          <input type='text' />
        </form>
      ) : (
        <CheckMark class='check-mark-icon' />
      )}
    </StyledModal>
  );
});

export default Modal;
