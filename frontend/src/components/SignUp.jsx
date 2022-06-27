import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { Wrapper } from './parts/Wrapper';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';
import { signUp } from '../lib/api/session';
import { signIn } from '../lib/api/session';
import { emailUniqueCheck } from '../lib/api/session';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUpTitle = styled.h1`
  text-align: center;
  font-weight: lighter;
  font-size: 1.5rem;
  color: rgb(85, 85, 85);
`
const FormLabel = styled.label`
  display:block;
  font-weight: lighter;
  font-size: 0.8rem;
  padding-bottom: 5px;
  color: rgb(85, 85, 85);
  }
`
const SignUpForm = styled.input`
  outline: 0;
  background: white;
  width: 100%;
  border: 0;
  margin: 0 0 5px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`
const SignUpButton = styled.input`
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
const LogInGuide = styled.span`
  font-size: 0.9rem;
  display: block;
  text-align: right;
`

export const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setIsSignedIn, setCurrentUser } = useContext(Context);
  const [ errorMessage, setErrorMessage ] = useState();
  const emailIsUnique = async (email) => {
    const res = await emailUniqueCheck({email:email});
    return res.data.userExistence === false
  };

  return (
    <>
     <Wrapper width={"360px"}>
        <SignUpTitle>新規ユーザー登録</SignUpTitle>
        <form
          onSubmit={handleSubmit(async(data) => {
            try {
              const res = await signUp({user:data});
              if (res.data.status === 'SUCCESS') {
                const login_res = await signIn(data);
                Cookies.set('_access_token', login_res.headers['access-token']);
                Cookies.set('_client', login_res.headers['client']);
                Cookies.set('_uid', login_res.headers['uid']);
                setIsSignedIn(true);
                setCurrentUser(res.data.data);
                navigate('/mypage');}
            } catch (e) {
              console.log(e);
              setErrorMessage("アカウント作成に失敗しました。");
            }
          })}
          >
            <div>
              <FormLabel>名前</FormLabel>
              <SignUpForm type="text" name="name" {...register("name", { required: true, maxLength: 15 })}/>
              {errors.name?.type === "required" && <ErrorMessage>名前を入力して下さい。</ErrorMessage>}
              {errors.name?.type === "maxLength" && <ErrorMessage>15文字以内で入力して下さい。</ErrorMessage>}
            </div>
            <div>
              <FormLabel>メールアドレス</FormLabel>
              <SignUpForm type="email" name="email" {...register("email", { required: true, maxLength: 255, pattern: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/, validate: emailIsUnique })}/>
              {errors.email?.type === "required" && <ErrorMessage>メールアドレスを入力して下さい。</ErrorMessage>}
              {errors.email?.type === "maxLength" && <ErrorMessage>255字以内で入力して下さい。</ErrorMessage>}
              {errors.email?.type === "pattern" && <ErrorMessage>正しい形式で入力して下さい。</ErrorMessage>}
              {errors.email && errors.email.type === "validate" && <ErrorMessage>このメールアドレスは既に使用されています。</ErrorMessage>}
            </div>
            <div>
              <FormLabel>パスワード</FormLabel>
              <SignUpForm type="password" name="password" {...register("password", { required: true, minLength: 6,maxLength: 71 })}/>
              {errors.password?.type === "required" && <ErrorMessage>パスワードを入力して下さい。</ErrorMessage>}
              {errors.password?.type === "minLength" && <ErrorMessage>パスワードが短すぎます。(最小6文字)</ErrorMessage>}
              {errors.password?.type === "maxLength" && <ErrorMessage>パスワードが長すぎます。(最大71文字)</ErrorMessage>}
            </div>
            <div>
              <FormLabel>パスワード(確認)</FormLabel>
              <SignUpForm type="password" name="password_confirmation" {...register("password_confirmation", { required: true, maxLength: 71 })}/>
              {errors.password_confirmation && <ErrorMessage>同一のパスワードを再度入力して下さい。</ErrorMessage>}
            </div>
            <SignUpButton value="アカウント作成" type="submit" />
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </form>
          <LogInGuide>既にアカウントをお持ちの方は:<Link to='/' >ログイン</Link></LogInGuide>
        </Wrapper>
    </>
  );
};
