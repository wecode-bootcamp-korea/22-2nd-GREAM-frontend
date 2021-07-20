import React from 'react';
import styled from 'styled-components';
import Title from '../Title/Title';
import TableComponent from '../TableComponent/TableComponent';
import More from '../More/More';

const TransactionGraph = ({ getModalState, getModalTabIdState }) => {
  return (
    <Wrapper>
      <Title>체결 거래</Title>
      <Tabs>
        <Tab active>1주</Tab>
        <Tab>1개월</Tab>
        <Tab>3개월</Tab>
      </Tabs>
      <Graph>Graph</Graph>
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

const Graph = styled.div``;

export default TransactionGraph;
