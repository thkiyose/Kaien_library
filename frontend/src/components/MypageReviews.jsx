import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';
import { fetchUserReviews } from '../lib/api/review';
import { ReviewDisplay } from './parts/ReviewDisplay';

export const MyPageReviews = () => {
  const { currentUser } = useContext(Context);
  const [ reviews, setReviews ] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetchUserReviews(currentUser.id)
      setReviews(res.data.reviews);
    };
    fetchReviews();
  }, [currentUser]);

  return (
    <>
    {reviews.length > 0 ? reviews.map((review,key)=>{ return(
      <React.Fragment key={key}>
        <ReviewDisplay
          userId={currentUser.id}
          userName={currentUser.name}
          rating={review.rating}
          comment={review.comment}
          createdAt={review.createdAt}
          title={review.title}
          bookId={review.bookId}
          reviewId={review.id}
          isEdit={true}
          />
      </React.Fragment>
    );
  }) : <p>まだレビューがありません。</p>}
  </>
  );
}
