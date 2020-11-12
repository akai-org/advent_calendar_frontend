import styled from 'styled-components';

const StyledAdventInfoModal = styled.div`
  display: ${({ isModalVisible }) => (isModalVisible ? 'flex' : 'none')};
  position: fixed;
  width: 30vw;
  max-height: 90vh;
  background-color: #cccccc;
  left: calc(50% - 15vw);
  top: 10vh;
  z-index: 30;
  flex-direction: column;
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

    font-size: 1.2rem;

    h4,
    h2 {
      margin: 0 5px;
    }
  }
`;

export default StyledAdventInfoModal;
