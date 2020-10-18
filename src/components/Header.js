import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.header`
  font-size: 5rem;
  width: 100%;
  text-align: center;
`;

const Header = ({ children }) => <StyledHeading>{children}</StyledHeading>;

export default Header;
