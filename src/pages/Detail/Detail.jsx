import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SectionLeft from './SectionLeft/SectionLeft';
import SectionRight from './SectionRight/SectionRight';
import { PRODUCTS_API } from '../../config';

const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState([]);
  const mainInfo = detailData?.main_info;

  const fetchDetailData = () => {
    fetch(`${PRODUCTS_API}/${id}`)
      .then(res => res.json())
      .then(data => setDetailData(data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchDetailData();
  }, []);

  return (
    <Wrapper>
      <SectionLeft mainInfo={mainInfo} />
      <SectionRight detailData={detailData} />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  ${props => props.theme.setFlex('center', 'flex-start')};
  margin: 100px auto;
`;

export default Detail;
