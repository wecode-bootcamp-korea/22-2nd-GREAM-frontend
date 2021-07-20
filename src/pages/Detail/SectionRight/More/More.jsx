import React from 'react';
import styled from 'styled-components';

const More = ({
  children,
  historyTabId,
  getModalState,
  getModalTabIdState,
  history,
}) => {
  const showModal = () => {
    getModalState(true);
    history ? getModalTabIdState(historyTabId + 1) : getModalTabIdState(1);

    document.body.setAttribute(
      'style',
      `position: fixed; left: 0; right: 0; height: 100vh;`
    );
  };

  return <MoreButton onClick={showModal}>{children}</MoreButton>;
};

const MoreButton = styled.button`
  ${props => props.theme.resetBtn}
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  color: #959595;
  border: 1px solid ${props => props.theme.subFontColor};
  border-radius: 8px;

  &:active {
    background-color: #f4f4f4;
  }
`;

export default More;
