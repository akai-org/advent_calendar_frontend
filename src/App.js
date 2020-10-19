import Calendar from 'components/Calendar/Calendar';
import Header from 'components/Header';
import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './theme/GlobalStyle/GlobalStyle';
import AdventWindow from 'components/AdventWindow/AdventWindow';

const StyledAppWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #212559;
  position: relative;

  overflow: hidden;
`;

const App = () => {
  return (
    <StyledAppWrapper>
      <AdventWindow />
      <GlobalStyle />
      {/* <Header>Kalendarz adwentowy</Header> */}
      <Calendar />
    </StyledAppWrapper>
  );
};

export default App;
