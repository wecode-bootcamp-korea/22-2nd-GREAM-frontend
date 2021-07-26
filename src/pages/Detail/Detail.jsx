import React from 'react';
import styled from 'styled-components';
import SectionLeft from './SectionLeft/SectionLeft';
import SectionRight from './SectionRight/SectionRight';

const Detail = ({ productList }) => {
  return (
    <Wrapper>
      <SectionLeft />
      <SectionRight />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  ${props => props.theme.setFlex('center', 'flex-start')};
  margin: 0 auto;
`;

export default Detail;
