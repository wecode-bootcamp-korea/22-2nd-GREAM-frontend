import React from 'react';
import styled from 'styled-components';

import Category from './Category/Category';
import ShopHeader from './ShopHeader/ShopHeader';
import SideFilterList from './SideFilterList/SideFilterList';
import ProductList from './ProductList/ProductList';

const Shop = () => {
  return (
    <Container>
      <ShopHeaderFix>
        <ShopHeader />
        <Category />
      </ShopHeaderFix>
      <ProductBox>
        <SideFilterList />
        <ProductList />
      </ProductBox>
    </Container>
  );
};

const Container = styled.div`
  ${props => props.theme.setFlex('normal', 'center')};
  flex-direction: column;
  margin-top: 98px;
  width: 100vw;
  height: 100vh;
`;

const ShopHeaderFix = styled.div`
  position: fixed;
  background-color: #ffffff;
`;

const ProductBox = styled.div`
  ${props => props.theme.setFlex('space-between', 'normal')}
  width: 1200px;
  margin-top: 103px;
`;

export default Shop;
