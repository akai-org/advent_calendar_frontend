import Calendar from 'components/Calendar/Calendar';
import Header from 'components/Header';
import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './theme/GlobalStyle/GlobalStyle';

const StyledAppWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: darkgray;
`;

const App = () => {
  return (
    <StyledAppWrapper>
      <GlobalStyle />
      <Header>Kalendarz adwentowy</Header>
      <Calendar></Calendar>
    </StyledAppWrapper>
  );
};

export default App;
