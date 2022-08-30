import React, { useState, useContext } from 'react';
import { Context } from '../../App';
import styled from "styled-components";
import Color from '../parts/Color';
import { Modal } from '../parts/Modal';
import ReactPaginate from 'react-paginate';

export const AdminCategoriesIndex = () => {
  const { categories } = useContext(Context);
  const [ perPage ] = useState(15);
  const [ start, setStart ] = useState(0);
  const [ showModal, setShowModal ] = useState(false);
  const [ targetId, setTargetId ] = useState(0);
  const [ pageCount, setPageCount] = useState(Math.ceil(categories.length/perPage));

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
  }

  const handleShowModal = (targetId) => {
    setShowModal(true);
    setTargetId(targetId);
  };


  return (
    <>
      <Title>カテゴリデータ一覧</Title>
      <Table>
        <tbody>
          <Row>
            <th>ID</th><th>カテゴリ名</th><th></th>
          </Row>
          {categories.slice(start, start + perPage).map((category,index) => {
            return (
              <Row key={index}>
                <td className="id">{category.id}</td><td>{category.category}</td><td className="control"><DeleteButton onClick={() => {handleShowModal(category.id)}}>削除</DeleteButton></td>
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
      <Modal showFlag={showModal} setShowModal={setShowModal} message={"カテゴリを削除してよろしいですか？"}/>
    </>
  );
}

const Title = styled.h1`
  margin: 0 auto;
  font-size: 1.3rem;
  display: inline;
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
  .id {
    width: 5%;
    text-align: center;
  }
  .control {
    width: 6%;
  }
  :nth-child(odd) {
    background-color: #c2dbcf;
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
