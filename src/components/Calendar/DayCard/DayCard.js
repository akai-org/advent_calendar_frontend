import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';
import StyledModal from 'components/Modal/Modal';

const StyledDayCardContainer = styled.div`
  background-color: transparent;
  perspective: 1000px;
  position: relative;
  z-index: 5;

  & > div {
    ${({ isRevealed }) => (isRevealed ? 'transform: rotateY(180deg)' : null)};
  }
`;

const StyledCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  --borderWidth: 3px;
  background: #1d1f20;
  position: relative;
  border-radius: var(--borderWidth);

  &:after {
    content: '';
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
  cursor: pointer;
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
`;

// const StyledModal = styled.div`
//   position: absolute;
//   background: powderblue;
//   z-index: 20;
//   border-radius: 10px;
//   display: ${({ isModalVisible }) => (isModalVisible ? 'block' : 'none')};
// `;

const StyledModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: -20px;
  top: -20px;
  display: ${({ isModalVisible }) => (isModalVisible ? 'block' : 'none')};
  z-index: 2;
`;

const Modal = ({ isModalVisible }) => {
  return <StyledModal isModalVisible={isModalVisible}></StyledModal>;
};

const DayCard = ({ front, back, className }) => {
  const card = useRef(null);
  const modal = useRef(null);

  const [isRevealed, setRevealed] = useState(0);
  const [isModalVisible, setModalVisible] = useState(0);

  const handleReveal = () => {
    setRevealed(1);
  };

  const showDayModal = () => {
    if (isRevealed && !isModalVisible) {
      const coordinates = card.current.getBoundingClientRect();
      const { top, left, height, width } = coordinates;

      card.current.style.opacity = 0;

      console.log(modal);

      gsap.fromTo(
        modal.current,
        { top, left, width, height },
        {
          duration: 0.8,
          top: `calc(50% - ${450 / 2}px)`,
          left: `calc(50% - ${400 / 2}px)`,
          width: '400px',
          height: '450px',
        }
      );

      setModalVisible(1);
    }
  };

  const handleClick = () => {
    handleReveal();
    showDayModal();
  };

  return (
    <>
      <StyledDayCardContainer
        ref={card}
        className={className}
        isRevealed={isRevealed}
        onClick={() => handleClick(modal)}
      >
        <StyledCard>
          <StyledFrontSide>
            {front}
            <span>29.11.20</span>
          </StyledFrontSide>
          <StyledBackSide>{back}</StyledBackSide>
        </StyledCard>
      </StyledDayCardContainer>
      <Modal ref={modal} isModalVisible={isModalVisible} />
      {/* Damian */}
      {/* </Modal> */}
      <StyledModalBackground isModalVisible={isModalVisible} />
    </>
  );
};

export default DayCard;
