import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Tree } from 'assets/svg/christmas_tree.svg';
import { ReactComponent as Trees } from 'assets/svg/trees.svg';
import { ReactComponent as AkaiLogo } from 'assets/svg/logo-color.svg';
import { ReactComponent as QuestionMark } from 'assets/svg/question-mark.svg';
import AdventInfoModal from './AdventInfoModal';

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
    display: flex;
    flex-direction: column;

    & > svg {
      position: absolute;
      width: 300px;
      height: 300px;
      z-index: -1;
    }

    & > .svg-1 {
      left: -15%;
      top: -30%;
      transform: rotate(170deg);
      width: 400px;
      height: 400px;
    }

    & > .svg-2 {
      right: -10%;
      bottom: -30%;
      width: 400px;
      height: 400px;
    }
  }

  .info {
    font-size: 1.5rem;
    align-self: start;
    margin-left: 12vw;
    text-align: center;
    vertical-align: middle;
    display: flex;
    align-items: center;
  }

  .info-icon {
    height: 2rem;
    width: 2rem;
    margin-left: 5px;
    fill: powderblue;
    cursor: pointer;

    & > svg {
      height: 2rem;
      width: 2rem;
    }
  }
`;

const AdventWindow = () => {
  const [isModalVisible, setModalVisible] = useState(0);

  return (
    <>
      <StyledAdventWindow>
        <div>
          Kalendarz Adwentowy
          <span className='info'>
            Created by
            <a href='https://akai.org.pl' className='info-icon'>
              <AkaiLogo />
            </a>
            <QuestionMark className='info-icon' onClick={() => setModalVisible(1)} />
          </span>
          <Tree className='svg-1' />
          <Trees className='svg-2' />
        </div>
      </StyledAdventWindow>
      <AdventInfoModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
    </>
  );
};

export default AdventWindow;
