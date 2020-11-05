import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { transformDateToString } from 'components/Calendar/DayCard/DayCard';
import { gsap } from 'gsap';
import currentDate from 'data/currentDate';
import DayCard from './DayCard/DayCard';

// const today = currentDate;
// let activeDay = 14;
// let previousDays;

// const firstDay = `Nov 29, 2020`;
// const beginDate = new Date(firstDay);

const StyledCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 70vw;
  padding: 20px;
  margin: 500px auto 600px;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    margin: 250px auto;
    width: fit-content;
  }
`;

const Calendar = () => {
  const [taskData, settaskData] = useState(null);
  const wrapper = useRef(null);
  const [cookies, setCookie] = useCookies(['revealedDayCards']);

  const revealedDayCards = cookies.revealedDayCards ? cookies.revealedDayCards : [];
  const completedDayCards = cookies.completedDayCards ? cookies.completedDayCards : [];

  if (!cookies.revealedDayCards) setCookie('revealedDayCards', []);
  if (!cookies.completedDayCards) setCookie('completedDayCards', []);

  // alert(cookies.revealedDayCards[0]);

  useEffect(() => {
    const dayCards = Array.from(wrapper.current.children);

    dayCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, transform: 'translateY(-40px)' },
        { duration: 1, delay: i * 0.05, opacity: 1, transform: 'translateY(0)' }
      );
    });

    fetch('https://run.mocky.io/v3/a30eece5-9c60-4d46-a327-923da2e32069', {
      method: 'POST',
      body: { tasks: [{ id: 1 }] },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const activeDay = data.tasks.filter((day) => {
          return transformDateToString(new Date(day.taskDay)) === transformDateToString(currentDate);
        });

        // taskData = data.tasks;
        settaskData(data.tasks);
        const dateToCheck = activeDay[0] ? activeDay[0].id : null;
        const previousDays = data.tasks.filter((day) => day.id <= dateToCheck);
      });
  }, []);

  if (taskData)
    return (
      <StyledCalendar ref={wrapper} id='calendar'>
        {taskData.map((day, i) => {
          const isRevealed = revealedDayCards.includes(i + 1);
          const isCompleted = completedDayCards.includes(i + 1);

          const cardDate = new Date(day.taskDay);

          return (
            <DayCard
              key={day.id}
              isActive={isRevealed ? true : null}
              isRevealed={isRevealed ? true : null}
              isCompleted={isCompleted ? true : null}
              cardDate={cardDate}
              taskData={day}
            />
          );
        })}
      </StyledCalendar>
    );

  return (
    <StyledCalendar ref={wrapper} id='calendar'>
      Wait...
    </StyledCalendar>
  );
};

export default Calendar;
