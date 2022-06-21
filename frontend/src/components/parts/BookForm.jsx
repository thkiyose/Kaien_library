import React from 'react';
import { useForm } from 'react-hook-form';

export const BookForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <>
      <form>
        <div className="isbnInput">
          <input type="text" name="isbn" {...register("isbn")}/><button>ISBNから情報を取得</button>
        </div>
          <div>
            <label>タイトル</label>
            <input type="text" name="title" {...register("title", { required: true, maxLength: 255 })}/>
            {errors.title?.type === "required" && <span>タイトルを入力して下さい。</span>}
            {errors.title?.type === "maxLength" && <span>タイトルが長すぎます。255文字以内で入力して下さい。</span>}
            <label>著者名</label>
            <input type="text" name="author" {...register("author", { required: true, maxLength: 255 })}/>
            {errors.author?.type === "required" && <span>著者名を入力して下さい。</span>}
            {errors.author?.type === "maxLength" && <span>著者名が長すぎます。255字以内で入力して下さい。</span>}
            <label>カテゴリー</label>
            <select name="category_id" {...register("category_id", { required: true })}/>
            {errors.category_id?.type === "required" && <span>カテゴリーを選んで下さい。</span>}
            <label>出版年</label>
            <input type="text" name="published_year" {...register("password_confirmation", { required: true, pattern: /[0-9]{4}/ })}/>
            {errors.published_year?.type === "pattern" && <span>出版年の形式が正しくありません。半角数字4桁で入力して下さい。</span>}
            <label>版数</label>
            <input type="text" name="version" {...register("version", { maxLength: 2 })} />版
            {errors.version?.type === "maxLength" && <span>2桁以内で入力して下さい。</span>}
          </div>
          <div>
            <label>本の詳細</label>
            <textarea name="description" {...register("description", { required: true })}/>
          </div>
          <div>
            <label>場所</label>
            <select name="location_id" {...register("location_id", { required: true })}/>
          </div>
          <input value="アカウント作成" type="submit" />
        </form>
      </>
    );
};
