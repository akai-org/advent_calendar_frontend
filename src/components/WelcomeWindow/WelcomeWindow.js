import React, { useState } from 'react';
import SantaImage from 'assets/svg/santa.svg';
import Up from 'assets/svg/up.svg';
import { ReactComponent as AkaiLogo } from 'assets/svg/arrow-down.svg';
import { ReactComponent as QuestionMark } from 'assets/svg/question-mark.svg';
import Footprints from 'assets/svg/footprints.svg';
import AdventInfoModal from 'components/AdventWindow/AdventInfoModal';
import StyledWelcomeWindow from './WelcomeWindow.styled';

const WelcomeWindow = () => {
  const [isModalVisible, setModalVisible] = useState(0);

  return (
    <>
      <StyledWelcomeWindow>
        <header className='page-header'>
          <h1 className='page-header-text'>
            <span className='capital'>K</span>alendarz <span className='capital'>A</span>dwentowy <br />{' '}
            <span className='capital'>P</span>rogramisty <br />
          </h1>
          <span className='info'>
            <a href='#calendar' className='info-icon' title='Do kalendarza'>
              <AkaiLogo />
            </a>
            <QuestionMark className='info-icon' onClick={() => setModalVisible(1)} title='Zasady' />
          </span>
          <br />
        </header>
        <img src={SantaImage} alt='santa-claus' className='santa-claus' />
        <img src={Up} alt='up' className='santa-up' />
        <img src={Footprints} alt='footprint-1' className='footprints santa-footprint-1' />
        <img src={Footprints} alt='footprint-2' className='footprints santa-footprint-2' />
        <img src={Footprints} alt='footprint-3' className='footprints santa-footprint-3' />
        <img src={Footprints} alt='footprint-4' className='footprints santa-footprint-4' />
      </StyledWelcomeWindow>
      <AdventInfoModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
    </>
  );
};

export default WelcomeWindow;
