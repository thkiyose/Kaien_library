import React, { useEffect, useState, useContext, useRef } from 'react';
import { Context } from '../../App';
import { useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";
import Color from '../parts/Color';
import ReactPaginate from 'react-paginate';
import { Modal } from '../parts/Modal';
import { fetchLendingsAdmin } from '../../lib/api/admin';

export const AdminLendingsIndex = () => {
  const [ lendings, setLendings ] = useState([]);
  const navigate = useNavigate();
  const [ error, setError ] = useState("");
  const [ perPage ] = useState(15);
  const [ start, setStart ] = useState(0);
  const { currentUser, setCurrentUser } = useContext(Context);
  const [ showModal, setShowModal ] = useState(false);
  const [ targetId, setTargetId ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ searchParam, setSearchParam ] = useState({
    id: "",
    name:"",
    email:"",
    admin:""
  });
  const idRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const adminRef = useRef();

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
    setCurrentPage(e.selected)
  }

  const handleFetchLendings= async() => {
    const res = await fetchLendingsAdmin();
    setLendings(res.data.lendings);
  }
  useEffect(() => { handleFetchLendings() }, []);

  const handleShowModal = (targetId) => {
    setShowModal(true);
    setTargetId(targetId);
  };

  const onChange = (param,type) => {
    if (type === "id"){
      setSearchParam({...searchParam,id:param})
    } else if (type === "name") {
      setSearchParam({...searchParam,name:param})
    } else if (type === "email") {
      setSearchParam({...searchParam,email:param})
    } else if (type === "admin") {
      setSearchParam({...searchParam,admin:param})
    }
  }

  return(
    <>
      <Title>貸出データ一覧</Title>
      {error && <Error>{error}</Error>}
      <Table>
        <tbody>
          <Row>
            <th>ID</th><th>貸出書籍</th><th>貸出開始日</th><th>返却日</th><th></th>
          </Row>
          {lendings.slice(start, start + perPage).map((lending,index) => {
            return (
              <Row key={index}>
                <td className="id">{lending.id}</td><td className="title"><Link to={`/books/${lending.bookId}`}>{lending.title}</Link></td><td className="startDate">{lending.startDate}</td><td className="finishedAt">{lending.finishedAt}</td><td className="deleteButton"><DeleteButton>削除</DeleteButton></td>
              </Row>
            );
          })}
        </tbody>
      </Table>
      <MyPaginate
        forcePage={currentPage}
        onPageChange={handlePageChange}
        pageCount={Math.ceil(lendings.length / perPage)}
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
      <Modal showFlag={showModal} setShowModal={setShowModal} message={"ユーザーを削除してよろしいですか？"}/>
    </>
  );
};

const Title = styled.h1`
  margin: 0 auto;
  font-size: 1.3rem;
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
    text-align: center;
  }
  td {
    font-size: 0.9rem;
    border: none;
  }
  .title {
    width:61%;
  }
  .startDate {
    width: 15%;
    text-align: center;
  }
  .finishedAt {
    width: 15%;
    text-align: center;
  }
  .id {
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
