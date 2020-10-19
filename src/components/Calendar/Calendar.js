import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import DayCard from './DayCard/DayCard';
import { tasks } from './../../data/tasks';
import { gsap } from 'gsap';

const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(6, 1fr);
  height: 100%;
  padding: 20px;
  grid-gap: 20px;

  & > .card1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  & > .card2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  & > .card3 {
    grid-area: 1 / 3 / 2 / 4;
  }
  & > .card4 {
    grid-area: 1 / 4 / 2 / 5;
  }
  & > .card5 {
    grid-area: 1 / 5 / 2 / 6;
  }
  & > .card6 {
    grid-area: 1 / 6 / 2 / 7;
  }
  & > .card7 {
    grid-area: 1 / 7 / 2 / 8;
  }
  & > .card8 {
    grid-area: 1 / 8 / 2 / 9;
  }
  & > .card9 {
    grid-area: 2 / 8 / 3 / 9;
  }
  & > .card10 {
    grid-area: 3 / 8 / 4 / 9;
  }
  & > .card11 {
    grid-area: 4 / 8 / 5 / 9;
  }
  & > .card12 {
    grid-area: 5 / 8 / 6 / 9;
  }
  & > .card13 {
    grid-area: 6 / 8 / 7 / 9;
  }
  & > .card14 {
    grid-area: 6 / 7 / 7 / 8;
  }
  & > .card15 {
    grid-area: 6 / 6 / 7 / 7;
  }
  & > .card16 {
    grid-area: 6 / 5 / 7 / 6;
  }
  & > .card17 {
    grid-area: 6 / 4 / 7 / 5;
  }
  & > .card18 {
    grid-area: 6 / 3 / 7 / 4;
  }
  & > .card19 {
    grid-area: 6 / 2 / 7 / 3;
  }
  & > .card20 {
    grid-area: 6 / 1 / 7 / 2;
  }
  & > .card21 {
    grid-area: 5 / 1 / 6 / 2;
  }
  & > .card22 {
    grid-area: 4 / 1 / 5 / 2;
  }
  & > .card23 {
    grid-area: 3 / 1 / 4 / 2;
  }
  & > .card24 {
    grid-area: 2 / 1 / 3 / 2;
  }
`;

const Calendar = () => {
  const wrapper = useRef(null);

  useEffect(() => {
    const dayCards = Array.from(wrapper.current.children);

    dayCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, transform: 'translateY(-40px)' },
        { duration: 1, delay: i * 0.05, opacity: 1, transform: 'translateY(0)' }
      );
    });
  }, []);

  return (
    <>
      <StyledCalendar ref={wrapper}>
        {tasks.map((day) => (
          <DayCard front={day.dayNumber} back='JS' className={`card${day.dayNumber}`} />
        ))}
      </StyledCalendar>
    </>
  );
};

export default Calendar;
