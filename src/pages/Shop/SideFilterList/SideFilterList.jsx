import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SideFilterBox from './SideFilterBox/SideFilterBox';
import { PRODUCTS_API } from '../../../config';

const SideFilterList = () => {
  const [filterList, setFilterList] = useState([]);
  useEffect(() => {
    getFilterList();
  }, []);

  const getFilterList = () => {
    fetch('/data/filter.json')
      // fetch(`${PRODUCTS_API}/category`)
      .then(res => res.json())
      .then(data => {
        setFilterList(data.results);
      });
  };

  return (
    <Container>
      <Title>필터</Title>
      {filterList.map((filterList, idx) => (
        <SideFilterBox
          key={idx}
          categoryName={filterList.category_name}
          optionList={filterList.option}
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
