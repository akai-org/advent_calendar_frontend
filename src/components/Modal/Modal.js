import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: absolute;
  background: powderblue;
  z-index: 20;
  border-radius: 10px;
  display: ${({ isModalVisible }) => (isModalVisible ? 'block' : 'none')};
`;

const StyledCloseButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  background-color: black;
  height: 10px;
  width: 10px;

  &:before,
  &:after {
    width: 100%;
    height: 3px;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export default StyledModal;
