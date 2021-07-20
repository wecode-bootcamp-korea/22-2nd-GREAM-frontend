import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DropDownFilter from '../DropDownFilter/DropDownFilter';

const SideFilterBox = props => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <Box onClick={() => setIsClicked(!isClicked)}>
        <Section>
          <Category>{props.categoryName}별</Category>
          <All>모든 {props.categoryName}</All>
        </Section>
        <Icon>
          <i className="fas fa-plus"></i>
        </Icon>
      </Box>
      <Drop isClicked={isClicked}>
        {props.optionList.map((optionList, idx) => (
          <DropDownFilter key={idx} name={optionList.name} />
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
