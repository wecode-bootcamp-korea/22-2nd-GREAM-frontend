import React from 'react';
import styled from 'styled-components';
import ButtonGroup from './ButtonGroup/ButtonGroup';

const InfoHeader = ({ mainInfo, mutatePrice }) => {
  if (!mainInfo) return <span>Loading...</span>;

  const { name, comparing_price, comparing_price_ratio, recent_price } =
    mainInfo;

  return (
    <Header>
      <NameContainer>
        <Name>{name}</Name>
        <button>
          <i className="far fa-bookmark" />
        </button>
      </NameContainer>
      <RecentContainer>
        <StaticTransaction>최근 거래가</StaticTransaction>
        <PriceContainer>
          <Price>{mutatePrice(recent_price)}</Price>
          <Rate checkedRatio={comparing_price_ratio > 0}>
            {comparing_price_ratio > 0 ? (
              <i className="fas fa-sort-up" />
            ) : (
              <i className="fas fa-sort-down" />
            )}
            <span>
              {mutatePrice(comparing_price)}원 ({comparing_price_ratio}%)
            </span>
          </Rate>
        </PriceContainer>
      </RecentContainer>
      <ButtonGroup mainInfo={mainInfo} mutatePrice={mutatePrice} />
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
  color: ${({ checkedRatio, theme }) =>
    checkedRatio ? theme.red : theme.green};

  i {
    position: relative;
    top: ${({ checkedRatio }) => (checkedRatio ? '2px' : '-2px')};
    margin-right: 6px;
  }
`;

export default InfoHeader;
