import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <Wrapper>
      <Top>
        <Left>
          <Title>이용안내</Title>
          <ListContainer>
            {USERINFO.map((info, index) => (
              <List key={index}>{info}</List>
            ))}
          </ListContainer>
        </Left>
        <Center>
          <Title>고객지원</Title>
          <ListContainer>
            {USERSUPPORT.map((support, index) => {
              return <List key={index}>{support}</List>;
            })}
          </ListContainer>
        </Center>
        <Right>
          <Title>고객센터 1234-5678</Title>
          <Info>운영시간 평일 11:00 ~ 18:00 (토, 일 공휴일 휴무)</Info>
          <Info>점심시간 평일 13:00 ~ 14:00</Info>
          <InfoBlack>1:1 문의하기는 앱에서만 가능합니다.</InfoBlack>
          <Button>자주 묻는 질문</Button>
        </Right>
      </Top>
      <Bottom>
        <TopInBottom>
          <LinkGroup>
            <LinkButton>개인정보처리방침</LinkButton>
            <LinkButton>이용약관</LinkButton>
          </LinkGroup>
          <Icons>
            <IconButton>
              <i className="fab fa-instagram" />
            </IconButton>
            <IconButton>
              <i className="fab fa-facebook" />
            </IconButton>
            <IconButton>
              <i className="far fa-comment" />
            </IconButton>
          </Icons>
        </TopInBottom>
        <CenterInBottom>
          <Info>GREAM 주식회사</Info>
        </CenterInBottom>
        <BottomInBottom>
          <SmallInfo>
            GREAM은 통신판매 중개자로서 통신판매의 당사자가 아니므로 개별
            판매자가 등록한 상품정보에 대해서 책임을 지지 않습니다.
            <br />
            단, 거래과정에서 검수하고 보증하는 내용에 대한 책임은 당사에
            있습니다.
          </SmallInfo>
          <Copyright>&copy; 2021 GREAM.Team</Copyright>
        </BottomInBottom>
      </Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 32px;
`;
const Top = styled.section`
  flex: 0 0 30vh;
  display: flex;
`;
const Bottom = styled.section`
  flex: 0 0 20vh;
  padding-top: 32px;
  border-top: 1px solid ${props => props.theme.subFontColor};
`;
const Left = styled.div`
  flex: 0 0 20vw;
`;
const Center = styled.div`
  flex: 0 0 45vw;
`;
const Right = styled.div`
  flex: 0 0 30vw;
  min-width: 289px;
`;
const Title = styled.h1`
  padding-bottom: 22px;
`;
const ListContainer = styled.ul``;
const List = styled.li`
  margin-bottom: 18px;
  color: #bcbcbc;
  font-size: 14px;
`;
const Info = styled.p`
  margin-bottom: 6px;
  color: #bcbcbc;
  font-size: 14px;
`;
const InfoBlack = styled(Info)`
  margin: 12px 0 16px 0;
  color: ${props => props.theme.fontColor};
`;
const Button = styled.button`
  padding: 10px;
  color: white;
  font-weight: 300;
  border: 1px solid ${props => props.theme.fontColor};
  background-color: ${props => props.theme.fontColor};
`;
const TopInBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CenterInBottom = styled.div`
  padding-bottom: 16px;
  padding-left: 5px;
`;
const BottomInBottom = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const LinkGroup = styled.div`
  flex: 0 0 70vw;
  margin-bottom: 16px;
`;
const LinkButton = styled.button`
  ${props => props.theme.resetBtn}
`;
const Icons = styled.div`
  flex: 0 0 12vw;
  display: flex;
  justify-content: space-around;
  max-width: 112px;
`;
const IconButton = styled.button`
  ${props => props.theme.resetBtn}
  font-size: 22px;
`;
const SmallInfo = styled(Info)`
  padding-left: 5px;
  font-size: 13px;
`;
const Copyright = styled(SmallInfo)`
  flex: 1 0 26vw;
  text-align: right;
`;

const USERINFO = ['검수기준', '이용정책', '패널티 정책', '커뮤니티 가이드라인'];

const USERSUPPORT = [
  '공지사항',
  '서비스 소개',
  '패널티 정책',
  '판매자 방문접수',
];
