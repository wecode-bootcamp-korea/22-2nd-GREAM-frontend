import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card/Card';
import SortList from './Sort/SortList';
import { PRODUCTS_API } from '../../../config';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    fetch('/data/ShopCard.json')
      // fetch(`${PRODUCTS_API}/product`)
      .then(res => res.json())
      .then(data => {
        setProductList(data.results);
      });
  };

  // const [products, setProducts] = useState(items);
  // const [category, setCategory] = useState('all');

  return (
    <div>
      <Sort>
        <Count>
          <div>상품</div>
          <span>100</span>
        </Count>
        <Filter>
          <SortList />
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
export default ProductList;
