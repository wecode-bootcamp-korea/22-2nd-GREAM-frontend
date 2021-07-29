import React from 'react';
import styled from 'styled-components';
import TableComponent from '../../TableComponent/TableComponent';

const ModalTableGroup = ({ tabId, detailData, mutatePrice }) => {
  if (!detailData.bidding_detail) return <span>Loading...</span>;

  const { contract_all, bidding_detail } = detailData;
  const { buying_bidding, selling_bidding } = bidding_detail;

  return (
    <TableWrapper openTab={tabId}>
      <TableComponent thOne="거래가" thSecond="거래일" modal={true}>
        {contract_all?.map(({ contract_date, contract_price }, idx) => {
          return (
            <tr key={idx}>
              <td>{mutatePrice(contract_price)}</td>
              <td>{contract_date}</td>
            </tr>
          );
        })}
      </TableComponent>
      <TableComponent thOne="판매 희망가" thSecond="수량">
        {selling_bidding.map((history, idx) => {
          return (
            <tr key={idx}>
              <td>{mutatePrice(history.selling_bidding_price)}</td>
              <td>{history.selling_bidding_date}</td>
            </tr>
          );
        })}
      </TableComponent>
      <TableComponent thOne="구매 희망가" thSecond="수량">
        {buying_bidding.map((history, idx) => {
          return (
            <tr key={idx}>
              <td>{mutatePrice(history.buying_bidding_price)}</td>
              <td>{history.buying_bidding_date}</td>
            </tr>
          );
        })}
      </TableComponent>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  & > table:nth-child(1) {
    display: ${props => (props.openTab === 1 ? 'block' : 'none')};
  }

  & > table:nth-child(2) {
    display: ${props => (props.openTab === 2 ? 'block' : 'none')};
  }

  & > table:nth-child(3) {
    display: ${props => (props.openTab === 3 ? 'block' : 'none')};
  }
`;

export default ModalTableGroup;
