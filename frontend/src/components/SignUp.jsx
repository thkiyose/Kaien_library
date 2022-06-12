import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { Header } from './parts/Header';
import { Wrapper } from './parts/Wrapper';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../lib/api/user';
import { useForm } from 'react-hook-form';

export const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  return (
    <>
      <Header />
      <Wrapper>
        <form onSubmit={handleSubmit(async (data) => await createUser({user: data}))}>
          <div>
            <label>名前</label>
            <input type="text" name="name" {...register("name", { required: true, maxLength: 15 })}/>
            {errors.name?.type === "required" && <span>名前を入力して下さい。</span>}
            {errors.name?.type === "maxLength" && <span>15文字以内で入力して下さい。</span>}
          </div>
          <div>
            <label>メールアドレス</label>
            <input type="text" name="email" {...register("email", { required: true, maxLength: 255, pattern: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/ })}/>
            {errors.email?.type === "required" && <span>メールアドレスを入力して下さい。</span>}
            {errors.email?.type === "maxLength" && <span>255字以内で入力して下さい。</span>}
            {errors.email?.type === "pattern" && <span>正しい形式で入力して下さい。</span>}
          </div>
          <div>
            <label>パスワード</label>
            <input type="text" name="password" {...register("password", { required: true, maxLength: 71 })}/>
            {errors.password?.type === "required" && <span>パスワードを入力して下さい。</span>}
            {errors.password?.type === "maxLength" && <span>パスワードが長すぎます。(最大71文字)</span>}
          </div>
          <div>
            <label>パスワード(確認)</label>
            <input type="text" name="password_confirmation" {...register("password_confirmation", { required: true, maxLength: 71 })}/>
            {errors.password_confirmation && <span>同一のパスワードを再度入力して下さい。</span>}
          </div>
          <input value="アカウント作成" type="submit" />
        </form>
      </Wrapper>
    </>
  );
};
