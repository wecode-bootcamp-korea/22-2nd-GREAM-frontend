import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function SignUp() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [phoneNumValue, setPhoneNumValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPhoneNumValid, setIsPhoneNumValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);

  const isAllSignUpValueValid =
    isEmailValid && isPasswordValid && isPhoneNumValid && isNameValid;

  const controlInput = event => {
    const { name, value } = event.target;
    if (name === 'inputEmail') setEmailValue(value);
    if (name === 'inputPassword') setPasswordValue(value);
    if (name === 'inputPhoneNum') setPhoneNumValue(value);
    if (name === 'inputName') setNameValue(value);
  };

  const valueCheck = () => {
    const reg_email = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const reg_pwd =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    const reg_phone = phoneNumValue.length === 11;
    const reg_name = nameValue.length > 0;

    setIsEmailValid(reg_email.test(emailValue));
    setIsPasswordValid(reg_pwd.test(passwordValue));
    setIsPhoneNumValid(reg_phone);
    setIsNameValid(reg_name);
  };

  const goToMain = event => {
    event.preventDefault();

    if (!isAllSignUpValueValid) return;

    fetch('http://10.58.0.234:8000/users/signup', {
      method: 'post',
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        phone_number: phoneNumValue,
        name: nameValue,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          alert('회원가입이 되었습니다');
        } else {
          alert('이미 존재하는 회원정보입니다');
        }
      });
  };

  return (
    <SignUpForm onSubmit={goToMain}>
      <LoginTitle>회원가입</LoginTitle>

      <div className="inputNameBox">
        <InputTitle>이름*</InputTitle>
        <InputName
          type="text"
          name="inputName"
          className="inputName"
          placeholder="이름을 입력해주세요"
          onChange={controlInput}
          onKeyUp={valueCheck}
        />
      </div>
      <InputEmailBox>
        <InputTitle>이메일 주소*</InputTitle>
        <InputEmail
          type="text"
          name="inputEmail"
          className="inputEmail"
          placeholder="예) gream@gream.co.kr"
          onChange={controlInput}
          onKeyUp={valueCheck}
        />
      </InputEmailBox>
      <InputPasswordBox>
        <InputTitle>비밀번호*</InputTitle>
        <InputPassword
          type="password"
          name="inputPassword"
          className="inputPassword"
          placeholder="영문,숫자,특수문자 조합 8-16자"
          onChange={controlInput}
          onKeyUp={valueCheck}
        />
      </InputPasswordBox>
      <InputPhoneNumBox>
        <InputTitle>전화번호*</InputTitle>
        <InputPhoneNum
          type="number"
          name="inputPhoneNum"
          className="inputPhoneNum"
          placeholder="-제외 숫자 입력"
          onChange={controlInput}
          onKeyUp={valueCheck}
        />
      </InputPhoneNumBox>
      <SignUpButton
        type="submit"
        className="submitLoginInfoBtn"
        disabled={!isAllSignUpValueValid}
        // backgroundColor={isAllSignUpValueValid ? '#1D1D1D' : '#CBCBCB'}
        // cursor={isAllSignUpValueValid ? 'pointer' : 'default'}
      >
        회원가입
      </SignUpButton>
    </SignUpForm>
  );
}

const SignUpForm = styled.form`
  flex-direction: column;
  ${({ theme }) => theme.setFlex('center', 'center')};

  margin-top: 68px;
`;

const LoginTitle = styled.div`
  font-weight: bold;
  font-size: 32px;
  margin: 55px;
`;

const InputTitle = styled.div`
  //padding-left: 10px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
`;

const InputName = styled.input`
  margin-top: 5px;
  width: 350px;
  height: 45px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 1px;
`;

const InputEmail = styled.input`
  margin-top: 5px;

  width: 350px;
  height: 45px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 1px;
`;

const InputEmailBox = styled.div`
  margin-top: 20px;
`;

const InputPasswordBox = styled.div`
  margin-top: 20px;
`;

const InputPassword = styled.input`
  margin-top: 5px;
  padding-left: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 1px;
  width: 350px;
  height: 45px;
`;

const InputPhoneNumBox = styled.div`
  margin-top: 20px;
`;

const InputPhoneNum = styled.input`
  margin-top: 5px;
  padding-left: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 1px;
  width: 350px;
  height: 45px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SignUpButton = styled.button`
  margin-top: 35px;
  border-radius: 10px;
  border: none;
  width: 350px;
  height: 55px;
  font-size: 18px;
  font-weight: bold;
  background-color: none;
  color: white;
  background-color: ${props => (!props.disabled ? '#1D1D1D' : '#CBCBCB')};
  :hover {
    cursor: ${props => (!props.disabled ? 'pointer' : 'default')};
  }
`;
