import React from 'react';
import styled from 'styled-components';
import Day from './Day/Day';

const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  height: 90vh;
  padding: 60px;
  grid-gap: 30px;
`;

const arr = new Array(24);

console.log(arr);

const Calendar = () => {
  return (
    <StyledCalendar>
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />

      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />

      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />

      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
    </StyledCalendar>
  );
};

export default Calendar;
