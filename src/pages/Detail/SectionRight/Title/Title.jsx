import React from 'react';
import styled from 'styled-components';

const Title = ({ children }) => {
  return <TitleH1>{children}</TitleH1>;
};

const TitleH1 = styled.h1`
  padding-bottom: 16px;
  font-size: 18px;
  font-weight: bold;
`;
export default Title;
