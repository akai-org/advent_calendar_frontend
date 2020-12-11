import React, { forwardRef } from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: absolute;
  background: powderblue;
  z-index: 20;
  border-radius: 10px;
  /* display: ${({ isModalVisible }) => (isModalVisible ? 'block' : 'none')}; */
`;

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
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const Modal = forwardRef(({ isModalVisible, showDayModal }, ref) => {
  return (
    <StyledModal ref={ref} isModalVisible={isModalVisible}>
      <StyledCloseButton onClick={() => showDayModal()} />
    </StyledModal>
  );
});

export default Modal;
