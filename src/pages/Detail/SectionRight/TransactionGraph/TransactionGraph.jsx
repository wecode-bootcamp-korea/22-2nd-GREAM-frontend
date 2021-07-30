import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../Title/Title';
import TableComponent from '../TableComponent/TableComponent';
import More from '../More/More';
import Graph from './Graph/Graph';
import { PRODUCTS_API } from '../../../../config';

const TransactionGraph = ({
  getModalState,
  getModalTabIdState,
  mutatePrice,
  sortDate,
}) => {
  const [graphTabId, setGraphTabId] = useState(1);
  const [graphData, setGraphData] = useState({});

  const { id } = useParams();

  const fetchGraphData = (value = '') => {
    fetch(`${PRODUCTS_API}/${id}${makeGraphQuery(value)}`)
      .then(res => res.json())
      .then(data => setGraphData(data));
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

  const makeGraphQuery = value => {
    return value ? `?contract_choice=${value}` : '';
  };

  const changeTable = tabId => {
    setGraphTabId(tabId);
    if (tabId === 1) {
      fetchGraphData();
    } else if (tabId === 2) {
      fetchGraphData(`1m`);
    } else if (tabId === 3) {
      fetchGraphData(`3m`);
    }
  };

  return (
    <Wrapper>
      <Title>체결 거래</Title>
      <Tabs>
        {TABTITLE.map(({ tabId, title }) => {
          return (
            <Tab
              active={tabId === graphTabId}
              key={tabId}
              onClick={() => changeTable(tabId)}
            >
              {title}
            </Tab>
          );
        })}
      </Tabs>
      <GraphContainer graphTabId={graphTabId}>
        <Graph graphData={graphData} />
        <Graph graphData={graphData} />
        <Graph graphData={graphData} />
      </GraphContainer>
      <TableComponent thOne="거래가" thSecond="거래일">
        {sortDate(graphData.contract_all, 'contract_date')
          ?.slice(0, 4)
          .map(({ contract_date, contract_price }, idx) => {
            return (
              <tr key={idx}>
                <td>{mutatePrice(contract_price)}</td>
                <td>{contract_date}</td>
              </tr>
            );
          })}
      </TableComponent>
      <More
        getModalState={getModalState}
        getModalTabIdState={getModalTabIdState}
      >
        거래 내역 더보기
      </More>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex: 0 0 40%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0fr 0fr 1fr 1fr;
  margin-top: 52px;
`;

export const Tabs = styled.div`
  display: flex;
  width: 100%;
  padding: 4px;
  margin-bottom: 16px;
  border-radius: 12px;
  background-color: ${props => props.theme.cardBackground};
`;

export const Tab = styled.button`
  ${props => props.theme.resetBtn}
  flex: 1 0 20%;
  padding: 4px;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  border-radius: 8px;
  background-color: ${props => (props.active ? '#ffffff' : 'transparent')};
`;

const GraphContainer = styled.div`
  position: relative;
  margin-top: 18px;

  & > div:nth-child(1) {
    display: ${props => (props.graphTabId === 1 ? 'block' : 'none')};
  }

  & > div:nth-child(2) {
    display: ${props => (props.graphTabId === 2 ? 'block' : 'none')};
  }

  & > div:nth-child(3) {
    display: ${props => (props.graphTabId === 3 ? 'block' : 'none')};
  }
`;

const TABTITLE = [
  { tabId: 1, title: '1주' },
  { tabId: 2, title: '1개월' },
  { tabId: 3, title: '3개월' },
];

export default TransactionGraph;
