import React, { useState } from 'react';
import styled from 'styled-components';
import Title from '../Title/Title';
import TableComponent from '../TableComponent/TableComponent';
import More from '../More/More';
import Graph from './Graph/Graph';

const TransactionGraph = ({ getModalState, getModalTabIdState }) => {
  const [graphTabId, setGraphTabId] = useState(1);
  const changeTable = id => {
    setGraphTabId(id);
  };

  return (
    <Wrapper>
      <Title>체결 거래</Title>
      <Tabs>
        {TABTITLE.map(({ id, title }) => {
          return (
            <Tab
              active={id === graphTabId}
              key={id}
              onClick={() => changeTable(id)}
            >
              {title}
            </Tab>
          );
        })}
      </Tabs>
      <GraphContainer graphTabId={graphTabId}>
        <Graph />
        <Graph />
        <Graph />
      </GraphContainer>
      <TableComponent thOne="거래가" thSecond="거래일">
        <tr>
          <td>266,000</td>
          <td>21/7/21</td>
        </tr>
        <tr>
          <td>266,000</td>
          <td>21/7/21</td>
        </tr>
        <tr>
          <td>266,000</td>
          <td>21/7/21</td>
        </tr>
        <tr>
          <td>266,000</td>
          <td>21/7/21</td>
        </tr>
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
  z-index: -1;
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
  { id: 1, title: '1주' },
  { id: 2, title: '1개월' },
  { id: 3, title: '3개월' },
];

export default TransactionGraph;
