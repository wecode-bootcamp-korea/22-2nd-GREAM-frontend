import React, { useState } from 'react';
import styled from 'styled-components';
import Title from '../Title/Title';

const Confirmation = () => {
  const [isClick, setIsClick] = useState(true);
  const [dropdownId, setDropdownId] = useState(0);

  const showDropdownBody = id => {
    id === dropdownId ? setIsClick(!isClick) : setIsClick(true);
    setDropdownId(id);
  };

  return (
    <Wrapper>
      <Title>구매 전 꼭 확인해주세요!</Title>
      {CONFIRMINFO.map(info => {
        const showCondition = info.id === dropdownId && isClick;

        return (
          <div key={info.id}>
            <Header
              show={showCondition}
              onClick={() => showDropdownBody(info.id)}
            >
              <InfoTitle show={showCondition}>{info.title}</InfoTitle>
              <i className="fas fa-chevron-down" />
            </Header>
            <Body show={showCondition}>
              <strong>{info.notice}</strong>
            </Body>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex: 0 0 25%;
  margin-top: 52px;
`;

const Header = styled.button`
  ${props => props.theme.resetBtn}
  ${props => props.theme.setFlex('space-between', 'flex-start')};
  padding: 22px 0;
  width: 100%;
  border-bottom: 1px solid ${props => (props.show ? 'black' : '#dfe0e4')};

  i {
    color: ${props => props.theme.subFontColor};
  }
`;

const InfoTitle = styled.h1`
  color: ${props => props.theme.fontColor};
  font-weight: ${props => (props.show ? 'bold' : 'normal')};
  font-size: 14px;
`;

const Body = styled.div`
  padding: 22px 0;
  display: ${props => (props.show ? 'block' : 'none')};

  strong {
    font-size: 13px;
    color: #4f4f4f;
    font-weight: bold;
  }
`;

const CONFIRMINFO = [
  {
    id: 1,
    title: '배송 기간 안내',
    notice:
      'GREAM은 최대한 빠르게 모든 상품을 제공하기 위해 노력하고 있습니다.',
  },
  {
    id: 2,
    title: '검수 안내',
    notice:
      '판매자의 상품이 검수센터에 도착하면 전담 검수팀이 철저한 분석과 검사로 정가품 확인을 진행합니다.',
  },
  {
    id: 3,
    title: '구매 환불/취소/교환 안내',
    notice:
      'GREAM은 익명 거래를 기반으로 판매자가 판매하는 상품을 구매자가 실시간으로 구매하여 거래를 체결합니다.',
  },
];

export default Confirmation;
