import Calendar from 'components/Calendar/Calendar';
import React from 'react';
import styled from 'styled-components';
import WelcomeWindow from 'components/WelcomeWindow/WelcomeWindow';
import Down from 'assets/svg/down.svg';
import GlobalStyle from './theme/GlobalStyle/GlobalStyle';

const StyledAppWrapper = styled.main`
  width: 100%;
  /* height: 100vh; */
  background-color: transparent;
  position: relative;
  overflow: hidden;

  .santa-down {
    position: absolute;
    bottom: 0;
    width: 100vw;
  }

  @media (max-width: 1024px) {
    height: auto;
  }
`;

const App = () => {
  return (
    <StyledAppWrapper>
      <WelcomeWindow />
      {/* <AdventWindow /> */}
      <GlobalStyle />
      {/* <Header>Kalendarz adwentowy</Header> */}
      <Calendar />
      <img src={Down} alt='down' className='santa-down' />
    </StyledAppWrapper>
  );
};

export default App;
