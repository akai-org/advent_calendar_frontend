import React, { forwardRef, useRef, useEffect } from 'react';
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
  height: 700px;
  width: 600px;
  box-shadow: 0px 0px 58px -15px rgba(0, 0, 0, 0.75);
  justify-content: space-evenly;

  top: calc(50% - 350px);
  left: calc(50% - 300px);

  @media (max-width: 1024px) {
    width: 90vw !important;
    height: 80vh !important;

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
    transform-origin: bottom;
    height: 50px;
    width: 50px;
    bottom: 100px;
    margin-bottom: 30px;
  }

  /* @keyframes check-appear {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  } */

  .task-content {
    margin: 40px;
    overflow-y: scroll;
    background-color: #333333;
    font-size: 1.5rem;
    padding: 10px;
    color: #cccccc;
    border: solid 2px #ffd259;

    @media (max-width: 1024px) {
      margin: 15px;
    }
  }

  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & input[type='text'] {
    margin-bottom: 15px;
    font-size: 1.8rem;
    padding: 5px 0;
    background-color: #333333;
    color: #cccccc;
    border: solid 2px #ffd259;
    text-align: center;
  }

  & button {
    margin-bottom: 30px;
    font-size: 1.5rem;
    border-radius: 10px;
    padding: 5px 0;
    background-color: #333333;
    color: #cccccc;
    border: solid 2px #ffd259;
    width: 150px;
  }
`;

const Modal = forwardRef(({ isModalVisible, showDayModal, correctAnswer, dayNumber, date, content }, ref) => {
  const contentElement = useRef(null);
  const [cookies, setCookie] = useCookies(['completedDayCards']);

  useEffect(() => {
    contentElement.current.innerHTML = content;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.children[0].value === correctAnswer.toString()) {
      const days = cookies.completedDayCards ? [...cookies.completedDayCards, dayNumber] : [dayNumber];
      setCookie('completedDayCards', days, { expires: new Date('November 10, 2021 03:24:00') });
    } else {
      alert('wrrrong!!');
    }
  };

  return (
    <StyledModal ref={ref} isModalVisible={isModalVisible} date={date} dayNumber={dayNumber}>
      <StyledCloseButton onClick={() => showDayModal()} />
      <div className='task-content' ref={contentElement} />
      {!cookies.completedDayCards.includes(dayNumber) ? (
        <form action='' onSubmit={(e, dayNumber) => handleSubmit(e, dayNumber)}>
          <input type='text' placeholder='odpowiedź' />
          <button type='submit'>Sprawdź</button>
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
  correctAnswer: propTypes.element.isRequired,
  dayNumber: propTypes.number.isRequired,
  date: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
};

export default Modal;
