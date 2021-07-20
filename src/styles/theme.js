import { css } from 'styled-components';

const deviceSizes = {
  desktop: `1290px`,
};

const query = {
  desktop: `screen and (min-width: ${deviceSizes.desktop})`,
};

const theme = {
  cardBackground: '#F4F4F4',
  fontColor: '#1D1D1D',
  subFontColor: '#CBCBCB',
  red: '#EF6253',
  green: '#41B979',
  setFlex: (justifyContent = 'center', alignItem = 'center') => css`
    display: flex;
    justify-content: ${justifyContent};
    align-items: ${alignItem};
  `,
  resetBtn: css`
    background-color: transparent;
    border: 0;
    cursor: pointer;
  `,
  query,
};

export default theme;
