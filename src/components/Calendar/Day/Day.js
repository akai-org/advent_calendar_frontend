import React from 'react';
import styled from 'styled-components';

const StyledDayCardContainer = styled.div`
  background-color: transparent;
  /* width: 300px;
  height: 200px; */
  /* border: 1px solid #f1f1f1; */
  perspective: 1000px;

  &:hover > div {
    transform: rotateY(180deg);
  }
`;

const StyledCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

const StyledSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border-radius: 10px;
  cursor: pointer;
`;

const StyledFrontSide = styled(StyledSide)`
  background-color: #bbb;
  color: black;

  &:after {
    clip-path: polygon(
      0% 100%,
      3px 100%,
      3px 3px,
      197px 3px,
      197px 97px,
      3px 97px,
      3px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
  }
`;

const StyledBackSide = styled(StyledSide)`
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
`;

const DayCard = () => {
  return (
    <StyledDayCardContainer>
      <StyledCard>
        <StyledFrontSide></StyledFrontSide>
        <StyledBackSide></StyledBackSide>
      </StyledCard>
    </StyledDayCardContainer>
  );
};

export default DayCard;
