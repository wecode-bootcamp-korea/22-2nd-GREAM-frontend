import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../Title/Title';
import TableComponent from '../TableComponent/TableComponent';
import More from '../More/More';

const History = ({
  getModalState,
  getModalTabIdState,
  bidding_detail,
  mutatePrice,
}) => {
  const [historyTabId, setHistoryTabId] = useState(1);

  if (!bidding_detail) return <span>Loading...</span>;

  const { buying_bidding, selling_bidding } = bidding_detail;

  const changeTable = id => {
    setHistoryTabId(id);
  };

  return (
    <Wrapper>
      <Title>입찰 내역</Title>
      <Tabs>
        {TABTITLE.map(({ id, title }) => {
          return (
            <Tab
              active={id === historyTabId}
              key={id}
              onClick={() => changeTable(id)}
            >
              {title}
            </Tab>
          );
        })}
      </Tabs>
      <TableWrapper historyTabId={historyTabId}>
        <TableComponent thOne="판매 희망가" thSecond="거래일">
          {selling_bidding.slice(0, 4).map((history, idx) => {
            return (
              <tr key={idx}>
                <td>{mutatePrice(history.selling_bidding_price)}</td>
                <td>{history.selling_bidding_date}</td>
              </tr>
            );
          })}
        </TableComponent>
        <TableComponent thOne="구매 희망가" thSecond="거래일">
          {buying_bidding.slice(0, 4).map((history, idx) => {
            return (
              <tr key={idx}>
                <td>{mutatePrice(history.buying_bidding_price)}</td>
                <td>{history.buying_bidding_date}</td>
              </tr>
            );
          })}
        </TableComponent>
      </TableWrapper>
      <More
        getModalState={getModalState}
        getModalTabIdState={getModalTabIdState}
        historyTabId={historyTabId}
        history="true"
      >
        입찰 내역 더보기
      </More>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex: 0 0 30%;
  margin-top: 52px;
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
  padding: 4px;
  margin-bottom: 16px;
  border-radius: 12px;
  background-color: ${props => props.theme.cardBackground};
`;

const Tab = styled.button`
  ${props => props.theme.resetBtn}
  flex: 1 0 20%;
  padding: 4px;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  border-radius: 8px;
  background-color: ${props => (props.active ? '#ffffff' : 'transparent')};
`;

const TableWrapper = styled.div`
  position: relative;
  height: 170px;

  & > table {
    position: absolute;
  }

  & > table:nth-child(1) {
    display: ${props => (props.historyTabId === 1 ? 'block' : 'none')};
  }

  & > table:nth-child(2) {
    display: ${props => (props.historyTabId === 2 ? 'block' : 'none')};
  }
`;

const TABTITLE = [
  { id: 1, title: '판매 입찰' },
  { id: 2, title: '구매 입찰' },
];

export default History;
