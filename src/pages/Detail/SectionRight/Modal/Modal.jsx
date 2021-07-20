import React from 'react';
import styled from 'styled-components';
import { Tabs, Tab } from '../TransactionGraph/TransactionGraph';
import ModalTableGroup from './ModalTableGroup/ModalTableGroup';

const Modal = ({
  openModal,
  modalTabId,
  getModalState,
  getModalTabIdState,
}) => {
  const removeModal = () => {
    getModalState(false);
    document.body.setAttribute(`style`, ``);
  };

  const changeTable = id => {
    getModalTabIdState(id);
  };

  return (
    <Wrapper isOpen={openModal}>
      <WrapperIn>
        <Center>시세</Center>
        <Button onClick={removeModal}>
          <i className="fa fa-times" />
        </Button>
        <Header>
          <ImageContainer>
            <Image />
          </ImageContainer>
          <NameContainer>
            <Name>(W) Jordan 1 Low White Wolf Grey</Name>
          </NameContainer>
        </Header>
        <Body>
          <Tabs>
            {BUTTONTITLE.map(({ id, title }) => {
              return (
                <Tab
                  key={id}
                  active={id === modalTabId}
                  onClick={() => changeTable(id)}
                >
                  {title}
                </Tab>
              );
            })}
          </Tabs>
          <ModalTableGroup tabId={modalTabId} />
        </Body>
      </WrapperIn>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
const WrapperIn = styled.section`
  ${props => props.theme.setFlex('flex-start', 'center')};
  flex-direction: column;
  position: relative;
  top: calc(50% - 275px);
  width: 450px;
  height: 550px;
  margin: 0 auto;
  border-radius: 20px;
  background-color: white;
`;

const Center = styled.h1`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 16px;
  padding-top: 22px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 0 32px;
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
`;

const Image = styled.img.attrs(props => ({
  src: 'http://source.unsplash.com/100x100/?paint',
}))`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const NameContainer = styled.div`
  padding: 6px 0 0 8px;
`;

const Name = styled.h1`
  font-weight: normal;
`;

const Body = styled.div`
  width: 100%;
  padding: 22px 32px;
`;

const Button = styled.button`
  ${props => props.theme.resetBtn}
  position: absolute;
  right: 16px;
  top: 18px;

  & i {
    font-size: 22px;
  }
`;

const BUTTONTITLE = [
  { id: 1, title: '최근 거래' },
  { id: 2, title: '판매 입찰' },
  { id: 3, title: '구매 입찰' },
];

export default Modal;
