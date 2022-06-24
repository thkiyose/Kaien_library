import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';
import { signUp } from '../lib/api/session';
import { signIn } from '../lib/api/session';
import { emailUniqueCheck } from '../lib/api/session';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setIsSignedIn, setCurrentUser } = useContext(Context);
  const emailIsUnique = async (email) => {
    const res = await emailUniqueCheck({email:email});
    return res.data.userExistence === false
  };

  return (
    <>
      <p>新規ユーザー登録</p>
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
            <input type="email" name="email" {...register("email", { required: true, maxLength: 255, pattern: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/, validate: emailIsUnique })}/>
            {errors.email?.type === "required" && <span>メールアドレスを入力して下さい。</span>}
            {errors.email?.type === "maxLength" && <span>255字以内で入力して下さい。</span>}
            {errors.email?.type === "pattern" && <span>正しい形式で入力して下さい。</span>}
            {errors.email && errors.email.type === "validate" && <span>このメールアドレスは既に使用されています。</span>}
          </div>
          <div>
            <label>パスワード</label>
            <input type="password" name="password" {...register("password", { required: true, minLength: 6,maxLength: 71 })}/>
            {errors.password?.type === "required" && <span>パスワードを入力して下さい。</span>}
            {errors.password?.type === "minLength" && <span>パスワードが短すぎます。(最小6文字)</span>}
            {errors.password?.type === "maxLength" && <span>パスワードが長すぎます。(最大71文字)</span>}
          </div>
          <div>
            <label>パスワード(確認)</label>
            <input type="password" name="password_confirmation" {...register("password_confirmation", { required: true, maxLength: 71 })}/>
            {errors.password_confirmation && <span>同一のパスワードを再度入力して下さい。</span>}
          </div>
          <input value="アカウント作成" type="submit" />
        </form>
        <p>既にアカウントをお持ちの方は:<Link to='/' >ログイン</Link></p>
    </>
  );
};
