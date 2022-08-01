import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../App';
import { fetchUserReviews } from '../lib/api/review';
import { deleteReview } from '../lib/api/review';
import { ReviewDisplay } from './parts/ReviewDisplay';

export const MyPageReviews = () => {
  const { currentUser } = useContext(Context);
  const [ reviews, setReviews ] = useState([]);
  const [ showForm, setShowForm] = useState(false);

  const fetchReviews = useCallback(async() => {
    const res = await fetchUserReviews(currentUser.id)
    setReviews(res.data.reviews);
  },[currentUser.id]);

  useEffect(() => {
    fetchReviews();
  }, [currentUser,fetchReviews]);

  const handleDeleteReview = async(reviewId) => {
    try {
      const res = await deleteReview(reviewId);
      if (res?.data.status === "SUCCESS") {
        fetchReviews();
      } else {
        console.log('削除に失敗しました。');
      }
    } catch (e) {
      console.log(e);
    }
  }

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
          handleDeleteReview={handleDeleteReview}
          setReviewsFunc={fetchReviews}
          />
      </React.Fragment>
    );
  }) : <p>まだレビューがありません。</p>}
  </>
  );
}
