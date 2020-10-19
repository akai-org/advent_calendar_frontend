import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Friends } from 'assets/svg/decorative_friends.svg';
import { ReactComponent as SnowGames } from 'assets/svg/snow_games.svg';
import { ReactComponent as Tree } from 'assets/svg/christmas_tree.svg';
import { ReactComponent as Trees } from 'assets/svg/trees.svg';

const StyledAdventWindow = styled.div`
  position: absolute;
  padding: ${100 / 6 + 5}vh ${100 / 6}vw;
  border: solid 3px white;
  width: 100%;
  height: 100%;

  & > div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #bbb;
    font-size: 8rem;
    z-index: 4;

    & > svg {
      position: absolute;
      width: 300px;
      height: 300px;
      z-index: -1;
    }

    & > svg:nth-child(1) {
      left: -15%;
      top: -30%;
      transform: rotate(170deg);
      width: 400px;
      height: 400px;
    }

    & > svg:nth-child(2) {
      right: -10%;
      bottom: -30%;
      width: 400px;
      height: 400px;
    }
  }
`;

const AdventWindow = () => {
  return (
    <StyledAdventWindow>
      <div>
        Kalendarz Adwentowy
        <Tree />
        <Trees />
      </div>
    </StyledAdventWindow>
  );
};

export default AdventWindow;
