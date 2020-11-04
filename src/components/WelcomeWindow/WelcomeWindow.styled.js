import styled from 'styled-components';

const StyledWelcomeWindow = styled.header`
  min-height: 100vh;
  width: 100%;
  background-color: #333333;
  position: relative;
  z-index: 30;

  & img {
    position: absolute;
  }

  .santa-claus {
    width: 52vw;
    top: 130px;
    left: 100px;
    z-index: 10;

    @media (max-width: 1366px) {
      width: 600px;
      left: 50px;
      top: 300px;
    }

    @media (max-width: 1024px) {
      width: 360px;
      left: 20px;
      top: 55vh;
    }
  }

  .santa-up {
    width: 100vw;
    z-index: 1;
    top: 60vh;
    transform-origin: center;
    transform: scaleY(0.75);

    @media (max-width: 1024px) {
      top: 90vh;
      transform: scale(1.6);
    }
  }

  .footprints {
    z-index: 2;
    width: 230px;

    @media (max-width: 1024px) {
      width: 80px;
    }
  }

  .santa-footprint-1 {
    bottom: -2vh;
    left: 40vw;

    @media (max-width: 1024px) {
      bottom: -2vh;
      left: 50vw;
    }
  }

  .santa-footprint-2 {
    bottom: -15vh;
    left: 53vw;

    @media (max-width: 1024px) {
      display: none;
    }
  }

  .santa-footprint-3 {
    bottom: -14vh;
    left: 72vw;

    @media (max-width: 1024px) {
      bottom: -2vh;
      left: 87vw;
    }
  }

  .santa-footprint-4 {
    bottom: -27vh;
    left: 83vw;
  }

  .page-header {
    color: #ffd259;
    font-size: 6rem;
    text-align: right;
    position: absolute;
    right: 10vw;
    top: 15vh;
    text-transform: uppercase;
    z-index: 30;

    @media (max-width: 1024px) {
      font-size: 2rem;
    }
  }

  .info {
    font-size: 1.5rem;
    color: #cccccc;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    & svg {
      width: 20px;
      height: 20px;
      margin-left: 5px;
      cursor: pointer;

      fill: #cccccc;
    }
  }

  & .target-link {
    font-size: 0.8em;
    text-decoration: underline;
    color: #cccccc;
    transition: transform 200ms ease-in;
    position: relative;
    display: block;

    &:hover {
      transform: translateY(-20px);
    }
  }
`;

export default StyledWelcomeWindow;
