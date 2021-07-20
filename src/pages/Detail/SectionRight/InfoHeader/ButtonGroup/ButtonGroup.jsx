import React from 'react';
import styled from 'styled-components';
import Button from './Button/Button';

const ButtonGroup = () => {
  return (
    <Wrapper>
      <Button title="구매" price="320,500원" now="즉시 구매가" />
      <Button title="판매" price="350,000원" now="즉시 판매가" isSale="sale" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${props => props.theme.setFlex('center', 'center')};
`;

export default ButtonGroup;
