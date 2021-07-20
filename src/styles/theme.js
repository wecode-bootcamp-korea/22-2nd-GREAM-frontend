import { css } from 'styled-components';

const theme = {
  cardBackground: '#F4F4F4',
  fontColor: '#1D1D1D',
  subFontColor: '#CBCBCB',
  red: '#EF6253',
  green: '#41B979',
  setFlex: (justifyContent = 'center', alignItem = 'center') => css`
    display: flex;
    align-item: $(justifyContent);
    justify-content: $(alignItem);
  `,
};

export default theme;
