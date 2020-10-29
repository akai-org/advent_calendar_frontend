import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import StyledCloseButton from 'components/Modal/CloseButton.styled';
import gsap from 'gsap/gsap-core';

const StyledAdventInfoModal = styled.div`
  display: ${({ isModalVisible }) => (isModalVisible ? 'flex' : 'none')};
  position: absolute;
  width: 500px;
  height: 600px;
  background-color: powderblue;
  left: calc(50% - 250px);
  top: calc(50% - 300px);
  z-index: 30;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: 20px 50px;

  animation: appear 600ms ease-in-out;

  @keyframes appear {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AdventInfoModal = ({ isModalVisible, setModalVisible }) => {
  const modal = useRef(null);

  const listener = (e) => {
    if (!modal.current || !modal.current.contains(e.target)) {
      setModalVisible(0);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, []);

  return (
    <StyledAdventInfoModal ref={modal} isModalVisible={isModalVisible}>
      <StyledCloseButton />
      <h2>Kalendarz Adwnetowy by AKAI</h2>
      <h4>Edycja 2020</h4>
      <p class='info-modal-paragraph'>
        Cześć! Kalendarz adwentowy czeka z nowymi wyzwaniami. Codzienne zadania programistyczne (ale nie tylko) przez
        cały okres trwania adwentu czekają na rozwiązania.
        <br />
        <br />
        Wracaj tu codziennie, by sprawdzić co na ciebie czeka. Jeżeli w dany dzień klikniesz zadanie, to możesz je
        rozwiązać później, więc nie martw się jeżeli nie znajdziejsz od razu czasu.
        <br />
        <br />
        Strona w dużej mierze oparta jest na ciasteczkach, toteż zalecamy, aby nie usuwać ich do końca czasu trwania
        adwentu. Jeżeli wykonasz wszystkie zadania, czeka cię nagroda.
        <br />
        <br />
        Projekt wykonany w ramach członkostwa w kole naukowym "Akademickie Koło Aplikacji Internetowych" na Politechnice
        Poznańskiej. Dowiedz się o nas więcej <a href='https://akai.org.pl'>tutaj</a>.
      </p>
    </StyledAdventInfoModal>
  );
};

export default AdventInfoModal;