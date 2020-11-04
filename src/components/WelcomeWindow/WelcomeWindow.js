import React, { useState } from 'react';
import SantaImage from 'assets/svg/santa.svg';
import Up from 'assets/svg/up.svg';
import { ReactComponent as AkaiLogo } from 'assets/svg/logo-color.svg';
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
          <span className='page-header-textx'>
            Kalendarz Adwentowy <br /> Programisty <br />
          </span>
          <span class='info'>
            Designed and created by
            <a href='https://akai.org.pl' class='info-icon'>
              <AkaiLogo />
            </a>
            <QuestionMark class='info-icon' onClick={() => setModalVisible(1)} />
          </span>
          <br />
          <a href='#calendar' className='target-link'>
            Do kalendarza
          </a>
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
