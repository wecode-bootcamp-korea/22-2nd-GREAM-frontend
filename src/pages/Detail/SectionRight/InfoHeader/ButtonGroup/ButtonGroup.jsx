import React from 'react';
import styled from 'styled-components';
import Button from './Button/Button';

const ButtonGroup = ({ mainInfo, mutatePrice }) => {
  const { current_buying_price = 0, current_selling_price = 0 } = mainInfo;

  const checkNull = price => {
    return !price ? '- ' : mutatePrice(price);
  };
  return (
    <Wrapper>
      <Button
        title="구매"
        price={`${checkNull(current_buying_price)}원`}
        now="즉시 구매가"
      />
      <Button
        title="판매"
        price={`${checkNull(current_selling_price)}원`}
        now="즉시 판매가"
        isSale="sale"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${props => props.theme.setFlex('center', 'center')};
`;

export default ButtonGroup;
