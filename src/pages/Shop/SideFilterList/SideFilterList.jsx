import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SideFilterBox from './SideFilterBox/SideFilterBox';

const SideFilterList = ({
  filterList,
  getCategory,
  removeSelected,
  resetPage,
}) => {
  return (
    <Container>
      <Title>필터</Title>
      {filterList.map((filterList, idx) => (
        <SideFilterBox
          key={idx}
          sideFilter={filterList}
          parentIdx={idx}
          getCategory={getCategory}
          removeSelected={removeSelected}
          resetPage={resetPage}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 210px;
  background-color: #ffffff;
`;

const Title = styled.div`
  padding-top: 18px;
  padding-bottom: 15px;
  font-size: 16px;
  font-weight: 700;
`;

export default SideFilterList;
