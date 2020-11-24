import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  background: #cccccc;
  z-index: 40;
  display: none;
  flex-direction: column;
  align-items: center;
  font-size: 3rem;
  text-align: center;
  height: 700px;
  width: 600px;
  box-shadow: 0px 0px 58px -15px rgba(0, 0, 0, 0.75);

  top: calc(50% - 350px);
  left: calc(50% - 300px);

  .task-level {
    position: relative;
    /* margin: 30px 0 0 0; */
    font-size: 2.4rem;
    align-self: flex-start;
    margin-left: 130px;
    margin-top: 140px;
    font-weight: bold;

    @media (max-width: 1024px) {
      margin-left: 70px;
      margin-top: 70px;
    }
  }

  @media (max-width: 1024px) {
    width: 90vw !important;
    height: 80vh !important;

    left: calc(50% - 45vw);
    top: calc(50% - 40vh);

    text-align: center;

    h4,
    h2 {
      margin: 0 5px;
    }
  }

  & .check-mark-icon {
    fill: green;
    transform-origin: bottom;
    height: 50px !important;
    width: 50px;
    bottom: 100px;
    margin-bottom: 30px;
    position: absolute;
    bottom: -45px;
    right: -25px;
  }

  .task-content {
    padding: 10px;
    overflow-y: scroll;
    font-size: 1.5rem;
    margin: 15px 40px 40px 120px;
    text-align: left;

    @media (max-width: 1024px) {
      margin: 10px 15px 30px 60px;
    }
  }

  & form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    align-self: flex-end;
    padding: 0 50px 50px 0;
    margin-top: auto;
  }

  & input[type='text'] {
    margin-bottom: 15px;
    margin-left: auto;
    margin-top: auto;
    font-size: 1.8rem;
    padding: 5px 0;
    background-color: #333333;
    color: #cccccc;
    text-align: center;
  }

  & button {
    margin-bottom: 30px;
    font-size: 1.5rem;
    border-radius: 10px;
    padding: 5px 0;
    background-color: #333333;
    color: #cccccc;
    width: 150px;
  }

  .task-icon {
    position: absolute;
    left: 7%;
    top: 5%;
    width: 100px;
    height: 100px;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    background-color: #333333;
    z-index: -1;
  }

  &:before {
    left: calc(7% + 42px);
    top: 0;
    width: 15px;
    height: 100%;
  }

  &:after {
    left: 0;
    top: calc(5% + 45px);
    height: 15px;
    width: 100%;
  }

  @media (max-width: 1024px) {
    & form {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 100%;
      align-self: flex-end;
      padding: 0 20px 20px 0;
    }

    .task-icon {
      position: absolute;
      left: 4%;
      top: 2%;
      width: 60px;
      height: 60px;
    }

    &:before {
      left: calc(4% + 20px);
      top: 0;
      width: 15px;
      height: 100%;
    }

    &:after {
      left: 0;
      top: calc(2% + 25px);
      height: 15px;
      width: 100%;
    }
  }
`;

export default StyledModal;
