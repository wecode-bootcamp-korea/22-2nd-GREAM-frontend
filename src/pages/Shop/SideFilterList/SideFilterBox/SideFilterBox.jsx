import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DropDownFilter from '../DropDownFilter/DropDownFilter';

const SideFilterBox = ({
  sideFilter,
  parentIdx,
  getCategory,
  removeSelected,
}) => {
  const { category_name_kr, category_name, option, getFilterList } = sideFilter;

  const [isClicked, setIsClicked] = useState(false);
  const [category, setCategory] = useState('');

  const remCategory = () => {
    setCategory(category_name);
  };

  return (
    <>
      <Box onClick={() => setIsClicked(!isClicked)}>
        <Section>
          <Category>{category_name_kr}별</Category>
          <All>모든 {category_name_kr}</All>
        </Section>
        <Icon>
          <i className="fas fa-plus"></i>
        </Icon>
      </Box>
      <Drop onClick={remCategory} isClicked={isClicked}>
        {option.map((option, idx) => (
          <DropDownFilter
            key={idx}
            name={option.name}
            id={option.id}
            categoryName={category_name}
            getFilterList={getFilterList}
            getCategory={getCategory}
            removeSelected={removeSelected}
          />
        ))}
      </Drop>
    </>
  );
};

const Box = styled.div`
  ${props => props.theme.setFlex('space-between', 'center')}
  border-bottom: 1px solid ${props => props.theme.subFontColor};
  padding: 16px 0;
  cursor: pointer;
`;

const Section = styled.div``;

const Icon = styled.div`
  padding-right: 4px;
  color: ${props => props.theme.subFontColor};
`;

const Category = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

const All = styled.div`
  margin-top: 7px;
  font-size: 15px;
  color: ${props => props.theme.subFontColor};
`;

const Drop = styled.div`
  display: ${props => (props.isClicked ? 'block' : 'none')};
  height: 260px;
  overflow: scroll;
`;

export default SideFilterBox;
