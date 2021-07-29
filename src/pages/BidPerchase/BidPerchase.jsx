import React, { useEffect, useState } from 'react';
import SuggestPricePerchaseComponent from './SuggestPricePerchaseComponent';
import ImmediatePerchaseComponent from './ImmediatePerchaseComponent';
import BidDeadlineComponent from './BidDeadlineComponent';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';

import {
  BID_PERCHASE,
  IMMEDIATE_PERCHASE,
  USER_INFO,
  PRODUCT_INFO,
  BID_SALE,
} from '../../config';

export default function Bid() {
  const [bidPerchase, setBidPerchase] = useState(true);
  const [immediatePerchase, setImmediatePerchase] = useState(false);
  const [suggestedPriceValue, setSuggestedPriceValue] = useState('');
  const [buttonDate, setButtonDate] = useState('');
  const [buttonId, setButtonId] = useState('');

  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const [posterName, setPosterName] = useState('');
  const [currentBuyingPrice, setCurrentBuyingPrice] = useState(1);
  const [currentSellingPrice, setCurrentSellingPrice] = useState(1);
  const [posterImage, setPosterImage] = useState('');
  const [productId, setProductId] = useState('');

  const [buyingBidId, setBuyingBidId] = useState('');
  const [sellingBidId, setSellingBidId] = useState('');

  const [reRender, setRerender] = useState(false);

  let history = useHistory();
  const location = useLocation();
  const item = location.state.id;

  const SelectBidPerchase = () => {
    if (bidPerchase) {
      setBidPerchase(true);
      setImmediatePerchase(false);
    } else if (!bidPerchase) {
      setBidPerchase(true);
      setImmediatePerchase(false);
    }
  };

  const ImmediatePerchase = () => {
    if (immediatePerchase) {
      setImmediatePerchase(true);
      setBidPerchase(false);
    } else if (!immediatePerchase) {
      setBidPerchase(false);
      setImmediatePerchase(true);
    }
  };

  const onlyBidPerchaseValid = bidPerchase && !immediatePerchase;
  const onlyImmediatePerchase = !bidPerchase && immediatePerchase;

  const isAllBidValueValid = buttonDate !== '' && suggestedPriceValue !== '';

  const submitBidPerchaseInfo = event => {
    if (!isAllBidValueValid) {
      return;
    }
    //입찰 구매
    const token = localStorage.getItem('login_token');
    fetch(`${BID_SALE}`, {
      method: 'POST',
      headers: {
        Authorization: token
          ? token
          : localStorage.getItem('kakao_login_token'),
      },
      body: JSON.stringify({
        product_id: item,
        expired_within_id: Number(buttonId),
        price: Number(suggestedPriceValue),
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(`result`, result);
        if (result.message === 'NEW_BID_CREATED') {
          alert('입찰 구매 신청이 완료되었습니다!');
          setRerender(!reRender);
          history.push('/');
        } else {
          alert('다시 시도해 주세요!');
        }
        console.log('메시지', result.message);
      });
  };

  //즉시구매
  const submitImmediateBidPerchase = () => {
    const token = localStorage.getItem('login_token');
    fetch(`${IMMEDIATE_PERCHASE}`, {
      method: 'POST',
      headers: {
        Authorization: token
          ? token
          : localStorage.getItem('kakao_login_token'),
      },
      body: JSON.stringify({
        product_id: item,
        selling_bid_id: sellingBidId,
        buying_bid_id: '',
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'CONTRACT_SUCCESS') {
          alert('거래가 체결되었습니다!');
          history.push('/');
        } else if (result.message === 'SELLING_BID_NOT_FOUND') {
          alert('이미 체결된 거래입니다!');
        }
        console.log('즉시구매 메시지', result.message);
      });
  };
  //유저 정보 / 상품 정보
  useEffect(() => {
    const token = localStorage.getItem('login_token');
    fetch(`${USER_INFO}`, {
      method: 'GET',
      headers: {
        Authorization: token
          ? token
          : localStorage.getItem('kakao_login_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserName(data.results.name);
        setUserAddress(data.results.address);
      });

    fetch(`${PRODUCT_INFO}/${item}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        console.log(`data`, data);
        setPosterName(data.main_info.name);
        setPosterImage(data.main_info.image_url[1]);
        setCurrentBuyingPrice(data.main_info.current_buying_price);
        setCurrentSellingPrice(data.main_info.current_selling_price);
        setProductId(data.product_info.model_number);
        setBuyingBidId(data.main_info.oldest_buying_bidding_id);
        setSellingBidId(data.main_info.oldest_selling_bidding_id);
      });
  }, [reRender]);

  return (
    <BidMain>
      <ProductImgBox>
        <ProductImgFrame>
          <ProductImg alt="product img" src={posterImage} />
          <ImgInfo>{posterName}</ImgInfo>
        </ProductImgFrame>
      </ProductImgBox>
      <BidBox>
        <BidDetail>
          <SuggestPrice>
            <ImmediatePerchasePriceBox>
              <ImmediatePerchasePriceTitle>
                즉시구매가
              </ImmediatePerchasePriceTitle>
              <ImmediatePerchasePrice>
                {currentBuyingPrice ? Math.round(currentBuyingPrice) : '---'}
                <span>원</span>
              </ImmediatePerchasePrice>
            </ImmediatePerchasePriceBox>
            <ImmediateSalePriceBox>
              <ImmediateSalePriceTitle>즉시판매가</ImmediateSalePriceTitle>
              <ImmediateSalePrice>
                {currentSellingPrice ? Math.round(currentSellingPrice) : '---'}
                <span>원</span>
              </ImmediateSalePrice>
            </ImmediateSalePriceBox>
          </SuggestPrice>
          <SelectBidBox>
            <SelectPerchaseOrSaleButton>
              <BidPerchaseButton
                type="button"
                name="bidPerchaseButton"
                onClick={SelectBidPerchase}
                backgroundColor={onlyBidPerchaseValid}
              >
                구매 입찰
              </BidPerchaseButton>
              <ImmediatePerchaseButton
                type="button"
                onClick={ImmediatePerchase}
                backgroundColor={onlyImmediatePerchase}
                //disabled={!currentBuyingPrice}
              >
                즉시 구매
              </ImmediatePerchaseButton>
            </SelectPerchaseOrSaleButton>
          </SelectBidBox>

          {/* 컴포넌트화 */}
          {onlyBidPerchaseValid && (
            <SuggestPricePerchaseComponent
              suggestedPriceValue={suggestedPriceValue}
              setSuggestedPriceValue={setSuggestedPriceValue}
            />
          )}

          {onlyImmediatePerchase && (
            <ImmediatePerchaseComponent
              currentBuyingPrice={currentBuyingPrice}
            />
          )}
        </BidDetail>

        {onlyBidPerchaseValid && (
          <BidDeadlineComponent
            buttonDate={buttonDate}
            setButtonDate={setButtonDate}
            buttonId={buttonId}
            setButtonId={setButtonId}
          />
        )}

        <ShipmentInfo>
          <ShipmentAddressDetailBox>
            <ShipmentTitle>배송 주소</ShipmentTitle>
            <ShipmentReciever>{userName}</ShipmentReciever>
            <div className="ShipmentAddress">
              충청남도 내포 신도시 00 아파트 --동 --호{' '}
            </div>
          </ShipmentAddressDetailBox>
        </ShipmentInfo>

        <SubmitButtonBox>
          {onlyBidPerchaseValid ? (
            <ContinueBidButtonForBidPerchase
              onClick={submitBidPerchaseInfo}
              disabled={!isAllBidValueValid}
            >
              구매 입찰 계속
            </ContinueBidButtonForBidPerchase>
          ) : (
            <ContinueBidButtonForImmediatePerchase
              onClick={submitImmediateBidPerchase}
              disabled={false}
            >
              구매 입찰 계속
            </ContinueBidButtonForImmediatePerchase>
          )}
        </SubmitButtonBox>
      </BidBox>
    </BidMain>
  );
}

const BidMain = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 98px;
  background-color: #fafafa;
`;

const ProductImgBox = styled.div`
  height: 550px;
  padding-bottom: 20px;
  margin-top: 79px;
  margin-left: 50px;
  background-color: white;
  box-shadow: 2.5px 2.5px 10px 2.5px ${({ theme }) => theme.subFontColor};
`;

const ProductImgFrame = styled.div`
  width: 450px;
  height: 100%;
  margin: 20px;
  padding: 10px;
  background-color: white;
`;

const ProductImg = styled.img`
  width: 430px;
  height: 430px;
  border-radius: 15px;
`;

const ImgInfo = styled.div`
  background-color: white;
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
`;

const BidBox = styled.div`
  //flex: 0 0 20%;
  width: 50%;

  margin: 10px;
  margin-right: 50px;
  margin-top: 79px;
  flex-direction: column;
  ${({ theme }) => theme.setFlex('flex-start')};
  background-color: ${({ theme }) => theme.cardBackground};
`;

const BidDetail = styled.div`
  background-color: #ffffff;
  width: 100%;
`;

const SuggestPrice = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SelectBidBox = styled.div`
  padding: 0 35px;
  display: flex;
  justify-content: space-between;
`;

const ImmediatePerchasePriceBox = styled.div`
  margin: 30px;
`;

const ImmediatePerchasePriceTitle = styled.div`
  width: 300px;
  text-align: center;
  font-size: 13px;
  margin: 5px;
  padding-left: 100px;
`;

const ImmediatePerchasePrice = styled.div`
  text-align: center;
  padding-left: 100px;
`;

const ImmediateSalePriceBox = styled.div`
  margin: 30px;
`;

const ImmediateSalePriceTitle = styled.div`
  width: 300px;
  text-align: center;
  font-size: 13px;
  margin: 5px;
  padding-right: 100px;
`;

const ImmediateSalePrice = styled.div`
  text-align: center;
  padding-right: 100px;
`;

const SelectPerchaseOrSaleButton = styled.div`
  ${({ theme }) => theme.setFlex('center')};
  width: 100%;
`;

const BidPerchaseButton = styled.button`
  width: 50%;
  height: 40px;
  border-radius: 18px;
  background-color: ${props =>
    props.backgroundColor ? props.theme.red : props.theme.cardBackground};
  border: none;
  font-weight: ${props => (props.backgroundColor ? 'bold' : '')};
  color: ${props => (props.backgroundColor ? 'white' : 'black')};
`;

const ImmediatePerchaseButton = styled.button`
  width: 50%;
  height: 40px;
  border-radius: 18px;
  background-color: ${props =>
    props.backgroundColor ? props.theme.red : props.theme.cardBackground};
  border: none;
  font-weight: ${props => (props.backgroundColor ? 'bold' : '')};
  color: ${props => (props.backgroundColor ? 'white' : 'black')};
`;
//////////////////

const ShipmentInfo = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 0 35px;
  background-color: #ffffff;
  // display: ${({ theme }) => theme.setFlex('space-between', '')};
`;

const ShipmentAddressDetailBox = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ShipmentTitle = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
`;

const ShipmentReciever = styled.div`
  margin-bottom: 5px;
`;

const SubmitButtonBox = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: white;
  padding: 0 35px;
`;

const ContinueBidButtonForBidPerchase = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  font-size: 18px;
  color: white;
  background-color: ${props =>
    props.disabled ? '#EBEBEB' : ({ theme }) => theme.fontColor};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`;

const ContinueBidButtonForImmediatePerchase = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  font-size: 18px;
  color: white;
  background-color: black;
  cursor: pointer;
`;
