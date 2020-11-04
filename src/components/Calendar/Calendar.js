import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { transformDateToString } from 'components/Calendar/DayCard/DayCard';
import { gsap } from 'gsap';
import currentDate from 'data/currentDate';
import DayCard from './DayCard/DayCard';
import { tasks } from '../../data/tasks.json';

// const today = currentDate;
// let activeDay = 14;
// let previousDays;

fetch('https://run.mocky.io/v3/d3ffc5d3-7ad1-4a20-9545-61b698690c6c', {
  method: 'POST',
  body: {
    tasks,
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const activeDay = data.tasks.filter((day) => {
      return transformDateToString(new Date(day.taskDay)) === transformDateToString(currentDate);
    });

    const dateToCheck = activeDay[0] ? activeDay[0].id : null;
    const previousDays = data.tasks.filter((day) => day.id <= dateToCheck);
  });

// const firstDay = `Nov 29, 2020`;
// const beginDate = new Date(firstDay);

const StyledCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 70vw;
  padding: 20px;
  margin: 500px auto;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    margin: 250px auto;

    & > * {
      height: 200px;
      width: 100%;
    }
  }
`;

const Calendar = () => {
  const wrapper = useRef(null);
  const [cookies, setCookie] = useCookies(['revealedDayCards']);

  const revealedDayCards = cookies.revealedDayCards ? cookies.revealedDayCards : [];

  if (!cookies.revealedDayCards) setCookie('revealedDayCards', []);
  if (!cookies.correctAnswersCards) setCookie('correctAnswersCards', []);

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
    <StyledCalendar ref={wrapper} id='calendar'>
      {tasks.map((day, i) => {
        const isRevealed = revealedDayCards.includes(i + 1);

        const cardDate = new Date(day.taskDay);
        // cardDate.setDate(beginDate.getDate() + i);

        return (
          <DayCard
            key={day.id}
            isActive={isRevealed ? true : null}
            revealed={isRevealed ? true : null}
            cardDate={cardDate}
            taskData={day}
          />
        );
      })}
    </StyledCalendar>
  );
};

export default Calendar;
