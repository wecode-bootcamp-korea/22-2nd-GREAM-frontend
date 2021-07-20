import React, { useState } from 'react';
import styled from 'styled-components';
import InfoHeader from './InfoHeader/InfoHeader';
import History from './History/History';
import Confirmation from './Confirmation/Confirmation';
import PaintInfo from './PaintInfo/PaintInfo';
import TransactionGraph from './TransactionGraph/TransactionGraph';
import Modal from './Modal/Modal';

const SectionRight = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalTabId, setModalTabId] = useState(1);

  const getModalTabIdState = id => {
    setModalTabId(id);
  };

  const getModalState = boolean => {
    setOpenModal(boolean);
  };

  return (
    <Wrapper>
      <InfoHeader />
      <Confirmation />
      <TransactionGraph
        getModalState={getModalState}
        getModalTabIdState={getModalTabIdState}
      />
      <History
        getModalState={getModalState}
        getModalTabIdState={getModalTabIdState}
      />
      <PaintInfo />
      <Modal
        openModal={openModal}
        getModalState={getModalState}
        modalTabId={modalTabId}
        getModalTabIdState={getModalTabIdState}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex: 0 0 40vw;
  display: flex;
  flex-direction: column;
  min-width: 390px;
  height: 100vh;
  padding: 16px 16px 16px 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${({ theme }) => theme.query.desktop} {
    max-width: 516px;
  }
`;

export default SectionRight;
