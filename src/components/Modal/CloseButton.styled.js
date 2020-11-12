const { default: styled } = require('styled-components');

const StyledCloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
  height: 20px;
  width: 20px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  &:before,
  &:after {
    content: '';
    width: 100%;
    height: 3px;
    background-color: black;
    z-index: 25;
    position: absolute;
    top: 10px;
    left: 0;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export default StyledCloseButton;
