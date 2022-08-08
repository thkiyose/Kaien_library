import React, { useEffect, useState, useContext, useRef } from 'react';
import { Context } from '../../App';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Color from '../parts/Color';
import ReactPaginate from 'react-paginate';
import { Modal } from '../parts/Modal';
import { fetchUsersAdmin } from '../../lib/api/admin';
import { deleteUser } from '../../lib/api/admin';
import { adminChangeUser } from '../../lib/api/admin';
import { searchUsers } from '../../lib/api/admin';

export const AdminUserIndex = () => {
  const [ users, setUsers ] = useState([]);
  const navigate = useNavigate();
  const [ error, setError ] = useState("");
  const [ perPage ] = useState(15);
  const [ start, setStart ] = useState(0);
  const { currentUser, setCurrentUser } = useContext(Context);
  const [ showModal, setShowModal ] = useState(false);
  const [ showModalAdmin, setShowModalAdmin ] = useState(false);
  const [ targetId, setTargetId ] = useState(0);
  const [ targetAdmin, setTargetAdmin ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ searchParam, setSearchParam ] = useState({
    id: "",
    name:"",
    email:"",
    admin:""
  });

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
    setCurrentPage(e.selected)
  }

  const handleFetchUsers= async() => {
    const res = await fetchUsersAdmin();
    setUsers(res.data.users);
  }
  useEffect(() => { handleFetchUsers() }, []);

  const handleDeleteUser = async(userId) => {
    await deleteUser(userId);
    handleFetchUsers();
  };

  const handleChangeAdmin = async(userId) => {
    const res = await adminChangeUser(userId)
    if (res.data.error) {
      setError(res.data.error);
    }
    if (res.data.status === "SUCCESS") {
      setError("");
      handleFetchUsers();
    }
    if (currentUser.id === userId && res.data.adminToNormal ){
      setCurrentUser(res.data.user);
      navigate("/");
    }
  }

  const handleShowModal = (targetId) => {
    setShowModal(true);
    setTargetId(targetId);
  };

  const handleShowModalAdmin = (targetId,targetAdmin) => {
    setShowModalAdmin(true);
    setTargetId(targetId);
    setTargetAdmin(targetAdmin);
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
  const canDelete = (isLending, userId) => {
    if (isLending === true) {
      return <p>貸出有</p>
    } else {
      return <DeleteButton onClick={() => handleShowModal(userId)}>削除</DeleteButton>
    }
  };
  return(
    <>
      <Title>ユーザーデータ一覧</Title>
      <UserSearch>
        ID<input type="text" name="id" className="id" onChange={(e)=>{onChange(e.target.value,"id")}}></input>名前<input type="text" onChange={(e)=>{onChange(e.target.value,"name")}}></input>email<input type="text" onChange={(e)=>{onChange(e.target.value,"email")}}></input>
        権限<select onChange={(e)=>{onChange(e.target.value,"admin")}}>
              <option hidden></option>
              <option value="false">一般</option>
              <option value="true">管理者</option>
            </select>
        <button className="searchButton">検索</button><button className="resetButton">リセット</button>
      </UserSearch>
      {error && <Error>{error}</Error>}
      <Table>
        <tbody>
          <Row>
            <th>ID</th><th>名前</th><th>email</th><th colSpan="2">権限</th><th></th>
          </Row>
          {users.slice(start, start + perPage).map((user,index) => {
            return (
              <Row key={index}>
                <td className="id">{user.id}</td><td className="name">{user.name}</td><td className="email">{user.email}</td>{user.admin ? <td className="admin">管理者</td> : <td className="normal">一般</td>}<td className="change_button"><button onClick={()=>{handleShowModalAdmin(user.id,user.admin)}}>変更</button></td><td className="control">{canDelete(user.isLending, user.id)}</td>
              </Row>
            );
          })}
        </tbody>
      </Table>
      <MyPaginate
        forcePage={currentPage}
        onPageChange={handlePageChange}
        pageCount={Math.ceil(users.length / perPage)}
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
      <Modal showFlag={showModal} setShowModal={setShowModal} yesAction={()=>handleDeleteUser(targetId)} message={"ユーザーを削除してよろしいですか？"}/>
      <Modal showFlag={showModalAdmin} setShowModal={setShowModalAdmin} yesAction={()=>handleChangeAdmin(targetId)} message={"ユーザーの権限を変更しますか？"} adminGuide={true} targetId={targetId} targetAdmin={targetAdmin} />
    </>
  );
};

const Title = styled.h1`
  margin: 0 auto;
  font-size: 1.3rem;
`
const UserSearch = styled.div`
  input {
    outline: 0;
    background: white;
    border: 0;
    margin: 0 0 10px;
    padding: 5px;
    font-size: 0.8rem;
    margin-right: 5px;
  }
  select {
    outline: 0;
    background: white;
    border: 0;
    margin: 0 0 10px;
    padding: 5px;
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
  .id {
    width: 50px;
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
    text-align: center;
  }
  td {
    font-size: 0.9rem;
    border: none;
  }
  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .email {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .control {
    width: 10%;
    text-align: center;
  }
  .id {
    text-align: center;
  }
  .admin {
    text-align: center;
    width: 7%;
    background-color: ${Color.dark};
    color: white;
    font-size: 0.8rem;
  }
  .normal {
    text-align: center;
    width: 7%;
    background-color: ${Color.text};
    font-size: 0.8rem;
  }
  .change_button {
    width: 7%;
    button {
      outline: 0;
      background: ${Color.primary};
      font-size: 0.8rem;
      border: 0;
      padding: 5px 5px;
      color: #FFFFFF;
      cursor: pointer;
    }
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
