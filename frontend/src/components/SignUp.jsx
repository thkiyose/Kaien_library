import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { Header } from './parts/Header';
import { Wrapper } from './parts/Wrapper';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../lib/api/user';
import { useForm } from 'react-hook-form';

export const SignUp = () => {
  const [value,setValue] = useState({});
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(watch("name"));

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  };

  return (
    <>
      <Header />
      <Wrapper>
        <form onSubmit={handleSubmit(async (data) => await createUser({user: data}))}>
          <div>
            <label>名前</label>
            <input type="text" name="name" {...register("name", { required: true })}/>
            {errors.name && <span>名前を入力して下さい。</span>}
          </div>
          <div>
            <label>メールアドレス</label>
            <input type="text" name="email" {...register("email", { required: true })}/>
            {errors.email && <span>メールアドレスを入力して下さい。</span>}
          </div>
          <div>
            <label>パスワード</label>
            <input type="text" name="password" {...register("password", { required: true })}/>
            {errors.password && <span>パスワードを入力して下さい。</span>}
          </div>
          <div>
            <label>パスワード(確認)</label>
            <input type="text" name="password_confirmation" {...register("password_confirmation", { required: true })}/>
            {errors.password_confirmation && <span>同一のパスワードを再度入力して下さい。</span>}
          </div>
          <input value="アカウント作成" type="submit" />
        </form>
      </Wrapper>
    </>
  );
};
