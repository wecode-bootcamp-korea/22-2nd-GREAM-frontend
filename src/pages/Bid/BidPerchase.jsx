import React, { useEffect, useState } from 'react';
import SuggestPricePerchaseComponent from './SuggestPricePerchaseComponent';
import ImmediatePerchaseComponent from './ImmediatePerchaseComponent';
import BidDeadlineComponent from './BidDeadlineComponent';
import styled from 'styled-components';

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

    fetch('http://18.222.211.21:8000/orders/bidding?type=buy', {
      method: 'POST',
      body: JSON.stringify({
        product_id: 10,
        expired_within_id: +buttonId,
        price: +suggestedPriceValue,
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log('메시지', result.message); // 확인
      });
  };

  //즉시구매
  const submitImmediateBidPerchase = () => {
    fetch('http://18.222.211.21:8000/orders/contract?type=buy', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        selling_bid_id: sellingBidId,
        buying_bid_id: '',
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'CONTRACT_SUCCESS') {
          alert('거래가 체결되었습니다!');
        } else if (result.message === 'SELLING_BID_NOT_FOUND') {
          alert('이미 체결된 거래입니다!');
        }
        console.log('즉시구매 메시지', result.message);
      });
  };
  //유저 정보 / 상품 정보
  useEffect(() => {
    fetch('http://18.222.211.21:8000/users/info', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setUserName(data.results.name);
        setUserAddress(data.results.address);
      });

    fetch('http://18.222.211.21:8000/products/80', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setPosterName(data.main_info[0].name);
        setPosterImage(data.main_info[0].image_url[1]);
        setCurrentBuyingPrice(data.main_info[0].current_buying_price);
        setCurrentSellingPrice(data.main_info[0].current_selling_price);
        setProductId(data.product_info[0].model_number);
        setBuyingBidId(data.main_info[0].oldest_buying_bidding_id);
        setSellingBidId(data.main_info[0].oldest_selling_bidding_id);
      });
  }, []);

  //
  const isCurrentBuyingPriceValid = currentBuyingPrice;
  const isCurrentSellingPrice = currentSellingPrice;

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
                {isCurrentBuyingPriceValid
                  ? Math.round(currentBuyingPrice)
                  : '--'}{' '}
                <span>원</span>
              </ImmediatePerchasePrice>
            </ImmediatePerchasePriceBox>
            <ImmediateSalePriceBox>
              <ImmediateSalePriceTitle>즉시판매가</ImmediateSalePriceTitle>
              <ImmediateSalePrice>
                {isCurrentSellingPrice ? Math.round(currentSellingPrice) : '--'}{' '}
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
                disabled={!isCurrentBuyingPriceValid}
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
            <div className="ShipmentAddress">{userAddress}</div>
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

//피알올리기  - 이 부분 너비가 BidBox 범위를 넘어가는데 이유를 모르겠습니다
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
    props.backgroundColor
      ? props.theme.red
      : props.theme.cardBackground}; // 아예적용이 안되고 있는듯 ?
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
`;

const ShipmentReciever = styled.div`
  margin-bottom: 5px;
`;

//버튼정렬 안되는 부분 피알 올리기 (도저히 알 수 없음!)
const ShipmentInfoChangeButtonBox = styled.span`
  display: ${({ theme }) => theme.setFlex('center', 'center')};
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
