import React from 'react';
import styled from 'styled-components';

const TableComponent = ({ thOne, thSecond, children, modal }) => {
  return (
    <TableWrapper>
      <TableHeader>
        <th>{thOne}</th>
        <th>{thSecond}</th>
      </TableHeader>
      <TableBody modal={modal}>{children}</TableBody>
    </TableWrapper>
  );
};

const TableWrapper = styled.table`
  margin-top: 16px;
  width: 100%;
  font-size: 14px;
`;

const TableHeader = styled.thead`
  display: table;
  width: 100%;
  table-layout: fixed;
  color: #959595;
  border-bottom: 1px solid ${props => props.theme.subFontColor};

  & > th {
    text-align: left;
    font-weight: normal;
    padding-bottom: 8px;
  }
`;

const TableBody = styled.tbody`
  display: block;
  overflow: ${props => (props.modal ? 'auto' : 'visible')};
  height: ${props => (props.modal ? '270px' : 'auto')};

  & > tr > td {
    padding-top: 18px;
    width: ${props => (props.modal ? '193px' : '290px')};
  }
`;

export default TableComponent;
