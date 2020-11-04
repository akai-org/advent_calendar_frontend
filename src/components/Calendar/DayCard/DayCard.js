import React, { Suspense, useState, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import gsap from 'gsap';
import styled from 'styled-components';
import Modal from 'components/Modal/Modal';
import asd from 'assets/svg/days/1.svg';
// import StyledModal from 'components/Modal/Modal';

export const transformDateToString = (date) =>
  `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().slice(2, 4)}`;

const StyledDayCardContainer = styled.div`
  background-color: transparent;
  perspective: 1000px;
  position: relative;
  z-index: 5;
  user-select: none;

  & > div {
    ${({ isRevealed }) => (isRevealed ? 'transform: rotateY(180deg)' : null)};
  }

  cursor: ${({ isActive }) => (isActive ? 'pointer' : null)};
`;

const StyledCard = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  margin: 15px;
  /* cursor: pointer; */

  /* opacity: ${({ isActive }) => (isActive ? 1 : 0.5)}; */
`;

const StyledSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  overflow: hidden;
`;

const StyledFrontSide = styled(StyledSide)`
  background-color: powderblue;
  color: black;
  background: url(${({ icon }) => icon});

  & img {
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  & > span {
    bottom: 3px;
    position: absolute;
    font-size: 2rem;
    display: none;
  }
`;

const StyledBackSide = styled(StyledSide)`
  color: white;
  transform: rotateY(180deg);
  opacity: 1;
  background-color: black;
`;

const StyledModalBackground = styled.div`
  position: fixed;
  width: 100vw !important;
  height: 100vh !important;
  display: ${({ isModalVisible }) => (isModalVisible ? 'block' : 'none')};
  z-index: 35;
  top: 0;
  left: 0;
`;

// const ProfilePage = React.lazy(() => import('./ProfilePage'));

// const loadImage = (id) => {};

const DayCard = ({ className, isActive, revealed, cardDate, taskData, icon }) => {
  console.log(icon);

  const card = useRef(null);
  const modal = useRef(null);

  const [isRevealed, setRevealed] = useState(0);
  const [isModalVisible, setModalVisible] = useState(0);
  const [coordinates, setCoordinates] = useState();

  const { id, type, content, correctAnswer } = taskData;

  const [cookies, setCookie] = useCookies(['revealedDayCards']);

  const handleReveal = (dayNumber) => {
    setRevealed(1);
    if (typeof cookies.revealedDayCards === 'object' && !cookies.revealedDayCards.includes(dayNumber)) {
      console.log('asd');
      const days = [...cookies.revealedDayCards, dayNumber];
      setCookie('revealedDayCards', days, { expires: new Date('November 10, 2021 03:24:00') });
    }
  };

  const showDayModal = () => {
    if (isRevealed) {
      card.current.style.opacity = 0;

      if (!isModalVisible) {
        setCoordinates(card.current.getBoundingClientRect());
        const { top, left, height, width } = coordinates ? coordinates : card.current.getBoundingClientRect();

        console.log(coordinates);

        // modal.current.style.display = 'block';

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
        const { top, left, height, width } = coordinates;

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

  // console.log(transformDateToString(new Date()), transformDateToString(cardDate));

  useEffect(() => {
    if (revealed) card.current.click();
  }, []);

  return (
    <>
      <StyledDayCardContainer
        ref={card}
        isActive={isActive || isToday}
        className={className}
        isRevealed={isRevealed}
        onClick={isActive || isToday ? () => handleClick(id) : null}
        // onClick={() => handleClick(id)}
      >
        <StyledCard isActive={isActive || isToday}>
          <StyledFrontSide icon={icon}>
            <img src={require(`../../../assets/svg/days/${id}.svg`)} alt='icon' />
            {id}
            <span>{transformDateToString(cardDate)}</span>
          </StyledFrontSide>
          <StyledBackSide>{type}</StyledBackSide>
        </StyledCard>
      </StyledDayCardContainer>
      <Modal
        ref={modal}
        correctAnswer={correctAnswer}
        isModalVisible={isModalVisible}
        showDayModal={isActive || isToday ? showDayModal : null}
        dayNumber={id}
      >
        {content}
      </Modal>
      <StyledModalBackground
        onClick={isActive || isToday ? () => showDayModal() : null}
        isModalVisible={isModalVisible}
      />
    </>
  );
};

export default DayCard;
