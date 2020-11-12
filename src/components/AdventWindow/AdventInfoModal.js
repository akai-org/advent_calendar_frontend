import React, { useEffect, useRef } from 'react';
import StyledCloseButton from 'components/Modal/CloseButton.styled';
import propTypes from 'prop-types';
import { ReactComponent as Cocard } from 'assets/svg/cocard-2.svg';
import StyledAdventInfoModal from './AdventInfoModal.styled';

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
      <Cocard />
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
  isModalVisible: propTypes.number.isRequired,
  setModalVisible: propTypes.func.isRequired,
};

export default AdventInfoModal;
