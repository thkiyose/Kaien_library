import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { Wrapper } from './parts/Wrapper';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signIn } from '../lib/api/session';
import Cookies from 'js-cookie';
import { Context } from '../App';
import { Link } from 'react-router-dom';

const LoginTitle = styled.h1`
  text-align: center;
  font-weight: lighter;
  color: rgb(85, 85, 85);
  }
`
const FormLabel = styled.label`
  display:block;
  font-weight: lighter;
  font-size: 0.8rem;
  padding-bottom: 5px;
  color: rgb(85, 85, 85);
  }
`
const LoginForm = styled.input`
  outline: 0;
  background: white;
  width: 100%;
  border: 0;
  margin: 0 0 5px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`
const LoginButton = styled.input`
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #2e8b57;
  font-size: 1rem;
  width: 100%;
  border: 0;
  margin-top: 20px;
  padding: 15px;
  color: #FFFFFF;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
`
const ErrorMessage = styled.span`
  font-size: 0.8rem;
  display: block;
  background-color: #bde6cf;
`
const SignUpGuide = styled.span`
  font-size: 0.9rem;
  display: block;
  text-align: right;
`

export const Login = (props) => {
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useContext(Context);
  const [ errorMessage, setErrorMessage ] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <>
      <Wrapper width={"360px"}>
        <LoginTitle>ログイン</LoginTitle>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <form
          onSubmit={handleSubmit(async(data) => {
            try {
              const res = await signIn(data);
              if (res.status === 200) {
                Cookies.set('_access_token', res.headers['access-token']);
                Cookies.set('_client', res.headers['client']);
                Cookies.set('_uid', res.headers['uid']);
                setIsSignedIn(true);
                setCurrentUser(res.data.data);
                navigate('/mypage');}
            } catch (e) {
              console.log(e);
              setErrorMessage("ログインに失敗しました。メールアドレスとパスワードをご確認下さい。");
            }
          })}
          >
            <div>
              <FormLabel>メールアドレス</FormLabel>
              <LoginForm className="form" type="email" name="email" {...register("email", { required: true, maxLength: 255, pattern: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/ })}/>
              {errors.email?.type === "required" && <ErrorMessage>メールアドレスを入力して下さい。</ErrorMessage>}
              {errors.email?.type === "maxLength" && <ErrorMessage>255字以内で入力して下さい。</ErrorMessage>}
              {errors.email?.type === "pattern" && <ErrorMessage>正しい形式で入力して下さい。</ErrorMessage>}
            </div>
            <div>
              <FormLabel>パスワード</FormLabel>
              <LoginForm className="form" type="password" name="password" {...register("password", { required: true })}/>
              {errors.password?.type === "required" && <ErrorMessage>パスワードを入力して下さい。</ErrorMessage>}
            </div>
            <LoginButton value="ログイン" type="submit" />
          </form>
        <SignUpGuide>初めてご利用の方は:<Link to='/signup' >新規登録</Link></SignUpGuide>
      </Wrapper>
    </>
  );
};
