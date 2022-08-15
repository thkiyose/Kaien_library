import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Color from '../parts/Color';
import ReactPaginate from 'react-paginate';
import { Modal } from '../parts/Modal';
import { ToggleDetail } from '../parts/ToggleDetail';
import { fetchReviewsAdmin } from '../../lib/api/admin';

export const AdminReviewsIndex = () => {
  const [ reviews, setReviews ] = useState([]);
  const [ perPage ] = useState(15);
  const [ start, setStart ] = useState(0);
  const [ showModal, setShowModal ] = useState(false);
  const [ targetId, setTargetId ] = useState(0);
  const [ pageCount, setPageCount] = useState(0);
  const [ showDetail, setShowDetail] = useState(false);
  const [ searchParam, setSearchParam ] = useState({
  });

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
  }

  const handleFetchReviews = useCallback(async() => {
    const res = await fetchReviewsAdmin();
    console.log(res)
    setReviews(res.data.reviews);
    setPageCount(Math.ceil(res.data.reviews.length/perPage));
  },[perPage])
  useEffect(() => { handleFetchReviews() }, [handleFetchReviews]);

  const handleShowModal = (targetId) => {
    setShowModal(true);
    setTargetId(targetId);
  };

  const handleShowDetail = (e) => {
  }

  const onChange = (param,type) => {
  }

  const handleSearch = async(params) => {
    const res =[];
    setPageCount(Math.ceil(res.data.reservations.length/perPage))
    setStart(0);
  };

  const handleResetSearch = () => {
    setSearchParam({userId: "",title:"",userName: "",userEmail: "",startDate:["",""],expiryDate:["",""],showExpired:searchParam.showExpired})
    handleSearch({userId: "",title:"",userName: "",userEmail: "",startDate:["",""],expiryDate:["",""],showExpired:searchParam.showExpired});
  };


  return(
    <>
      <Title>レビューデータ一覧</Title>
      <ReservationSearch>
      </ReservationSearch>
      <Table>
        <tbody>
          <Row>
            <th>ID</th><th>レビュー対象タイトル</th><th></th><th>ﾕｰｻﾞｰid</th><th></th>
          </Row>
          {reviews.slice(start, start + perPage).map((review,index) => {
            return (
              <React.Fragment key={index}>
                <ToggleDetail review={review} handleShowModal={handleShowModal}/>
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
      <MyPaginate
        onPageChange={handlePageChange}
        pageCount={pageCount}
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
      <Modal showFlag={showModal} setShowModal={setShowModal} message={"予約データを削除してよろしいですか？"}/>
    </>
  );
};

const Title = styled.h1`
  margin: 0 auto;
  font-size: 1.3rem;
  display: inline;
`

const ReservationSearch = styled.div`
  font-size: 0.8rem;
  p {
    margin: 0;
  }
  input {
    outline: 0;
    background: white;
    border: 0;
    margin: 0 0 10px;
    padding: 5px;
    font-size: 0.8rem;
    margin-right: 5px;
  }
  button {
    outline: 0;
    font-size: 0.8rem;
    border: 0;
    padding: 5px 5px;
    color: #FFFFFF;
    cursor: pointer;
  }
  .searchButton {
    background-color: ${Color.primary};
    padding: 5px 10px;
  }
  .resetButton {
    background-color: ${Color.dark};
    float:right;
  }
  .userId {
    width: 25px;
  }
  .userName {
    width: 70px;
  }
`

const Table = styled.table`
  border: none;
  border-collapse: collapse;
  width: 100%;
  .hidden {
    display: none;
  }
  .show {
    display: block;
  }
`
const Row = styled.tr`
  th {
    font-weight: normal;
    background-color: ${Color.primary};
    color: white;
    font-size: 0.9rem;
    text-align: center;
  }
`
const DetailRow = styled.tr`
`

const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  margin: 0;
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
const DeleteButton = styled.button`
  outline: 0;
  background: ${Color.primary};
  font-size: 0.8rem;
  border: 0;
  padding: 5px 5px;
  color: #FFFFFF;
  cursor: pointer;
  margin-left: 10px;
`
