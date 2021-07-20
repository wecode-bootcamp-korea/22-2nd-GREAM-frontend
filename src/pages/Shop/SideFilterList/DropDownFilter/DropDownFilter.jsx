import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';

const DropDownFilter = props => {
  return (
    <Drop>
      <div>
        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
      </div>
      <span>{props.name}</span>
    </Drop>
  );
};

const Drop = styled.div`
  ${props => props.theme.setFlex('normal', 'center')}
  margin-top: 9px;
  font-size: 14px;
  font-weight: 400;

  div {
    margin-right: 4px;
    text-align: center;
    i {
      font-size: 10px;
      color: #ffffff;
    }
  }
`;
export default DropDownFilter;
