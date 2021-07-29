import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function ImmediatePerchaseComponent({ currentBuyingPrice }) {
  return (
    <>
      <ConfirmPricePerchaseBox>
        <ConfirmPriceTitle>즉시 구매가</ConfirmPriceTitle>
        <InputPriceBox>
          <ConfirmPrice>
            <div>{Math.round(currentBuyingPrice)}</div>
            <ConfirmPriceWon>원</ConfirmPriceWon>
          </ConfirmPrice>
        </InputPriceBox>
      </ConfirmPricePerchaseBox>
      <Payment>
        <Point>포인트</Point>
        <ShipmentFee>배송비</ShipmentFee>

        <CalaulateTotalPriceBox>
          <CalaulateTotalPriceTitle>총결제금액</CalaulateTotalPriceTitle>
          <TotalPrice>{Math.round(currentBuyingPrice)}</TotalPrice>
          <TotalPriceWon>원</TotalPriceWon>
        </CalaulateTotalPriceBox>
      </Payment>
    </>
  );
}

const ConfirmPricePerchaseBox = styled.div`
  margin-bottom: 10px;
  margin-top: 30px;
  padding: 0 35px;
`;

const ConfirmPriceTitle = styled.div`
  font-weight: bold;
`;

const InputPriceBox = styled.div``;

const ConfirmPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
  height: 46px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: solid;
`;

const ConfirmPriceWon = styled.div`
  font-weight: bold;
  padding-left: 20px;
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
`;

const TotalPriceWon = styled.div`
  font-weight: bold;
`;
