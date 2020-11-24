import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { gsap } from 'gsap';
import DayCard from './DayCard/DayCard';

// const today = currentDate;
// let activeDay = 14;
// let previousDays;

// const firstDay = `Nov 29, 2020`;
// const beginDate = new Date(firstDay);

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'October',
  'September',
  'November',
  'December',
];

const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: space-between;
  flex-wrap: wrap;
  width: 70vw;
  margin: 500px auto 600px;
  position: relative;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
    width: 80vw;
  }

  @media (max-width: 1300px) {
    grid-template-columns: repeat(4, 1fr);
    width: 80vw;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    width: fit-content;
  }

  @media (max-width: 858px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }

  &:after {
    content: '';
    flex: auto;
  }

  @media (max-width: 768px) {
    margin: 270px auto;
  }
`;

function incDay(date, n) {
  let fudate = new Date(new Date(date).setDate(new Date(date).getDate() + n));
  fudate = `${fudate.getFullYear()} - ${fudate.getMonth() + 1} - ${fudate.toDateString().substring(8, 10)}`;
  return fudate;
}

const Calendar = () => {
  const [taskData, settaskData] = useState([]);
  const [taskEmptyData, settaskEmptyData] = useState([]);
  const wrapper = useRef(null);
  const [cookies, setCookie] = useCookies(['revealedDayCards']);
  const [currentDate, setCurrentDate] = useState(null);

  const revealedDayCards = cookies.revealedDayCards ? cookies.revealedDayCards : [];
  const completedDayCards = cookies.completedDayCards ? cookies.completedDayCards : [];

  if (!cookies.revealedDayCards) setCookie('revealedDayCards', []);
  if (!cookies.completedDayCards) setCookie('completedDayCards', []);

  useEffect(() => {
    const dayCards = Array.from(wrapper.current.children);

    dayCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, transform: 'translateY(-40px)' },
        { duration: 1, delay: i * 0.05, opacity: 1, transform: 'translateY(0)' }
      );
    });

    fetch('http://api.advent.akai.org.pl/api/tasks/now/', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      mode: 'cors',
    })
      .then((response) => {
        return response.json();
      })
      .then((res2) => {
        settaskData(res2);

        return res2;
      })
      .then((tasks) => {
        const tasksSize = tasks ? tasks.length : 0;

        const dateDetailss = tasksSize > 0 ? tasks[tasksSize - 1].taskDate.split('-') : ['2020', '11', '29'];
        const lastDayDate = new Date(`${months[+dateDetailss[1] - 1]} ${dateDetailss[2]}, ${dateDetailss[0]}`);

        const temp = [];

        for (let i = 0; i < 26 - tasksSize; i += 1) {
          temp.push({
            taskDay: tasksSize + i + 1,
            taskDate: incDay(lastDayDate, i + 1),
            level: '',
            category: '',
          });
        }
        settaskEmptyData(temp);
      });

    fetch('http://api.advent.akai.org.pl/api/today/', {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then((currentFetchedDate) => {
        return currentFetchedDate.json();
      })
      .then((today) => {
        const dateDetailss = today.today.split('-');

        setCurrentDate(new Date(`${months[+dateDetailss[1] - 1]} ${dateDetailss[2]}, ${dateDetailss[0]}`));
      });
  }, []);

  if (taskData && taskEmptyData && currentDate) {
    return (
      <StyledCalendar ref={wrapper} id='calendar'>
        {taskData.map((day, i) => {
          const isRevealed = revealedDayCards.includes(i + 1);
          const isCompleted = completedDayCards.includes(i + 1);

          const dateDetails = typeof day.taskDate === 'string' ? day.taskDate.split('-') : null;

          const cardDate =
            typeof day.taskDate === 'string'
              ? new Date(`${months[+dateDetails[1] - 1]} ${dateDetails[2]}, ${dateDetails[0]}`)
              : day.taskDate;

          return (
            <DayCard
              key={day.id}
              isActive={isRevealed}
              isRevealed={isRevealed}
              isCompleted={isCompleted}
              cardDate={cardDate}
              taskData={day}
              currentDate={currentDate}
              isAvailable
            />
          );
        })}
        {taskEmptyData.map((day) => {
          const dateDetails = typeof day.taskDate === 'string' ? day.taskDate.split('-') : null;

          const cardDate =
            typeof day.taskDate === 'string'
              ? new Date(`${months[+dateDetails[1] - 1]} ${dateDetails[2]}, ${dateDetails[0]}`)
              : day.taskDate;

          return (
            <DayCard
              key={day.taskDay}
              isActive={false}
              isRevealed={false}
              isCompleted={false}
              cardDate={cardDate}
              taskData={day}
              currentDate={currentDate}
              isAvailable={false}
            />
          );
        })}
      </StyledCalendar>
    );
  }

  return (
    <StyledCalendar ref={wrapper} id='calendar'>
      Wait...
    </StyledCalendar>
  );
};

export default Calendar;
