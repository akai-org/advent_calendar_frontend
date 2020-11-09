import React, { forwardRef, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { ReactComponent as Cocard } from 'assets/svg/cocard-2.svg';
import { ReactComponent as CheckMark } from '../../assets/svg/checkmark.svg';
import StyledCloseButton from './CloseButton.styled';
// import { ReactComponent as Trees } from 'assets/svg/trees.svg';

const StyledModal = styled.div`
  position: fixed;
  background: #cccccc;
  z-index: 40;
  overflow: hidden;
  display: none;
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

  .task-content {
    padding: 10px;
    overflow-y: scroll;
    font-size: 1.5rem;
    margin: 120px 40px 40px 120px;
    text-align: left;

    @media (max-width: 1024px) {
      margin: 70px 15px 30px 70px;
    }
  }

  & form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    align-self: flex-end;
    padding: 0 50px 50px 0;
    margin-top: auto;
  }

  & input[type='text'] {
    margin-bottom: 15px;
    margin-left: auto;
    margin-top: auto;
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

  .task-icon {
    position: absolute;
    left: 7%;
    top: 5%;
    width: 100px;
    height: 100px;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    background-color: #333333;
    z-index: -1;
  }

  &:before {
    left: calc(7% + 42px);
    top: 0;
    width: 15px;
    height: 100%;
  }

  &:after {
    left: 0;
    top: calc(5% + 45px);
    height: 15px;
    width: 100%;
  }

  @media (max-width: 1024px) {
    & form {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 100%;
      align-self: flex-end;
      padding: 0 20px 20px 0;
    }

    .task-icon {
      position: absolute;
      left: 4%;
      top: 2%;
      width: 60px;
      height: 60px;
    }

    &:before {
      left: calc(4% + 20px);
      top: 0;
      width: 15px;
      height: 100%;
    }

    &:after {
      left: 0;
      top: calc(2% + 25px);
      height: 15px;
      width: 100%;
    }
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
      <Cocard className='task-icon' />
      <StyledCloseButton onClick={() => showDayModal()} />
      <div className='task-content' ref={contentElement} />
      {!cookies.completedDayCards.includes(dayNumber) ? (
        <form action='' onSubmit={(e, dayNumber) => handleSubmit(e, dayNumber)}>
          {correctAnswer && correctAnswer !== '' ? (
            <>
              <input type='text' placeholder='odpowiedź' />
              <button type='submit'>Sprawdź</button>
            </>
          ) : null}
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
