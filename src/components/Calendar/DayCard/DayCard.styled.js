import styled from 'styled-components';

const StyledDayCardContainer = styled.div`
  background-color: transparent;
  perspective: 1000px;
  position: relative;
  z-index: 5;
  user-select: none;
  position: relative;
  margin: 15px;

  &:before {
    content: '${({ dayNumber }) => dayNumber}';
    position: absolute;
    color: white;
    top: 5px;
    left: 5px;
    font-size: 2rem;
    z-index: 30;
  }

  & .check-mark-icon {
    position: absolute;
    bottom: -10px;
    left: -18px;
    transform: scale(0.7);
    fill: green;
  }

  @media (max-width: 1024px) {
    display: flex;
    justify-content: center;
    width: fit-content;
  }

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
  /* cursor: pointer; */

  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};

  @media (max-width: 1024px) {
    width: 250px;
    height: 250px;
  }
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

  &:before {
    content: '${({ date }) => date}';
    position: absolute;
    color: white;
    bottom: 8px;
    right: 10px;
    font-size: 1.5rem;
    z-index: 30;
  }

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

export { StyledDayCardContainer, StyledModalBackground, StyledCard, StyledFrontSide, StyledBackSide };
