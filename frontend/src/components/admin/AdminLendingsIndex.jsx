import React, { useEffect, useState, useContext, useRef } from 'react';
import { Context } from '../../App';
import { useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";
import Color from '../parts/Color';
import ReactPaginate from 'react-paginate';
import { Modal } from '../parts/Modal';
import { fetchLendingsAdmin } from '../../lib/api/admin';
import { deleteLending } from '../../lib/api/admin';
import { searchLendings } from '../../lib/api/admin';
import { returnLending } from '../../lib/api/admin';

export const AdminLendingsIndex = () => {
  const [ lendings, setLendings ] = useState([]);
  const navigate = useNavigate();
  const [ error, setError ] = useState("");
  const [ perPage ] = useState(15);
  const [ start, setStart ] = useState(0);
  const { currentUser, setCurrentUser } = useContext(Context);
  const [ showModal, setShowModal ] = useState(false);
  const [ showModalReturn, setShowModalReturn ] = useState(false);
  const [ targetId, setTargetId ] = useState(0);
  const [ currentPage, setCurrentPage] = useState(0);
  const [ pageCount, setPageCount] = useState(0);
  const [ searchParam, setSearchParam ] = useState({
    userId: "",
    title:"",
    userName: "",
    userEmail: "",
    startDate:["",""],
    finishedAt:["",""],
    showFinished:""
  });
  const idRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const adminRef = useRef();

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
  }

  const handleReturnLending = async(lendingId) => {
    const res = await returnLending(lendingId)
    if (res.data.error) {
      setError(res.data.error);
    }
    if (res.data.status === "SUCCESS") {
      setError("");
      handleFetchLendings(searchParam);
    }
  }

  const handleFetchLendings= async() => {
    const res = await fetchLendingsAdmin();
    setLendings(res.data.lendings);
    setPageCount(Math.ceil(res.data.lendings.length/perPage));
  }
  useEffect(() => { handleFetchLendings() }, []);

  const handleDeleteLending = async(lendingId) => {
    await deleteLending(lendingId);
    handleFetchLendings(searchParam);
  };

  const handleShowModal = (targetId) => {
    setShowModal(true);
    setTargetId(targetId);
  };

  const handleShowModalReturn = (targetId) => {
    setShowModalReturn(true);
    setTargetId(targetId);
  };

  const onChange = (param,type) => {
    if (type === "id"){
      setSearchParam({...searchParam,id:param})
    } else if (type === "title") {
      setSearchParam({...searchParam,title:param})
    } else if (type === "userName") {
      setSearchParam({...searchParam,userName:param})
    } else if (type === "userEmail") {
      setSearchParam({...searchParam,userEmail:param})
    } else if (type === "userId") {
      setSearchParam({...searchParam,userId:param})
    } else if (type === "startDateStart") {
      setSearchParam({...searchParam,startDate:[param, searchParam.startDate[1]]})
    } else if (type === "startDateEnd") {
      setSearchParam({...searchParam,startDate:[searchParam.startDate[0],param]})
    } else if (type === "finishedAtStart") {
      setSearchParam({...searchParam,finishedAt:[param, searchParam.finishedAt[1]]})
    } else if (type === "finishedAtEnd") {
      setSearchParam({...searchParam,finishedAt:[searchParam.finishedAt[0],param]})
    }
  }

  const handleSearch = async(params) => {
    const res = await searchLendings(params);
    setLendings(res.data.lendings);
    setPageCount(Math.ceil(res.data.lendings.length/perPage))
    setStart(0);
  };

  const handleShowFinished = () => {
    if (searchParam.showFinished) {
      setSearchParam({...searchParam,showFinished: false})
      handleSearch({...searchParam,showFinished: false})
    } else if (!searchParam.showFinished) {
      setSearchParam({...searchParam,showFinished: true})
      handleSearch({...searchParam,showFinished: true})
    }
  }

  return(
    <>
      <Title>貸出データ一覧</Title><ShowFinished>返却済み項目も表示する<input type="checkbox" value="true" onClick={()=>{handleShowFinished()}} /></ShowFinished>
      <LendingSearch>
        <p>
          書籍タイトル<input type="text" className="title" onChange={(e)=>{onChange(e.target.value,"title")}}/>
          ユーザーID<input type="text" className="userId" onChange={(e)=>{onChange(e.target.value,"userId")}}/>
          ユーザー名<input type="text" className="userName" onChange={(e)=>{onChange(e.target.value,"userName")}}/>
          ユーザーemail<input type="text" className="userEmail" onChange={(e)=>{onChange(e.target.value,"userEmail")}}/>
        </p>
        <p>
          貸出開始日<input type="date" className="date" onChange={(e)=>{onChange(e.target.value,"startDateStart")}}/>〜<input type="date" className="date" onChange={(e)=>{onChange(e.target.value,"startDateEnd")}}/>
          返却日<input type="date" className="date" onChange={(e)=>{onChange(e.target.value,"finishedAtStart")}}/>〜<input type="date" className="date" onChange={(e)=>{onChange(e.target.value,"finishedAtEnd")}}/>
          <button onClick={()=>{handleSearch(searchParam)}}>検索</button>
        </p>
      </LendingSearch>
      {error && <Error>{error}</Error>}
      <Table>
        <tbody>
          <Row>
            <th>ID</th><th>貸出書籍</th><th>ﾕｰｻﾞｰid</th><th>貸出開始日</th><th>返却日</th><th></th>
          </Row>
          {lendings.slice(start, start + perPage).map((lending,index) => {
            return (
              <Row key={index}>
                <td className="id">{lending.id}</td><td className="title"><Link to={`/books/${lending.bookId}`}>{lending.title}</Link></td><td className="userName">{lending.userId ? lending.userId : "退会済"}</td><td className="startDate">{lending.startDate}</td><td className="finishedAt">{lending.finishedAt ? lending.finishedAt : <><span>未返却</span><button onClick={()=>{handleShowModalReturn(lending.id)}}>変更</button></>}</td><td className="control"><DeleteButton onClick={() => {handleShowModal(lending.id)}}>削除</DeleteButton></td>
              </Row>
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
      <Modal showFlag={showModal} setShowModal={setShowModal} yesAction={()=>handleDeleteLending(targetId)} message={"貸出データを削除してよろしいですか？（未返却の場合、本は返却扱いになります。）"}/>
      <Modal showFlag={showModalReturn} setShowModal={setShowModalReturn} yesAction={()=>handleReturnLending(targetId)} message={"この貸出データを返却済みにしますか？"}/>
    </>
  );
};

const Title = styled.h1`
  margin: 0 auto;
  font-size: 1.3rem;
  display: inline;
`
const ShowFinished = styled.span`
  font-size: 0.9rem;
  margin-left: 20px;
  input[type="checkbox"] {

  }
`
const LendingSearch = styled.div`
  font-size: 0.9rem;
  p {
    margin: 0;
  }
  .userId {
    width: 25px;
  }
`

const Table = styled.table`
  border: none;
  border-collapse: collapse;
  width: 100%;
`
const Row = styled.tr`
  th {
    font-weight: normal;
    background-color: ${Color.primary};
    color: white;
    font-size: 0.9rem;
    text-align: center;
  }
  td {
    font-size: 0.9rem;
    border: none;
  }
  .title {
    width:60%;
  }
  .startDate {
    width: 11%;
    text-align: center;
  }
  .finishedAt {
    width: 11%;
    text-align: center;
    span {
      font-size: 0.8rem;
    }
    button {
      outline: 0;
      background: rgb(0,0,0,0);
      font-size: 0.8rem;
      border: 0;
      padding: 5px 5px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .control {
    width: 6%;
  }
  .id {
    width: 5%;
    text-align: center;
  }
  .userName {
    width:6%;
    text-align: center;
  }
  :nth-child(odd) {
    background-color: #c2dbcf;
  }
  p {
    margin: 0;
    padding-left: 12px;
    color: rgb(85, 85, 85);
  }
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

const Error = styled.p`
  margin:0;
  background-color: ${Color.warning};
  text-align: center;
`
