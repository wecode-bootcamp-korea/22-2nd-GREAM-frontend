import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function BidDeadlineComponent({
  buttonDate,
  setButtonDate,
  setButtonId,
}) {
  const handleButtonForDeadline = event => {
    const { name, id } = event.target;

    setButtonDate(name);
    setButtonId(id);
  };

  const date = new Date();
  date.setDate(date.getDate() + parseInt(buttonDate));

  return (
    <BidDeadline>
      <BidDeadlineTitle>입찰 마감기한</BidDeadlineTitle>
      <BidDeadlineNotice>
        <SelectedButton>{buttonDate}일</SelectedButton>
        <SelectedDeadlineDate>
          <span>(</span>
          <span>{date.toLocaleString()}</span>
          <span>)</span>
        </SelectedDeadlineDate>
        <DeadlineButtonBox>
          {/* {map} */}
          <ButtonForDeadline
            type="button"
            name="1"
            id="1"
            dataDate="1"
            onClick={handleButtonForDeadline}
            isButtonClicked={buttonDate === '1'}
          >
            1<span>일</span>
          </ButtonForDeadline>
          <ButtonForDeadline
            type="button"
            id="2"
            name="3"
            dataDate="3"
            onClick={handleButtonForDeadline}
            isButtonClicked={buttonDate === '3'}
          >
            3<span>일</span>
          </ButtonForDeadline>
          <ButtonForDeadline
            type="button"
            id="3"
            name="7"
            dataDate="7"
            onClick={handleButtonForDeadline}
            isButtonClicked={buttonDate === '7'}
          >
            7<span>일</span>
          </ButtonForDeadline>
          <ButtonForDeadline
            type="button"
            id="4"
            name="30"
            dataDate="30"
            onClick={handleButtonForDeadline}
            isButtonClicked={buttonDate === '30'}
          >
            30<span>일</span>
          </ButtonForDeadline>
          <ButtonForDeadline
            type="button"
            id="5"
            name="60"
            dataDate="60"
            onClick={handleButtonForDeadline}
            isButtonClicked={buttonDate === '60'}
          >
            60<span>일</span>
          </ButtonForDeadline>
        </DeadlineButtonBox>
      </BidDeadlineNotice>
    </BidDeadline>
  );
}

const BidDeadline = styled.div`
  margin-top: 10px;
  background-color: #ffffff;
  padding: 0 35px;
  width: 100%;
`;

const BidDeadlineTitle = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;

const BidDeadlineNotice = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const SelectedButton = styled.span`
  margin-right: 5px;
`;

const SelectedDeadlineDate = styled.span``;

const DeadlineButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const ButtonForDeadline = styled.button`
  width: 20%;
  height: 50px;
  margin: 3px;
  border-radius: 10px;
  border: solid;
  border-width: 1px;
  border-color: #bbbbbb;
  margin-top: 10px;
  background-color: #ffffff;
  cursor: pointer;
  border: solid;
  border-width: ${props => (props.isButtonClicked ? '2px' : '1px')};
`;
