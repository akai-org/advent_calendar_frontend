import React, { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import DayCard from './DayCard/DayCard';
import { tasks } from './../../data/tasks';
import { gsap } from 'gsap';
import currentDate from 'data/currentDate';
import { transformDateToString } from 'components/Calendar/DayCard/DayCard';

const today = currentDate;
let activeDay = 14,
  previousDays;

console.log(today);

// console.log(transformDateToString(currentDate));

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
    // activeDay = data.tasks.filter((day) => day.id === activeDay)[0].id;
    activeDay = data.tasks.filter((day) => {
      return transformDateToString(new Date(day.taskDay)) === transformDateToString(new Date(today()));
    });

    activeDay = activeDay[0] ? activeDay[0].id : null;

    console.log(activeDay);
    previousDays = data.tasks.filter((day) => day.id <= activeDay);
    console.log(previousDays);
  });

const firstDay = `Nov 29, 2020`;
const beginDate = new Date(firstDay);

const StyledCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* grid-template-rows: repeat(5, 1fr); */
  /* height: 90vh; */
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

  /* & > .card1 {
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
  } */
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
    <>
      <StyledCalendar ref={wrapper} id='calendar'>
        {tasks.map((day, i) => {
          const isRevealed = revealedDayCards.includes(i + 1);

          const cardDate = new Date(day.taskDay);
          // cardDate.setDate(beginDate.getDate() + i);

          return (
            <DayCard
              key={'card' + i + 1}
              front={day.id}
              back='JS'
              className={`card${day.id}`}
              isActive={isRevealed ? true : null}
              // isActive={i <= activeDay - 1 ? null : null}
              revealed={isRevealed ? true : null}
              cardDate={cardDate}
              taskData={day}
              icon={`/src/assets/svg/days/${i + 1}.svg`}
            />
          );
        })}
      </StyledCalendar>
    </>
  );
};

export default Calendar;
