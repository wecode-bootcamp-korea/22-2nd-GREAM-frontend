import React, { useState } from 'react';
import styled from 'styled-components';
import InfoHeader from './InfoHeader/InfoHeader';
import History from './History/History';
import Confirmation from './Confirmation/Confirmation';
import PaintInfo from './PaintInfo/PaintInfo';
import TransactionGraph from './TransactionGraph/TransactionGraph';
import Modal from './Modal/Modal';

const SectionRight = ({ detailData }) => {
  const { main_info, bidding_detail, product_info } = detailData;
  const mainInfo = main_info?.[0];
  const [openModal, setOpenModal] = useState(false);
  const [modalTabId, setModalTabId] = useState(1);

  const mutatePrice = price => {
    return Math.floor(price).toLocaleString();
  };

  const getModalTabIdState = id => {
    setModalTabId(id);
  };

  const getModalState = boolean => {
    setOpenModal(boolean);
  };

  return (
    <Wrapper>
      <InfoHeader mainInfo={mainInfo} mutatePrice={mutatePrice} />
      <Confirmation />
      <TransactionGraph
        getModalState={getModalState}
        getModalTabIdState={getModalTabIdState}
        mutatePrice={mutatePrice}
      />
      <History
        getModalState={getModalState}
        getModalTabIdState={getModalTabIdState}
        bidding_detail={bidding_detail}
        mutatePrice={mutatePrice}
      />
      <PaintInfo product_info={product_info} mutatePrice={mutatePrice} />
      <Modal
        openModal={openModal}
        getModalState={getModalState}
        modalTabId={modalTabId}
        getModalTabIdState={getModalTabIdState}
        detailData={detailData}
        mutatePrice={mutatePrice}
      />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  flex: 0 0 40vw;
  display: flex;
  flex-direction: column;
  min-width: 390px;
  padding: 16px 16px 16px 0;
  @media ${({ theme }) => theme.query.desktop} {
    max-width: 516px;
  }
`;
export default SectionRight;
