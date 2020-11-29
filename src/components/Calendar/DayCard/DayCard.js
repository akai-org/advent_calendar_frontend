import React, { useState, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import gsap from 'gsap';
import Modal from 'components/Modal/Modal';
import propTypes from 'prop-types';
import * as Styled from './DayCard.styled';
import { ReactComponent as CheckMark } from '../../../assets/svg/checkmark.svg';

export const transformDateToString = (date) =>
  `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().slice(2, 4)}`;

const DayCard = ({ isActive, isRevealed, cardDate, taskData, isCompleted, currentDate, isAvailable }) => {
  const card = useRef(null);
  const modal = useRef(null);

  const [isRevealedState, setRevealedState] = useState(0);
  const [isModalVisible, setModalVisible] = useState(0);

  const { taskDay, category, taskContent, level, id } = taskData;
  const [cookies, setCookie] = useCookies(['revealedDayCards']);

  const dayImage = require(`../../../assets/svg/days/${taskDay}.svg`);

  const handleReveal = (dayNumber) => {
    setRevealedState(1);
    if (typeof cookies.revealedDayCards === 'object' && !cookies.revealedDayCards.includes(dayNumber)) {
      const days = [...cookies.revealedDayCards, dayNumber];
      setCookie('revealedDayCards', days, { expires: new Date('November 10, 2021 03:24:00') });
    }
  };

  const showDayModal = () => {
    if (isRevealedState) {
      card.current.style.opacity = 0;

      if (!isModalVisible) {
        gsap.fromTo(
          modal.current,
          { display: 'none', opacity: 0 },
          {
            display: 'flex',
            opacity: 1,
          }
        );

        setModalVisible(1);
      } else {
        card.current.style.opacity = 1;

        gsap.to(modal.current, { duration: 0.8, opacity: 0 });
        gsap.to(modal.current, { display: 'none' });

        setModalVisible(0);
      }
    }
  };

  const handleClick = (dayNumber) => {
    handleReveal(dayNumber);
    showDayModal();
  };

  const isToday = transformDateToString(currentDate) === transformDateToString(cardDate) ? 1 : 0;

  useEffect(() => {
    if (isRevealed) card.current.click();
  }, []);

  return (
    <>
      <Styled.StyledDayCardContainer
        ref={card}
        isActive={isActive || isToday}
        isRevealed={isRevealedState}
        dayNumber={taskDay}
        onClick={isActive || isToday ? () => handleClick(taskDay) : null}
      >
        <Styled.StyledCard isActive={isActive || isToday}>
          <Styled.StyledFrontSide date={transformDateToString(cardDate)}>
            <img src={dayImage} alt='icon' />
            {taskDay}
            <span>{transformDateToString(cardDate)}</span>
          </Styled.StyledFrontSide>
          <Styled.StyledBackSide>{category}</Styled.StyledBackSide>
        </Styled.StyledCard>
        {isCompleted ? <CheckMark className='check-mark-icon' /> : null}
      </Styled.StyledDayCardContainer>
      <Modal
        id={id}
        ref={modal}
        isModalVisible={isModalVisible}
        showDayModal={showDayModal}
        dayNumber={taskDay}
        date={transformDateToString(cardDate)}
        content={taskContent}
        level={level}
        isAvailable={isAvailable}
      />
      <Styled.StyledModalBackground onClick={() => showDayModal()} isModalVisible={isModalVisible} />
    </>
  );
};

export default DayCard;

DayCard.propTypes = {
  isActive: propTypes.bool.isRequired,
  isRevealed: propTypes.bool.isRequired,
  isCompleted: propTypes.bool.isRequired,
  isAvailable: propTypes.bool.isRequired,
  cardDate: propTypes.instanceOf(Date).isRequired,
  currentDate: propTypes.instanceOf(Date).isRequired,
  taskData: propTypes.shape({
    id: propTypes.number,
    taskDay: propTypes.number.isRequired,
    category: propTypes.string.isRequired,
    taskContent: propTypes.string,
    level: propTypes.string.isRequired,
  }),
};

DayCard.defaultProps = {
  taskData: {
    id: null,
    taskContent: 'Brak dostępu',
  },
};
