import React, { forwardRef } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { ReactComponent as CheckMark } from '../../assets/svg/checkmark.svg';
import StyledCloseButton from './CloseButton.styled';
// import { ReactComponent as Trees } from 'assets/svg/trees.svg';

const StyledModal = styled.div`
  position: fixed;
  background: #cccccc;
  z-index: 40;
  overflow: hidden;
  display: none;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 3rem;
  text-align: center;
  padding: 0 30px;

  height: 700px;
  width: 600px;

  top: calc(50% - 350px);
  left: calc(50% - 300px);

  @media (max-width: 1024px) {
    width: 90vw !important;
    height: 80vh !important;
    padding: 10px 15px;

    left: calc(50% - 45vw);
    top: calc(50% - 40vh);

    text-align: center;

    h4,
    h2 {
      margin: 0 5px;
    }
  }

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
  const [cookies, setCookie] = useCookies(['completedDaysCards']);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.children[0].value === correctAnswer.toString()) {
      const days = cookies.completedDayCards ? [...cookies.completedDayCards, dayNumber] : [dayNumber];
      setCookie('completedDayCards', days, { expires: new Date('November 10, 2021 03:24:00') });
      // console.log(cookies.co);
    }
  };

  return (
    <StyledModal ref={ref} isModalVisible={isModalVisible}>
      <StyledCloseButton onClick={() => showDayModal()} />
      {children}
      {!cookies.completedDayCards.includes(dayNumber) ? (
        <form action='' onSubmit={(e, dayNumber) => handleSubmit(e, dayNumber)}>
          <input type='text' />
        </form>
      ) : (
        <CheckMark class='check-mark-icon' />
      )}
    </StyledModal>
  );
});

Modal.displayName = 'Modal';
Modal.propTypes = {
  isModalVisible: propTypes.bool.isRequired,
  showDayModal: propTypes.func.isRequired,
  children: propTypes.element.isRequired,
  correctAnswer: propTypes.element.isRequired,
  dayNumber: propTypes.number.isRequired,
};

export default Modal;
