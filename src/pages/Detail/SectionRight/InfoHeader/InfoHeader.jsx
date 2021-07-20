import React from 'react';
import styled from 'styled-components';
import ButtonGroup from './ButtonGroup/ButtonGroup';

const InfoHeader = () => {
  return (
    <Header>
      <NameContainer>
        <Name>(W) Jordan 1 Low White Wolf Grey</Name>
        <button>
          <i className="far fa-bookmark" />
        </button>
      </NameContainer>
      <RecentContainer>
        <StaticTransaction>최근 거래가</StaticTransaction>
        <PriceContainer>
          <Price>316,000원</Price>
          <Rate>
            <i className="fas fa-sort-down" />
            {/* <i className="fas fa-sort-up" /> */}
            <span>19,000원 (-5.7%)</span>
          </Rate>
        </PriceContainer>
      </RecentContainer>
      <ButtonGroup />
    </Header>
  );
};

const Header = styled.section`
  flex: 0 0 25%;
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.div`
  ${props => props.theme.setFlex('space-between', 'flex-start')};
  margin-bottom: 32px;

  & button {
    ${props => props.theme.resetBtn}

    i {
      font-size: 22px;
    }
  }
`;

const Name = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const RecentContainer = styled.div`
  ${props => props.theme.setFlex('space-between', 'flex-start')};
  margin-bottom: 32px;
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme.subFontColor};
`;

const StaticTransaction = styled.span`
  font-size: 13px;
  color: #959595;
`;

const PriceContainer = styled.div`
  text-align: right;
`;

const Price = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const Rate = styled.div`
  display: flex;
  font-size: 13px;
  margin-top: 8px;
  color: ${props => props.theme.red};

  & > i {
    margin-right: 6px;
    line-height: 10px;
  }
`;

export default InfoHeader;
