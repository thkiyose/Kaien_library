import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signIn } from '../lib/api/session';
import Cookies from 'js-cookie';
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';

const buttonStyle = {
  padding:"7px",
  border:"None",
  backgroundColor:"rgb(39, 93, 54)",
  color:"white",
  borderRadius:"5px",
  fontWeight:"bold",
}

export const Login = (props) => {
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [ errorMessage, setErrorMessage ] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <>
        <p>ログイン</p>
        <p>{errorMessage}</p>
        <form
          onSubmit={handleSubmit(async(data) => {
            try {
              const res = await signIn(data);
              console.log(res);
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
            <input value="ログイン" type="submit" style={buttonStyle} />
          </form>
        <Link to='/signup' >新規登録</Link>
    </>
  );
};
