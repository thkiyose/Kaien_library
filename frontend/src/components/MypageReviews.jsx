import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../App';
import styled from "styled-components";
import Color from './parts/Color';
import { fetchUserReviews } from '../lib/api/review';
import { deleteReview } from '../lib/api/review';
import { ReviewDisplay } from './parts/ReviewDisplay';
import ReactPaginate from 'react-paginate';

export const MyPageReviews = () => {
  const { currentUser } = useContext(Context);
  const [ reviews, setReviews ] = useState([]);
  const [ perPage ] = useState(4);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ start, setStart ] = useState(0);

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

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
    setCurrentPage(e.selected)
  };

  return (
    <>
    {reviews.length > 0 ? reviews.slice(start, start + perPage).map((review,key)=>{ return(
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
  }) : <NoReview>まだレビューがありません。</NoReview>}
  <MyPaginate
    forcePage={currentPage}
    onPageChange={handlePageChange}
    pageCount={Math.ceil(reviews.length / perPage)}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    containerClassName='pagination'
    pageClassName='page-item'
    pageLinkClassName='page-link'
    activeClassName='active'
    previousLabel='<'
    nextLabel='>'
    previousClassName='page-item'
    nextClassName='page-item'
    previousLinkClassName='page-link'
    nextLinkClassName='page-link'
    disabledClassName='disabled'
    breakLabel='...'
    breakClassName='page-item'
    breakLinkClassName='page-link'
  />
  </>
  );
}

const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  margin: 0;
  margin-left: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;

  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: ${Color.primary};
    color: white;
    border-color: transparent;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`
const NoReview = styled.div`
  background-color: ${Color.text};
  margin-top: 20px;
  margin-left: 70px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
`
