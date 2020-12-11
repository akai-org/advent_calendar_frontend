import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';
import Modal from 'components/Modal/Modal';
// import StyledModal from 'components/Modal/Modal';

const StyledDayCardContainer = styled.div`
  background-color: transparent;
  perspective: 1000px;
  position: relative;
  z-index: 5;

  & > div {
    ${({ isRevealed }) => (isRevealed ? 'transform: rotateY(180deg)' : null)};
  }

  cursor: ${({ isActive }) => (isActive ? 'pointer' : null)};
`;

const StyledCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  /* cursor: pointer; */

  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};

  --borderWidth: 3px;
  background: #1d1f20;
  position: relative;
  border-radius: var(--borderWidth);

  &:after {
    content: '';
    /* content: ${({ isActive }) => (isActive ? '' : null)}; */
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
    border-radius: calc(4 * var(--borderWidth));
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinite;
    background-size: 300% 300%;
  }

  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const StyledSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

const StyledFrontSide = styled(StyledSide)`
  background-color: powderblue;
  color: black;

  & > span {
    bottom: 3px;
    position: absolute;
    font-size: 2rem;
  }
`;

const StyledBackSide = styled(StyledSide)`
  color: white;
  transform: rotateY(180deg);
  opacity: 1;
`;

const StyledModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: -20px;
  top: -20px;
  display: ${({ isModalVisible }) => (isModalVisible ? 'block' : 'none')};
  z-index: 19;
`;

const DayCard = ({ front, back, className, isActive, revealed, cardDate }) => {
  const card = useRef(null);
  const modal = useRef(null);

  const [isRevealed, setRevealed] = useState(0);
  const [isModalVisible, setModalVisible] = useState(0);
  const [coordinates, setCoordinates] = useState();

  const handleReveal = () => {
    setRevealed(1);
  };

  const showDayModal = () => {
    if (isRevealed) {
      card.current.style.opacity = 0;

      if (!isModalVisible) {
        setCoordinates(card.current.getBoundingClientRect());
        const { top, left, height, width } = coordinates ? coordinates : card.current.getBoundingClientRect();

        // modal.current.style.display = 'block';

        console.log(coordinates);

        gsap.fromTo(
          modal.current,
          { top, left, width, height, display: 'none', opacity: 0 },
          {
            duration: 0.8,
            top: `calc(50% - ${450 / 2}px)`,
            left: `calc(50% - ${400 / 2}px)`,
            width: '400px',
            height: '450px',
            display: 'block',
            opacity: 1,
          }
        );

        setModalVisible(1);
      } else {
        card.current.style.opacity = 1;
        const { top, left, height, width } = coordinates;

        gsap.to(modal.current, { duration: 0.8, top, left, width, height, opacity: 0 });
        gsap.to(modal.current, { delay: 0.8, display: 'none' });

        setModalVisible(0);
      }
    }
  };

  const handleClick = () => {
    handleReveal();
    showDayModal();
  };

  const transformDateToString = (date) =>
    `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().slice(2, 4)}`;

  console.log(new Date());
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
        onClick={isActive || isToday ? () => handleClick() : null}
      >
        <StyledCard isActive={isActive || isToday}>
          <StyledFrontSide>
            {front}
            <span>{transformDateToString(cardDate)}</span>
          </StyledFrontSide>
          <StyledBackSide>{back}</StyledBackSide>
        </StyledCard>
      </StyledDayCardContainer>
      <Modal ref={modal} isModalVisible={isModalVisible} showDayModal={isActive || isToday ? showDayModal : null} />
      <StyledModalBackground
        onClick={isActive || isToday ? () => showDayModal() : null}
        isModalVisible={isModalVisible}
      />
    </>
  );
};

export default DayCard;
