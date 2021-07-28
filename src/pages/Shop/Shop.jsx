import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Category from './Category/Category';
import ShopHeader from './ShopHeader/ShopHeader';
import SideFilterList from './SideFilterList/SideFilterList';
import ProductList from './ProductList/ProductList';
import { PRODUCTS_API } from '../../config';
import { PRODUCTS_CATEGORY_API } from '../../config';

const Shop = () => {
  const [productList, setProductList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [queryState, setQueryState] = useState([]);

  useEffect(() => {
    fetch(`${PRODUCTS_API}?${addQuery}`)
      // fetch(`${PRODUCTS_API}?author=1`)
      .then(res => res.json())
      .then(data => {
        setProductList(data.results);
      });
  }, [queryState]);

  useEffect(() => {
    getFilterList();
  }, []);

  const getFilterList = (id, categoryName) => {
    // fetch('/data/filter.json')
    fetch(`${PRODUCTS_CATEGORY_API}`)
      .then(res => res.json())
      .then(data => {
        setFilterList(data.results);
        setQueryState(
          data.results.map(({ category_name }) => ({
            category_name,
            id: [],
          }))
        );
      });
  };

  const makeQuery = agu => {
    if (queryState !== undefined) {
      return agu.id.reduce((acc, cv) => {
        if (!acc && cv) {
          return acc + agu.category_name + '=' + cv;
        }
        if (acc) {
          return acc + '&' + agu.category_name + '=' + cv;
        }
        return acc;
      }, '');
    }
  };

  const addQuery = queryState.map(state => makeQuery(state)).join('');

  const prevId = categoryName => {
    const preId = queryState.filter(
      filterState => filterState.category_name === categoryName
    )[0].id;
    return preId;
  };

  const getCategory = (queryId, categoryName) => {
    setQueryState(
      queryState.map(state =>
        state.category_name === categoryName
          ? { ...state, id: [...prevId(categoryName), queryId] }
          : state
      )
    );
  };

  const removeSelected = (qeuryId, categoryName) => {
    const selectCategory = queryState.filter(
      queryState => queryState.category_name === categoryName
    );
    const removeChoosen = selectCategory[0].id.splice(
      selectCategory[0].id.indexOf(qeuryId),
      1
    );
    setQueryState(
      queryState.map(state =>
        state.id === qeuryId
          ? { ...state, selected: [...removeChoosen] }
          : state
      )
    );
  };

  // 1. true/false 로 눌렸는지 안눌렸는지 알 수 있는가?
  // 2. true/false를 눌렸는지 확인하고 그것을 id, classname으로 분류할 수 있는가
  // 3. 해당 id,를 해당 query에 넣었다 뺄다를 할 수 있는가?
  // 4. 배열로 관리하는 id 값을 쿼리에 알맞게 넣기 => 함수로 map  관리(if문)
  // 5. url에 직접 함수를 넣어놓고 작동하면 쿼리문 아니면 빈걸로

  return (
    <Container>
      <ShopHeaderFix>
        <ShopHeader />
        <Category />
      </ShopHeaderFix>
      <ProductBox>
        <SideFilterList
          filterList={filterList}
          getCategory={getCategory}
          removeSelected={removeSelected}
        />
        <ProductList productList={productList} />
      </ProductBox>
    </Container>
  );
};

const Container = styled.div`
  ${props => props.theme.setFlex('normal', 'center')};
  flex-direction: column;
  margin-top: 98px;
  width: 100vw;
  height: 100%;
`;

const ShopHeaderFix = styled.div`
  position: fixed;
  background-color: #ffffff;
  z-index: 9999;
`;

const ProductBox = styled.div`
  ${props => props.theme.setFlex('space-between', 'normal')}
  width: 1200px;
  margin-top: 103px;
`;

export default Shop;
