import React, { useState, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import gsap from 'gsap';
import Modal from 'components/Modal/Modal';
import propTypes from 'prop-types';
import * as Styled from './DayCard.styled';
import { ReactComponent as CheckMark } from '../../../assets/svg/checkmark.svg';

export const transformDateToString = (date) =>
  `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().slice(2, 4)}`;

const DayCard = ({ isActive, isRevealed, cardDate, taskData, isCompleted }) => {
  const card = useRef(null);
  const modal = useRef(null);

  const [isRevealedState, setRevealedState] = useState(0);
  const [isModalVisible, setModalVisible] = useState(0);

  const { id, type, content, correctAnswer } = taskData;
  const [cookies, setCookie] = useCookies(['revealedDayCards']);

  const dayImage = require(`../../../assets/svg/days/${id}.svg`);

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

  const isToday = transformDateToString(new Date()) === transformDateToString(cardDate) ? 1 : 0;

  useEffect(() => {
    if (isRevealed) card.current.click();
  }, []);

  return (
    <>
      <Styled.StyledDayCardContainer
        ref={card}
        isActive={isActive || isToday}
        isRevealed={isRevealedState}
        dayNumber={id}
        onClick={isActive || isToday ? () => handleClick(id) : null}
        // onClick={() => handleClick(id)}
      >
        <Styled.StyledCard isActive={isActive || isToday}>
          <Styled.StyledFrontSide date={transformDateToString(cardDate)}>
            <img src={dayImage} alt='icon' />
            {id}
            <span>{transformDateToString(cardDate)}</span>
          </Styled.StyledFrontSide>
          <Styled.StyledBackSide>{type}</Styled.StyledBackSide>
        </Styled.StyledCard>
        {isCompleted ? <CheckMark class='check-mark-icon' /> : null}
      </Styled.StyledDayCardContainer>
      <Modal
        ref={modal}
        correctAnswer={correctAnswer}
        isModalVisible={isModalVisible}
        showDayModal={isActive || isToday ? showDayModal : null}
        dayNumber={id}
        date={transformDateToString(cardDate)}
        content={content}
      />
      <Styled.StyledModalBackground
        onClick={isActive || isToday ? () => showDayModal() : null}
        isModalVisible={isModalVisible}
      />
    </>
  );
};

export default DayCard;

DayCard.propTypes = {
  isActive: propTypes.bool.isRequired,
  isRevealed: propTypes.bool.isRequired,
  isCompleted: propTypes.bool.isRequired,
  cardDate: propTypes.func.isRequired,
  taskData: propTypes.shape({
    id: propTypes.number.isRequired,
    type: propTypes.string.isRequired,
    content: propTypes.string.isRequired,
    correctAnswer: propTypes.string.isRequired,
  }).isRequired,
};
