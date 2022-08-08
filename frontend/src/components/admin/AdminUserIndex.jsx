import React, { useEffect, useState, useContext, useRef } from 'react';
import { Context } from '../../App';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Color from '../parts/Color';
import ReactPaginate from 'react-paginate';
import { Modal } from '../parts/Modal';
import { fetchUsersAdmin } from '../../lib/api/admin';
import { deleteUser } from '../../lib/api/admin';

export const AdminUserIndex = () => {
  const [ users, setUsers ] = useState([]);
  const [ perPage ] = useState(15);
  const [ start, setStart ] = useState(0);
  const { currentUser } = useContext(Context);
  const [ showModal, setShowModal ] = useState(false);
  const [ showModalAdmin, setShowModalAdmin ] = useState(false);
  const [ targetId, setTargetId ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(0);

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

  const handleShowModal = (targetId) => {
    setShowModal(true);
    setTargetId(targetId);
  };

  const handleShowModalAdmin = (targetId) => {
    setShowModalAdmin(true);
    setTargetId(targetId);
  };

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
      <Table>
        <tbody>
          <Row>
            <th>ID</th><th>名前</th><th>email</th><th colSpan="2">権限</th><th></th>
          </Row>
          {users.slice(start, start + perPage).map((user,index) => {
            return (
              <Row key={index}>
                <td className="id">{user.id}</td><td className="name">{user.name}</td><td className="email">{user.email}</td>{user.admin ? <td className="admin">管理者</td> : <td className="normal">一般</td>}<td className="change_button"><button onClick={()=>{handleShowModalAdmin()}}>変更</button></td><td className="control">{canDelete(user.isLending, user.id)}</td>
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
      <Modal showFlag={showModalAdmin} setShowModal={setShowModalAdmin} yesAction={()=>handleDeleteUser(targetId)} message={"ユーザーの権限を変更しますか？"}/>
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
