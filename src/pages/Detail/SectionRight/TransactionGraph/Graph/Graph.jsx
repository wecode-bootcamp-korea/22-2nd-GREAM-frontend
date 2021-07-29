import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const options = {
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255)',
      titleColor: 'rgba(225,116,103)',
      bodyColor: 'rgba(0,0,0)',
      caretSize: 0,
      displayColors: false,
      boxWidth: '100px',
      borderColor: 'rgba(225,116,103)',
      borderWidth: 1,
    },
  },
  elements: {
    point: {
      pointStyle: 'star',
      radius: 2,
    },
  },
  scales: {
    x: { display: false },
    y: {
      grid: { display: false, drawBorder: false },
      position: 'right',
      ticks: { color: `#a0a0a0` },
    },
  },
  animation: {
    duration: 0,
  },
};

const data = (canvas, graphData) => {
  const ctx = canvas.getContext('2d');
  const gradientFill = ctx.createLinearGradient(0, 0, 0, 200);
  gradientFill.addColorStop(0, 'rgba(225,116,116,0.5)');
  gradientFill.addColorStop(1, 'rgba(225,116,116,0.1)');
  return {
    labels: graphData(0),
    datasets: [
      {
        data: graphData(1),
        fill: true,
        backgroundColor: gradientFill,
        borderColor: 'rgba(225,116,103)',
        borderWidth: 1,
        color: '#000',
      },
    ],
  };
};

const Graph = ({ graphData }) => {
  const extractData = index => {
    return graphData?.contract_detail?.reduce((acc, cur) => {
      const extract = Object.values(cur);
      const date = extract[index];
      acc.push(date);

      return acc;
    }, []);
  };

  return (
    <Wrapper>
      <Position>
        <Line
          width="10vw"
          height="3.5vh"
          data={canvas => data(canvas, extractData)}
          options={options}
        />
      </Position>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const Position = styled.div`
  position: absolute;
  width: 100%;
`;

export default Graph;
