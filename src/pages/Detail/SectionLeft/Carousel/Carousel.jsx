import React from 'react';
import styled from 'styled-components';
import sample from '../../../../images/sample.png';

const Carousel = () => {
  return (
    <>
      {/* <Swiper>
        <SwiperSlide>
          <Image />
        </SwiperSlide>
        <SwiperSlide>
          <Image />
        </SwiperSlide>
      </Swiper> */}
    </>
  );
};

const Image = styled.img.attrs(props => ({
  src: sample,
}));

export default Carousel;
