import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { logIn } from '../lib/api/session';
import { Header } from './parts/Header'
import { Wrapper } from './parts/Wrapper'
import { Link } from 'react-router-dom';

export const Login = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  return (
    <>
      <Header />
      <Wrapper>
        <p>ログイン</p>
        <h2>ログイン状態: {props.loggedInStatus}</h2>
        <form
          onSubmit={handleSubmit(async(data) => {
            try {
              const res = await logIn({user:data},{withCredentials: true});
              if (res.data.status === 'SUCCESS') {
                props.handleLogin(res);
                navigate('/');}
            } catch (e) {
            }
          })}
          >
            <div>
              <label>名前</label>
              <input type="text" name="name" {...register("name", { required: true, maxLength: 15 })}/>
              {errors.name?.type === "required" && <span>名前を入力して下さい。</span>}
              {errors.name?.type === "maxLength" && <span>15文字以内で入力して下さい。</span>}
            </div>
            <div>
              <label>メールアドレス</label>
              <input type="email" name="email" {...register("email", { required: true, maxLength: 255, pattern: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/ })}/>
              {errors.email?.type === "required" && <span>メールアドレスを入力して下さい。</span>}
              {errors.email?.type === "maxLength" && <span>255字以内で入力して下さい。</span>}
              {errors.email?.type === "pattern" && <span>正しい形式で入力して下さい。</span>}
            </div>
            <div>
              <label>パスワード</label>
              <input type="password" name="password" {...register("password", { required: true })}/>
              {errors.password?.type === "required" && <span>パスワードを入力して下さい。</span>}
            </div>
            <input value="ログイン" type="submit" />
          </form>
        <Link to='/signup' >新規登録</Link>
      </Wrapper>
    </>
  );
};
