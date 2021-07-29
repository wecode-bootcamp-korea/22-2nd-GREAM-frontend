import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SuggestPriceSaleComponent from './SuggestPriceSaleComponent';
import ImmediateSaleComponent from './ImmediateSaleComponent';
import BidDeadlineComponent from './BidDeadlineComponent';
import { useLocation } from 'react-router';
import {
  BID_SALE,
  IMMEDIATE_SALE,
  USER_INFO,
  PRODUCT_INFO,
  BID_PERCHASE,
} from '../../config';
import { useHistory } from 'react-router-dom';

export default function Bid() {
  const [bidPerchase, setBidPerchase] = useState(true);
  const [immediatePerchase, setImmediatePerchase] = useState(false);
  const [suggestedPriceValue, setSuggestedPriceValue] = useState('');
  const [buttonDate, setButtonDate] = useState('');
  const [buttonId, setButtonId] = useState('');
  const [cardCompany, setCardCompany] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
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

  const selectBidPerchase = () => {
    if (bidPerchase) {
      setBidPerchase(true);
      setImmediatePerchase(false);
    } else if (!bidPerchase) {
      setBidPerchase(true);
      setImmediatePerchase(false);
    }
  };

  const selectImmediatePerchase = () => {
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
  //입찰판매
  const submitBidSaleInfo = () => {
    const token = localStorage.getItem('login_token');
    fetch(`${BID_PERCHASE}`, {
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
        if (result.message === 'NEW_BID_CREATED') {
          alert('입찰 판매 신청이 완료되었습니다!');
          setRerender(!reRender);
          history.push('/');
        } else {
          alert('다시 시도해 주세요!');
        }
        console.log('입찰판매 메시지', result.message);
      });
  };
  //즉시판매
  const submitImmediateSaleInfo = () => {
    const token = localStorage.getItem('login_token');
    fetch(`${IMMEDIATE_SALE}`, {
      method: 'POST',
      headers: {
        Authorization: token
          ? token
          : localStorage.getItem('kakao_login_token'),
      },
      body: JSON.stringify({
        product_id: item,
        selling_bid_id: '',
        buying_bid_id: buyingBidId,
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log('즉시판매 메시지', result.message);
        if (result.message === 'CONTRACT_SUCCESS') {
          setRerender(!reRender);
          alert('체결 완료 되었습니다!');
          history.push('/');
        } else {
          alert('이미 체결 완료된 상품입니다');
        }
      });
  };

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
        setCardCompany(data.results.payment.card_company);
        setCardNumber(data.results.payment.card_number);
        setBankName(data.results.payment.bank_name);
        setBankAccount(data.results.payment.bank_account);
        setUserName(data.results.name);
        setUserAddress(data.results.address);
      });

    fetch(`${PRODUCT_INFO}/${item}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setPosterName(data.main_info.name);
        setCurrentBuyingPrice(data.main_info.current_buying_price);
        setCurrentSellingPrice(data.main_info.current_selling_price);
        setPosterImage(data.main_info.image_url[1]);
        setProductId(data.product_info.model_number);
        setBuyingBidId(data.main_info.oldest_buying_bidding_id);
        setSellingBidId(data.main_info.oldest_selling_bidding_id);
      });
  }, [reRender]);

  return (
    <BidMain>
      <ProductImgBox>
        <ProductImgFrame>
          <ProductImg alt="posterImg" src={posterImage} />
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
                {!currentBuyingPrice ? '---' : Math.floor(currentBuyingPrice)}
                <span>원</span>
              </ImmediatePerchasePrice>
            </ImmediatePerchasePriceBox>
            <ImmediateSalePriceBox>
              <ImmediateSalePriceTitle>즉시판매가</ImmediateSalePriceTitle>
              <ImmediateSalePrice>
                {!currentSellingPrice ? '---' : Math.floor(currentSellingPrice)}
                <span>원</span>
              </ImmediateSalePrice>
            </ImmediateSalePriceBox>
          </SuggestPrice>
          <SelectBidBox>
            <SelectPerchaseOrSaleButton>
              <BidSaleButton
                type="button"
                name="bidPerchaseButton"
                onClick={selectBidPerchase}
                backgroundColor={onlyBidPerchaseValid}
              >
                판매 입찰
              </BidSaleButton>
              <ImmediateSaleButton
                type="button"
                onClick={selectImmediatePerchase}
                backgroundColor={onlyImmediatePerchase}
                // disabled={!currentSellingPrice} //지금은 데이터가 null 여서 확인차 비활성화
              >
                즉시 판매
              </ImmediateSaleButton>
            </SelectPerchaseOrSaleButton>
          </SelectBidBox>

          {/* 컴포넌트화 */}
          {onlyBidPerchaseValid ? (
            <SuggestPriceSaleComponent
              suggestedPriceValue={suggestedPriceValue}
              setSuggestedPriceValue={setSuggestedPriceValue}
            />
          ) : null}

          {onlyImmediatePerchase ? (
            <ImmediateSaleComponent
              currentBuyingPrice={currentBuyingPrice}
              currentSellingPrice={currentSellingPrice}
            />
          ) : null}
        </BidDetail>

        {onlyBidPerchaseValid ? (
          <BidDeadlineComponent
            buttonDate={buttonDate}
            setButtonDate={setButtonDate}
            buttonId={buttonId}
            setButtonId={setButtonId}
          />
        ) : null}
        <CreditCardInfoBox>
          <CreditCardTitle>정산받으실 계좌</CreditCardTitle>
          <CardCompanyBox>
            {' '}
            카드사
            <CardCompany>신한</CardCompany>
          </CardCompanyBox>
          <CardNumberBox>
            카드번호<CardNumber>9999999999</CardNumber>
          </CardNumberBox>
          <div>
            <span>신한</span>은행
          </div>
          <BankAccountBox>
            계좌번호<BankAccount>99999999999</BankAccount>
          </BankAccountBox>
        </CreditCardInfoBox>
        <ShipmentInfo>
          <ShipmentAddressDetailBox>
            <ShipmentTitle>반송 주소</ShipmentTitle>
            <ShipmentReciever>{userName}</ShipmentReciever>
            <div className="ShipmentAddress">
              충청남도 --시 --아파트 --동 --호
            </div>
          </ShipmentAddressDetailBox>
        </ShipmentInfo>

        <SubmitButtonBox>
          {onlyBidPerchaseValid ? (
            <ContinueBidButtonForBidPerchase
              disabled={!isAllBidValueValid}
              onClick={submitBidSaleInfo}
            >
              판매 입찰 신청
            </ContinueBidButtonForBidPerchase>
          ) : (
            <ContinueBidButtonForImmediatePerchase
              // disabled={false}
              // onClick={submitBidPerchaseInfo}
              onClick={submitImmediateSaleInfo}
            >
              즉시 판매 신청
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

const BidSaleButton = styled.button`
  width: 50%;
  height: 40px;
  border-radius: 18px;
  background-color: ${props =>
    props.backgroundColor
      ? ({ theme }) => theme.green
      : ({ theme }) => theme.cardBackground};
  border: none;
`;

const ImmediateSaleButton = styled.button`
  width: 50%;
  height: 40px;
  border-radius: 18px;
  background-color: ${props =>
    props.backgroundColor
      ? ({ theme }) => theme.green
      : ({ theme }) => theme.cardBackground};
  border: none;
  font-weight: ${props => (props.backgroundColor ? 'bold' : '')};
  color: ${props => (props.backgroundColor ? 'white' : 'black')};
`;

const CreditCardInfoBox = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 0 35px;
  padding-top: 10px;
  background-color: #ffffff;
  height: 120px;
`;

const CreditCardTitle = styled.div`
  font-weight: bold;
`;

const CardCompanyBox = styled.div`
  margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const CardCompany = styled.span`
  padding-left: 5px;
`;

const CardNumberBox = styled.div`
  margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const CardNumber = styled.span`
  padding-left: 5px;
`;

const BankAccountBox = styled.div`
  margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const BankAccount = styled.span`
  padding-left: 5px;
`;

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
  font-weight: bold;
`;

const ShipmentReciever = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

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
