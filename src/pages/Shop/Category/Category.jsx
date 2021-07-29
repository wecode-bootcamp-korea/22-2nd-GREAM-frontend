import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Category = ({ bestAuthor }) => {
  // const [bestAuthor, setBestList] = useState([]);

  // useEffect(() => {
  //   getBestList();
  // }, []);

  // const getBestList = () => {
  //   fetch('/data/best.json')
  //     .then(res => res.json())
  //     .then(data => {
  //       setBestList(data.bestDesigner);
  //     });
  // };

  return (
    <CategoryWrapper>
      <Box>
        <i class="fas fa-list-ol"></i>
      </Box>
      {bestAuthor.map((bestAuthor, idx) => (
        <Box key={idx} id={bestAuthor.author_id}>
          {bestAuthor.top_author}
        </Box>
      ))}
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div`
  width: 1200px;
  height: 43px;
  padding: 16px 0 40px 0;
  border-bottom: 1px solid black;
`;

const Box = styled.span`
  border-radius: 12px;
  padding: 6px 12px;
  margin-right: 3px;
  font-size: 15px;
  background-color: ${props => props.theme.cardBackground};
`;

export default Category;
