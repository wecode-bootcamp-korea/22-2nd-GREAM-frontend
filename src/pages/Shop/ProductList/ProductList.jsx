import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card/Card';
import SortList from './Sort/SortList';

const SORT_PRICE = [
  { id: 1, value: 'sort=buying-price-ascending', sortName: '즉시 구매가순' },
  { id: 2, value: 'sort=selling-price-descending', sortName: '즉시 판매가순' },
  {
    id: 3,
    value: 'sort=original-price-descending',
    sortName: '발매가 내림차순',
  },
  {
    id: 4,
    value: 'sort=original-price-ascending',
    sortName: '발매가 오름차순',
  },
];

const ProductList = ({ productList, sortDrop }) => {
  return (
    <div>
      <Sort>
        <Count>
          <div>상품</div>
        </Count>
        <Filter>
          <DropDown onChange={sortDrop}>
            {SORT_PRICE.map(sort => (
              <Option value={sort.value} key={sort.id}>
                {sort.sortName}
              </Option>
            ))}
          </DropDown>
        </Filter>
      </Sort>
      <Grid>
        {productList.map((productList, idx) => (
          <Card key={idx} productList={productList} />
        ))}
      </Grid>
    </div>
  );
};
const Sort = styled.div`
  ${props => props.theme.setFlex('space-between', 'center')}
  width: 980px;
  height: 64px;
  background-color: #ffffff;
  span {
    font-weight: 700;
  }
`;
const Count = styled.div`
  display: flex;
`;
const Filter = styled.div`
  display: flex;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 12px;
  column-gap: 12px;
`;
const DropDown = styled.select``;

const Option = styled.option``;
export default ProductList;
