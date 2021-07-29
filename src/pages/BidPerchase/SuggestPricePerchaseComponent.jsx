import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function SuggestPricePerchaseComponent({
  suggestedPriceValue,
  setSuggestedPriceValue,
}) {
  const handleSuggestingPrice = event => {
    setSuggestedPriceValue(event.target.value);
  };

  return (
    <>
      <SuggestPricePerchaseBox>
        <SuggestPriceTitle>구매 희망가</SuggestPriceTitle>
        <InputPriceBox>
          <InputPrice
            className=""
            type="number"
            placeholder="희망가 입력      "
            onKeyUp={handleSuggestingPrice}
            maxlength="6"
          />
        </InputPriceBox>
        <InputPriceWon>원</InputPriceWon>
      </SuggestPricePerchaseBox>
      <Payment>
        <Point>포인트</Point>
        <ShipmentFee>배송비</ShipmentFee>

        <CalaulateTotalPriceBox>
          <CalaulateTotalPriceTitle>총결제금액</CalaulateTotalPriceTitle>
          <TotalPrice>{suggestedPriceValue}</TotalPrice>
          <TotalPriceWon>원</TotalPriceWon>
        </CalaulateTotalPriceBox>
      </Payment>
    </>
  );
}
const SuggestPricePerchaseBox = styled.div`
  margin-bottom: 10px;
  margin-top: 30px;
  padding: 0 35px;
`;

const SuggestPriceTitle = styled.div`
  font-weight: bold;
`;

const InputPriceBox = styled.div`
  //width: 100%;
`;

const InputPrice = styled.input`
  width: 100%;
  margin-top: 10px;
  height: 46px;
  border-top: none;
  border-left: none;
  border-right: none;
  text-align: right;
  -webkit-appearance: none;
  margin: 0;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  padding-right: 30px;
  font-size: 18px;
`;

const InputPriceWon = styled.span`
  font-weight: bold;
  width: 30px;
  position: relative;
  left: 540px;
  top: -32px;
`;

const Payment = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 35px;
`;

const Point = styled.div`
  margin: 5px;
  color: #bbbbbb;
`;

const ShipmentFee = styled.div`
  margin: 5px;
  color: #bbbbbb;
`;

const CalaulateTotalPriceBox = styled.div`
  width: 100%;
  margin-bottom: 5px;
  margin-top: 10px;
  ${({ theme }) => theme.setFlex('space-between', 'center')};
  border-top: solid;
  border-width: 1px;
  border-top-color: #bbbbbb;
  padding-top: 10px;
`;

const CalaulateTotalPriceTitle = styled.div`
  font-weight: bold;
`;

const TotalPrice = styled.div`
  padding-left: 370px;
  font-size: 18px;
  padding-right: 5px;
`;

const TotalPriceWon = styled.div`
  font-weight: bold;
  padding-right: 5px;
`;
