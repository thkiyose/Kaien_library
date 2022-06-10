import React, { useState } from 'react';
import { Header } from './parts/Header';
import { Wrapper } from './parts/Wrapper';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../lib/api/user';

export const SignUp = () => {
  const [value,setValue] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await createUser({user: value});
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Header />
      <Wrapper>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>名前</label>
            <input type="text" name="name" id="name" onChange={(e) => handleChange(e)} value={value.name}/>
          </div>
          <div>
            <label>メールアドレス</label>
            <input type="text" name="email" id="email" onChange={(e) => handleChange(e)} value={value.email}/>
          </div>
          <div>
            <label>パスワード</label>
            <input type="text" name="password" id="password" onChange={(e) => handleChange(e)} value={value.password}/>
          </div>
          <div>
            <label>パスワード(確認)</label>
            <input type="text" name="password_confirmation" id="password_confirmation" onChange={(e) => handleChange(e)} value={value.password_confirmation}/>
          </div>
          <input value="アカウント作成" type="submit" />
        </form>
      </Wrapper>
    </>
  );
};
