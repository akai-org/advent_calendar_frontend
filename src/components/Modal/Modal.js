import React, { forwardRef, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import propTypes from 'prop-types';
import { ReactComponent as Cocard } from 'assets/svg/cocard-2.svg';
import { ReactComponent as CheckMark } from '../../assets/svg/checkmark.svg';
import StyledModal from './Modal.styled';
import StyledCloseButton from './CloseButton.styled';

const Modal = forwardRef(({ isModalVisible, showDayModal, dayNumber, date, content, id, isAvailable, level }, ref) => {
  const contentElement = useRef(null);
  const [cookies, setCookie] = useCookies(['completedDayCards']);

  useEffect(() => {
    contentElement.current.innerHTML = content;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataAnswerStringify = JSON.stringify({
      taskId: id,
      userAnswer: e.target.children[0].value,
    });

    fetch('http://35.242.198.23/api/tasks/answer', {
      mode: 'cors',
      body: dataAnswerStringify,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((isCorrect) => {
        if (isCorrect) {
          const days = cookies.completedDayCards ? [...cookies.completedDayCards, dayNumber] : [dayNumber];
          setCookie('completedDayCards', days, { expires: new Date('November 10, 2021 03:24:00') });
        } else {
          alert('wrrrong!!');
        }
      });
  };

  if (isAvailable === true) {
    return (
      <StyledModal ref={ref} isModalVisible={isModalVisible} date={date} dayNumber={dayNumber}>
        <span className='task-level'>{level}</span>
        <Cocard className='task-icon' />
        <StyledCloseButton onClick={() => showDayModal()} />
        <div className='task-content' ref={contentElement} />
        {!cookies.completedDayCards.includes(dayNumber) ? (
          <form action='' onSubmit={(e, dayNumberr) => handleSubmit(e, dayNumberr)}>
            <input type='text' placeholder='odpowiedź' />
            <button type='submit'>Sprawdź</button>
          </form>
        ) : (
          <CheckMark className='check-mark-icon' />
        )}
      </StyledModal>
    );
  }
  return (
    <StyledModal ref={ref} isModalVisible={isModalVisible} date={date} dayNumber={dayNumber}>
      <StyledCloseButton onClick={() => showDayModal()} />
      <div className='task-content' ref={contentElement}>
        Brak dostępu
      </div>
    </StyledModal>
  );
});

Modal.displayName = 'Modal';
Modal.propTypes = {
  isModalVisible: propTypes.oneOfType([propTypes.bool, propTypes.number]).isRequired,
  showDayModal: propTypes.func.isRequired,
  dayNumber: propTypes.number.isRequired,
  date: propTypes.string.isRequired,
  content: propTypes.string,
  isAvailable: propTypes.bool.isRequired,
  id: propTypes.number.isRequired,
  level: propTypes.string.isRequired,
};

Modal.defaultProps = {
  content: 'Brak dostępu',
};

export default Modal;
