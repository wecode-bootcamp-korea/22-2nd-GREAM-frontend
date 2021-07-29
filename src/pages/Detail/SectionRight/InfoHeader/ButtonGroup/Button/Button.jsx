import React from 'react';
import styled from 'styled-components';

const Button = ({ title, price, now, isSale }) => {
  return (
    <Wrapper sale={isSale}>
      <PartLeft sale={isSale}>{title}</PartLeft>
      <PartRight>
        <NowPrice>{price}</NowPrice>
        <StaticNow>{now}</StaticNow>
      </PartRight>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  ${props => props.theme.resetBtn}
  ${props => props.theme.setFlex('flex-start', 'center')};
  width: 100%;
  height: 60px;
  margin-right: 16px;
  border-radius: 14px;
  background-color: ${props =>
    props.sale ? props.theme.green : props.theme.red};
`;

const PartLeft = styled.div`
  flex: 0 0 28%;
  line-height: 60px;
  height: 100%;
  font-size: 18px;
  color: white;
  border-right: 1px solid ${props => (props.sale ? '#3baf6f' : '#e5584c')};
`;

const PartRight = styled.div`
  padding: 10px;
`;

const NowPrice = styled.span`
  display: block;
  color: white;
  letter-spacing: 0.4px;
  font-size: 15px;
  font-weight: bold;
`;

const StaticNow = styled.span`
  display: block;
  text-align: left;
  font-size: 11px;
  color: white;
`;

export default Button;
