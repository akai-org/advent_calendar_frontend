import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const StyledHeading = styled.header`
  font-size: 5rem;
  width: 100%;
  text-align: center;
`;

const Header = ({ children }) => <StyledHeading>{children}</StyledHeading>;

Header.propTypes = {
  children: propTypes.element.isRequired,
};

export default Header;
