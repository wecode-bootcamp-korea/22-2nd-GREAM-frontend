import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SortList = () => {
  return (
    <DropDown name="job">
      <Option value="">인기순</Option>
      <Option value="학생">즉시 구매가순</Option>
      <Option value="회사원">즉시 판매순</Option>
    </DropDown>
  );
};

const DropDown = styled.select``;

const Option = styled.option``;

export default SortList;
