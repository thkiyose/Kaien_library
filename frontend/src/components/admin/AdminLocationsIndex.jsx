import React, { useEffect, useState, useCallback } from 'react';
import styled from "styled-components";
import Color from '../parts/Color';
import { Modal } from '../parts/Modal';
import ReactPaginate from 'react-paginate';
import { fetchLocationsForAdmin } from '../../lib/api/admin';
import { createLocation } from '../../lib/api/admin';
import { deleteLocation } from '../../lib/api/admin';
import { searchLocations } from '../../lib/api/admin';

export const AdminLocationsIndex = () => {
  const [ locations, setLocations ] = useState([]);
  const [ perPage ] = useState(15);
  const [ params, setParams ] = useState("");
  const [ start, setStart ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ showModal, setShowModal ] = useState(false);
  const [ targetId, setTargetId ] = useState(0);
  const [ pageCount, setPageCount] = useState(Math.ceil(locations.length/perPage));
  const [ searchParam, setSearchParam ] = useState({id:"",location:""});

  const handleFetchLocations = useCallback(async() => {
    const res = await fetchLocationsForAdmin();
    setLocations(res.data.locations);
    setPageCount(Math.ceil(res.data.locations.length/perPage));
  },[perPage])
  useEffect(() => { handleFetchLocations() }, [handleFetchLocations]);

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
    setCurrentPage(e.selected)
  }

  const handleShowModal = (targetId) => {
    setShowModal(true);
    setTargetId(targetId);
  };

  const onChange = (e) => {
    setParams(e.target.value)
  }

  const searchOnChange = (param,type) => {
    if (type === "id"){
      setSearchParam({...searchParam,id:param})
    } else if (type === "location") {
      setSearchParam({...searchParam,location:param})
    }
  }

  const handleCreateLocation = async() => {
    const res = await createLocation({location: params});
    if (res.data.status === "SUCCESS") {
      setParams("");
      handleFetchLocations();
    }
  };

  const handleDeleteLocation = async(locationId) => {
    await deleteLocation(locationId);
    handleFetchLocations();
  };

  const handleSearch = async(searchParam) => {
    const res = await searchLocations(searchParam);
    setLocations(res.data.locations)
    setPageCount(Math.ceil(res.data.locations.length/perPage))
    setStart(0);
    setCurrentPage(0);
  };

  const handleResetSearch = () => {
    setSearchParam({id: "", location: ""})
    handleSearch({id: "", location: ""});
    setStart(0);
    setCurrentPage(0);
  };

  return (
    <>
      <Title>カテゴリデータ一覧</Title>
      <Search>
        ID<input type="text" value={searchParam.id} className="id" onChange={(e)=>{searchOnChange(e.target.value,"id")}}/>
        カテゴリ名<input type="text" value={searchParam.location} className="location" onChange={(e)=>{searchOnChange(e.target.value,"location")}}/>
        <button className="searchButton" onClick={()=>{handleSearch(searchParam)}}>検索</button><button className="resetButton" onClick={()=>{handleResetSearch()}} >リセット</button>
      </Search>
      <Table>
        <tbody>
          <Row>
            <th>ID</th><th>カテゴリ名</th><th>ステータス</th><th></th>
          </Row>
          {locations.slice(start, start + perPage).map((location,index) => {
            return (
              <Row key={index}>
                <td className="id">{location.id}</td><td>{location.location}</td><td className="status">{location.used ? "使用中" : "未使用"}</td><td className="control">{!location.used && <DeleteButton onClick={() => {handleShowModal(location.id)}}>削除</DeleteButton>}</td>
              </Row>
            );
          })}
        </tbody>
      </Table>
      <CreateForm>
        <p>カテゴリを新しく追加する:
          カテゴリ名<input  value={params} onChange={(e)=>{onChange(e)}}/>
          <button onClick={()=>{handleCreateLocation()}}>新規作成</button>
        </p>
      </CreateForm>
      <MyPaginate
        forcePage={currentPage}
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
      <Modal showFlag={showModal} setShowModal={setShowModal} yesAction={()=>handleDeleteLocation(targetId)} message={"カテゴリを削除してよろしいですか？"}/>
    </>
  );
}

const Search = styled.div`
  font-size: 0.9rem;
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
  .id {
    width: 50px;
  }
  .location {
    width: 450px;
  }
`
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
    padding: 3px 0px;
  }
  .id {
    width: 5%;
    text-align: center;
  }
  .status {
    width: 10%;
    text-align:center;
  }
  .control {
    width: 7%;
    text-align: center;
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
  padding: 3px 5px;
  color: #FFFFFF;
  cursor: pointer;
  margin-left: 10px;
`
const CreateForm = styled.div`
  p {
    font-size: 0.9rem;
    text-align: center;
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
    background: ${Color.primary};
    font-size: 0.8rem;
    border: 0;
    padding: 3px 5px;
    color: #FFFFFF;
    cursor: pointer;
    margin-left: 10px;
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
