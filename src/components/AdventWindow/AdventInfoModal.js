import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import StyledCloseButton from 'components/Modal/CloseButton.styled';
import propTypes from 'prop-types';

const StyledAdventInfoModal = styled.div`
  display: ${({ isModalVisible }) => (isModalVisible ? 'flex' : 'none')};
  position: fixed;
  width: 30vw;
  max-height: 90vh;
  background-color: #cccccc;
  left: calc(50% - 15vw);
  /* top: calc(50% - 25vh); */
  top: 10vh;
  z-index: 30;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: 20px 50px;
  font-size: 1.5rem;
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

  @media (max-width: 1024px) {
    width: 90vw;
    height: 80vh;
    padding: 10px 15px;

    left: calc(50% - 45vw);
    top: calc(50% - 40vh);

    text-align: center;

    h4,
    h2 {
      margin: 0 5px;
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
      <StyledCloseButton onClick={() => setModalVisible(!isModalVisible)} />
      <h2>Kalendarz Adwentowy by AKAI</h2>
      <h4>Edycja 2020</h4>
      <p className='info-modal-paragraph'>
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
        Projekt wykonany w ramach członkostwa w kole naukowym &quot;Akademickie Koło Aplikacji Internetowych&quot; na
        Politechnice Poznańskiej. Dowiedz się o nas więcej <a href='https://akai.org.pl'>tutaj</a>.
      </p>
    </StyledAdventInfoModal>
  );
};

AdventInfoModal.propTypes = {
  isModalVisible: propTypes.bool.isRequired,
  setModalVisible: propTypes.func.isRequired,
};

export default AdventInfoModal;
