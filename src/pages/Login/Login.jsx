import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import theme from '../../styles/theme';
import { GENERAL_LOGIN, KAKAO_LOGIN } from '../../config';

export default function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const isAllLoginValueValid = isEmailValid && isPasswordValid;

  const controlValue = event => {
    const { name, value } = event.target;
    if (name === 'inputEmail') setEmailValue(value);
    if (name === 'inputPassword') setPasswordValue(value);
  };

  const allLoginValueCheck = () => {
    const reg_email = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const reg_pwd =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

    setIsEmailValid(reg_email.test(emailValue));

    setIsPasswordValid(reg_pwd.test(passwordValue));
  };

  let history = useHistory();

  const goToMain = e => {
    e.preventDefault();

    if (!isAllLoginValueValid) {
      return;
    }

    fetch(`${GENERAL_LOGIN}`, {
      method: 'POST',
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log('백엔드로부터 받은 토큰', result);
        if (result.message === 'SUCCESS') {
          localStorage.setItem('login_token', result.TOKEN);
          alert('로그인 되었습니다!');
          history.push('/');
        } else {
          alert('잘못된 정보입니다. 다시 입력해주세요!');
        }
      });
  };

  const goToKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function (response) {
        console.log(response);
        //http://10.58.4.218:8000/users/signin/kakao
        fetch(`${KAKAO_LOGIN}`, {
          method: 'GET',
          headers: {
            Authorization: response.access_token,
          },
        })
          .then(result => result.json())
          .then(result => {
            console.log(result);

            if (result.TOKEN) {
              localStorage.setItem('login_kakao_token', result.TOKEN);
              alert('로그인이 되었습니다!');
              history.push('/');
            } else {
              alert('로그인 정보를 다시 확인해주세요');
            }
          });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  return (
    <LoginForm onSubmit={goToMain}>
      <LoginLogo>GREAM</LoginLogo>
      <div className="inputEmailBox">
        <InputTitle>이메일 주소</InputTitle>
        <InputEmail
          type="text"
          name="inputEmail"
          className="inputEmail"
          placeholder="예) gream@gream.co.kr"
          onChange={controlValue}
          onKeyUp={allLoginValueCheck}
        />
      </div>
      <InputPasswordBox>
        <InputTitle>비밀번호</InputTitle>
        <InputPassword
          type="password"
          name="inputPassword"
          className="inputPassword"
          placeholder="비밀번호"
          onChange={controlValue}
          onKeyUp={allLoginValueCheck}
        />
      </InputPasswordBox>
      <BasicLoginButton
        type="submit"
        className="submitLoginInfoBtn"
        disabled={!isAllLoginValueValid}
      >
        로그인
      </BasicLoginButton>
      <SocialLoginButton
        //type="button"
        className="submitLoginInfoBtn"
        onClick={goToKakaoLogin}
      >
        <KakaoLogin src="https://user-images.githubusercontent.com/70811550/126318637-aaa3db8c-bc8d-4b5d-b378-663d5f3cb51a.png" />
      </SocialLoginButton>
      <SignUpBox>
        <SignupWithEmail onClick={() => history.push('/signup')}>
          이메일로 회원가입
        </SignupWithEmail>
        <CheckEmail>이메일 찾기</CheckEmail>
        <CheckPassword>비밀번호 찾기</CheckPassword>
      </SignUpBox>
    </LoginForm>
  );
}

const InputTitle = styled.div`
  text-align: left;
  font-size: 14px;
  font-weight: bold;
`;

const InputEmail = styled.input`
  margin-top: 5px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 1px;
  width: 350px;
  height: 45px;
`;

const InputPasswordBox = styled.div`
  margin-top: 10px;
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

const BasicLoginButton = styled.button`
  margin-top: 45px;
  border-radius: 10px;
  border: none;
  width: 350px;
  height: 55px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: ${props => (!props.disabled ? '#1D1D1D' : '#CBCBCB')};
  :hover {
    cursor: ${props => (!props.disabled ? 'pointer' : 'default')};
  }
`;

const SocialLoginButton = styled.a`
  margin: 10px;
  width: 350px;
  height: 55px;
  border-radius: 10px;
  border: none;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

const KakaoLogin = styled.img`
  width: 350px;
  height: 55px;
  border-radius: 10px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const LoginForm = styled.form`
  flex-direction: column;
  ${({ theme }) => theme.setFlex('center', 'center')};

  margin-top: 150px;
  margin-bottom: 150px;
`;

const LoginLogo = styled.div`
  margin-bottom: 40px;
  ${({ theme }) => theme.resetBtn}
  font-size: 50px;
  font-weight: 500;
  font-style: italic;
`;

const SignUpBox = styled.div`
  ${({ theme }) => theme.setFlex('center', 'space-between')};
  font-size: 13px;
  width: 350px;
  margin-top: 12px;
`;

const SignupWithEmail = styled.div`
  text-align: left;
  padding-left: 20px;
  cursor: pointer;
`;

const CheckEmail = styled.div`
  padding-right: 20px;
  padding-left: 20px;
`;

const CheckPassword = styled.div`
  padding-right: 20px;
`;
