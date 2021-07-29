import React from 'react';
import styled from 'styled-components';
import Title from '../Title/Title';

const PaintInfo = ({ product_info, mutatePrice }) => {
  if (!product_info) return <span>Loading...</span>;

  const { model_number, author, color, original_price } = product_info;

  return (
    <Wrapper>
      <Title>상품 정보</Title>
      <InfoUl>
        <InfoLi>
          <Info color="#959595">작가</Info>
          <Info>{author}</Info>
        </InfoLi>
        <InfoLi>
          <Info color="#959595">모델번호</Info>
          <Info>{model_number}</Info>
        </InfoLi>
        <InfoLi>
          <Info color="#959595">대표색상</Info>
          <Info>{color.join('/')}</Info>
        </InfoLi>
        <InfoLi>
          <Info color="#959595">발매가</Info>
          <Info>{mutatePrice(original_price)}원</Info>
        </InfoLi>
      </InfoUl>
      <Notion>
        GREAM은 통신판매 중개자로서 통신판매의 당사자가 아닙니다. 본 상품은
        개별판매자가 등록한 상품으로 상품, 상품정보, 거래에 관한 의무와 책임은
        각 판매자에게 있습니다. 단, 거래과정에서 검수하고 보증하는 내용에 대한
        책임은 GREAM에 있습니다.
      </Notion>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex: 0 0 25%;
  margin-top: 52px;
`;

const InfoUl = styled.ul`
  font-size: 14px;
  padding: 16px 0;
  padding-bottom: 52px;
  margin-bottom: 16px;
  border-top: 1px solid ${props => props.theme.subFontColor};
  border-bottom: 1px solid ${props => props.theme.subFontColor};
`;

const InfoLi = styled.li`
  ${props => props.theme.setFlex('space-between', 'flex-start')};
  margin-bottom: 12px;
`;

const Info = styled.p`
  display: inline;
  font-size: 14px;
  color: ${props => props.color || props.theme.fontColor};
`;

const Notion = styled.p`
  font-size: 12px;
  color: #c5c5c5;
  margin-bottom: 106px;
`;

export default PaintInfo;
