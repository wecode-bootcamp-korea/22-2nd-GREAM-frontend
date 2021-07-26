import React, { useState } from 'react';
import styled from 'styled-components';

const Carousel = () => {
  const [buttonId, setButtontId] = useState('r1');

  const moveRight = () => {
    const changedNum = Number(buttonId.slice(1));
    const newButtonId =
      changedNum === RADIOS.length ? 'r1' : `r${changedNum + 1}`;
    setButtontId(newButtonId);
  };

  const moveLeft = () => {
    const changedNum = Number(buttonId.slice(1));
    const newButtonId =
      changedNum === 1 ? `r${RADIOS.length}` : `r${changedNum - 1}`;
    setButtontId(newButtonId);
  };

  const handleRadioChange = e => {
    setButtontId(e.target.value);
  };

  return (
    <Wrapper>
      <LeftButton onClick={moveLeft}>
        <i class="fas fa-chevron-left" />
      </LeftButton>
      <InWrapper>
        <Slides>
          {RADIOS.map(({ id, src }) => {
            return (
              <Image
                key={id}
                src={src}
                id={buttonId}
                checked={id == buttonId}
              />
            );
          })}
        </Slides>
      </InWrapper>
      <RightButton onClick={moveRight}>
        <i class="fas fa-chevron-right" />
      </RightButton>
      <Controls>
        {RADIOS.map(({ id, src }) => {
          return (
            <Label key="id" htmlfor={id} checked={id == buttonId}>
              <Radio
                type="radio"
                name="radio"
                id={id}
                value={id}
                onChange={handleRadioChange}
              />
            </Label>
          );
        })}
      </Controls>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.cardBackground};
`;

const InWrapper = styled.div`
  position: relative;
  height: 500px;
  width: 500px;
  max-width: 473px;
  padding: 50px;
  transform-style: preserve-3d;
  transform: perspective(2000px) rotateY(-30deg) translateZ(-40px);
`;

const Slides = styled.div`
  min-width: 540px;
  transition: 0.7s linear;
`;

const Image = styled.img`
  position: absolute;
  height: 70%;
  width: 70%;
  transition: all 0.5s linear;
  box-shadow: 2px 2px 5px #000;
  border-radius: 1%;
  opacity: ${({ checked }) => (checked ? 1 : 0)};
`;

const Controls = styled.div`
  position: absolute;
  bottom: 15px;
  display: flex;
  justify-content: center;
  width: 35%;
  min-width: 218px;
`;

const Label = styled.label`
  width: 32px;
  margin-right: 10px;
  border: 1px solid
    ${props => (props.checked ? props.theme.fontColor : '#d5d5d5')};
  cursor: pointer;
  transition: 0.2s linear;
  &:hover {
    border-color: ${props => props.theme.fontColor};
  }
`;

const Radio = styled.input`
  display: none;
`;

const LeftButton = styled.button`
  ${({ theme }) => theme.resetBtn}
  position: absolute;
  left: 0;
  font-size: 22px;
  margin-left: 1em;
  i {
    color: #d6d7d9;
  }
`;

const RightButton = styled.button`
  ${({ theme }) => theme.resetBtn}
  position: absolute;
  right: 0;
  font-size: 22px;
  margin-right: 1em;
  i {
    color: #d6d7d9;
  }
`;

const RADIOS = [
  {
    id: 'r1',
    src: 'https://ca.slack-edge.com/TH0U6FBTN-U01D0NZ6RTN-bc4ccc0f953c-512',
  },
  {
    id: 'r2',
    src: 'https://ca.slack-edge.com/TH0U6FBTN-UR3PU6YJE-9f9bcc164afc-512',
  },
  {
    id: 'r3',
    src: 'https://ca.slack-edge.com/TH0U6FBTN-U015PNKKKC0-b1a0e8eb88d7-512',
  },
];

export default Carousel;
