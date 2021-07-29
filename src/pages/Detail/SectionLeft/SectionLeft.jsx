import React from 'react';
import styled from 'styled-components';
import Carousel from './Carousel/Carousel';

const SectionLeft = ({ mainInfo }) => {
  return (
    <Wrapper>
      <Fix>
        <Carousel mainInfo={mainInfo} />
        <Box>
          <LinkTag>
            <i class="fas fa-boxes" />
            <div>
              <Title>GREAM 구매 방법</Title>
              <Paragraph>구매 프로세스를 확인 후 구매해주세요.</Paragraph>
            </div>
          </LinkTag>
        </Box>
      </Fix>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  ${props => props.theme.setFlex('flex-start', 'center')};
  flex: 0 0 45vw;
  flex-direction: column;
  min-width: 390px;
  height: 220vh;
  margin: 0 42px;
  position: relative;

  @media (min-width: 1290px) {
    max-width: 570px;
  }
`;

const Fix = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  max-width: 540px;

  @media (min-width: 1290px) {
    max-width: 570px;
  }
`;
const Box = styled.div`
  width: 100%;
  height: 80px;
  padding: 16px;
  border: 2px solid ${props => props.theme.fontColor};
  position: relative;
`;

const LinkTag = styled.a.attrs(props => ({
  to: '#',
}))`
  ${props => props.theme.setFlex('flex-start', 'center')};
  text-decoration: none;
  color: ${props => props.theme.fontColor};

  &:active,
  &:visited {
    color: ${props => props.theme.fontColor};
  }

  i {
    font-size: 40px;
    color: ${props => props.theme.fontColor};
    margin-right: 16px;
  }
`;

const Title = styled.h1`
  padding-bottom: 4px;
  letter-spacing: 0.2px;
`;

const Paragraph = styled.p`
  font-size: 13px;
  color: #959595;
`;

export default SectionLeft;
