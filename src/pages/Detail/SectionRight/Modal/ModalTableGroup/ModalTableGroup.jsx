import React from 'react';
import styled from 'styled-components';
import TableComponent from '../../TableComponent/TableComponent';

const ModalTableGroup = ({ tabId }) => {
  return (
    <TableWrapper openTab={tabId}>
      <TableComponent thOne="거래가" thSecond="거래일" modal={true}>
        <tr>
          <td>266,000</td>
          <td>1</td>
        </tr>
      </TableComponent>
      <TableComponent thOne="판매 희망가" thSecond="수량"></TableComponent>
      <TableComponent thOne="구매 희망가" thSecond="수량"></TableComponent>
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
