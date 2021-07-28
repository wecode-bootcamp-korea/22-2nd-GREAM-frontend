import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';

const DropDownFilter = ({
  name,
  getCategory,
  id,
  categoryName,
  removeSelected,
}) => {
  const categoryFilterHandler = e => {
    console.log(`e`, e);
    const checked = e.target.checked;
    if (checked) getCategory(id, categoryName);
    else if (!checked) removeSelected(id, categoryName);
  };

  return (
    <Drop>
      <div>
        <Checkbox
          onClick={e => categoryFilterHandler(e)}
          inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
        />
      </div>
      <span>{name}</span>
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
    z-index: 90;
    i {
      font-size: 10px;
      color: #ffffff;
    }
  }
`;
export default DropDownFilter;
