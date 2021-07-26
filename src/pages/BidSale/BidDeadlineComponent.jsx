import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function BidDeadlineComponent({
  buttonDate,
  setButtonDate,
  setButtonId,
  buttonId,
}) {
  const handleButtonForDeadline = event => {
    const { name, id } = event.target;
    setButtonDate(name);
    setButtonId(id);
  };
  //console.log('buttondate 스테이트확인', buttonDate);

  // var date = new Date();

  // date.setDate(date.getDate() + parseInt(buttonDate)); //현재날짜에서 - 일 후

  var date = new Date();
  date.setDate(date.getDate() + parseInt(buttonDate));
  console.log('date', date);
  var month = '' + (date.getMonth() + 1);
  console.log('month', month);
  var day = '' + date.getDate();
  console.log('day', day);
  var year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  let deadlineDate = [year, month, day].join('-');

  const isDeadlineInvalid = date.toLocaleString() === 'Invalid Date';

  return (
    <BidDeadline>
      <BidDeadlineTitle>입찰 마감기한</BidDeadlineTitle>
      <BidDeadlineNotice>
        <SelectedButton>
          {isDeadlineInvalid ? '--' : buttonDate}일
        </SelectedButton>
        <SelectedDeadlineDate>
          <span>(</span>
          <span>{isDeadlineInvalid ? '마감일자 선택' : deadlineDate}</span>
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
  font-weight: bold;
`;

const BidDeadlineNotice = styled.div``;

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
