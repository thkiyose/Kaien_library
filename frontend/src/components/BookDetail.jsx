import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../App';
import ReactPaginate from 'react-paginate';
import styled from "styled-components";
import { Wrapper } from './parts/Wrapper';
import { ReviewForm } from './parts/ReviewForm';
import { ReviewDisplay } from './parts/ReviewDisplay';
import { WatchButton } from './parts/WatchButton';
import Color from './parts/Color';
import { useParams } from 'react-router-dom';
import { showBook } from '../lib/api/book';
import { showReviews } from '../lib/api/review';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../lib/styles/tab.css';

const Top = styled.div`
  font-size: 0.9rem;
`

const BackButton = styled.button`
  outline: 0;
  background: ${Color.primary};
  font-size: 0.8rem;
  border: 0;
  padding: 5px 15px;
  color: #FFFFFF;
  cursor: pointer;
`

const ImageDiv = styled.div`
  float: left;
  margin: 10px 60px;
`
const Image = styled.img`
  border: solid 2px gray;
  width: 130px;
`
const InfoDiv = styled.div`
  margin: 10px 20px;
  text-align :center;
  h1 {
    text-align: center;
    font-size: 1.5rem;
  }
  span {
    margin: 0px 20px;
  }
`
const InfoDivBottom = styled.div`
  margin-top: 30px;
`

const Rent = styled.button`
  padding: 30px;
  float: left;
  width: 30%;
  margin: 0px 20px ;
  background-color: ${Color.primary};
  color : white;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  border-bottom:4px solid rgba(0,0,0,0.2);
  :hover {
    background-color: #0c797a;
  }
  :active {
	-webkit-transform: translate(0,2px);
	-moz-transform: translate(0,4px);
	transform: translate(0,4px);
	border-bottom:none;
  margin-bottom:4px;
	}
`

const ReservationToLending = styled(Rent)`
  padding: 4px;
  .up {
    font-size: 0.8rem;
  }
  .bottom {
    font-size: 1.1rem;
    padding: 0;
  }
`

const Reservation = styled(Rent)`
  padding: 5px;
  margin-top: 5px;
  .up {
    font-size: 0.9rem;
    margin: 0;
  }
  .bottom {
    font-size: 1.3rem;
    margin : 0;
  }
  background-color : ${Color.light};
  opacity: 0.9;
  :hover {
    opacity: 1;
    background-color: ${Color.primary};
  }
`

const Description = styled.div`
  margin: 20px auto;
  background-color:${Color.text};
  padding: 20px;
  font-size: 0.9rem;
`

const ClearFix = styled.div`
  content: "";
  display: block;
  clear: both;
`
const EmptyGuide = styled.div`
  margin: 20px auto;
  background-color:${Color.text};
  padding: 20px;
  text-align: center;
`
const YouLent = styled.p`
  background-color:${Color.light};
  padding: 30px 10px;
  color: white;
  text-align: center;
  float: left;
  width: 30%;
  margin: 0px 20px ;
`

const Deleted = styled.p`
  background-color:${Color.dark};
  padding: 30px 10px;
  color: white;
  text-align: center;
  float: left;
  width: 30%;
  margin: 0px 20px ;
`

const YouReserved = styled.div`
  ${(props) => `background-color: ${props.backgroundColor}`};
  color: white;
  text-align: center;
  float: left;
  width: 30%;
  margin: 0px 20px ;
  .up {
    font-size: 1.2rem;
  }
  .down {
    font-size: 0.7rem;
  }
`

const InsideTabPanel = styled.div`
  padding: 10px 30px;
      justify-content: right;
  table {
    margin: 0 auto;
    border-collapse: collapse;
  }
  td {
    padding: 0px 10px;
  }
  .start_date {
    padding-left: 150px;
  }
  .on_going {
    background-color: rgb(0, 193, 2);
    color: white;
    font-size: 0.8rem;
    border-radius: 10px;
    text-align:center;
  }
`
const NoReview = styled.p`
  text-align: center;
`
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

export const BookDetail = () => {
  const [ book, setBook ] = useState({});
  const [ reviews, setReviews ] = useState([]);
  const { currentUser } = useContext(Context);
  const [ lendings, setLendings ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ currentUserLending, setCurrentUserLending ] = useState(false);
  const [ otherUserReserved, setOtherUserReserved ] = useState(false);
  const [ currentUserReserved, setCurrentUserReserved ] = useState(false);
  const [ onGoingOtherUserReservation, setOnGoingOtherUserReservation ] = useState(false);
  const [ onGoingCurrentUserReservation, setOnGoingCurrentUserReservation ] = useState(false);
  const [ isEmpty, setIsEmpty ] = useState(true);
  const [ category, setCategory ] = useState({});
  const navigate = useNavigate();
  const bookId = useParams();

  const handleShowDatas = async(bookId,currentUserId) => {
    try {
      const bookRes = await showBook(bookId,currentUserId);
      setBook(bookRes.data.book);
      setLendings(bookRes.data.lendings);
      setCategory(bookRes.data.category);
      setIsEmpty(false);
      setOtherUserReserved(bookRes.data.otherUserReserved.isReserved);
      setCurrentUserLending(bookRes.data.currentUserLending);
      setCurrentUserReserved(bookRes.data.currentUserReserved.isReserved);
      setOnGoingOtherUserReservation(bookRes.data.otherUserReserved.onGoing);
      setOnGoingCurrentUserReservation(bookRes.data.currentUserReserved.onGoing);
      setIsLoading(false);
      const reviewRes = await showReviews(bookId);
      setReviews(reviewRes.data.reviews);
    } catch(e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
   handleShowDatas(bookId.id, currentUser.id);
 }, [bookId, currentUser]);

  if (!isLoading && !isEmpty) {
    return(
      <>
        <Wrapper width={"800px"}>
          <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
          <p>カテゴリー>{category.category}</p>
          <Top>
            <ImageDiv>
              {book.imageUrl ? <Image src={`http://localhost:3000/${book.id}.jpg`} /> : <Image src={`${process.env.PUBLIC_URL}/noimage.png`} />}
              <WatchButton bookId={book.id}/>
            </ImageDiv>
            <InfoDiv>
              <h1>{book.title}</h1>
              <p><span>著者名: {book.author}</span><span>出版年: {book.publishedYear}</span></p>
              <InfoDivBottom>
              <Button book={book} currentUser={currentUser} currentUserLending={currentUserLending} currentUserReserved={currentUserReserved} otherUserReserved={otherUserReserved} onGoingOtherUserReservation={onGoingOtherUserReservation} onGoingCurrentUserReservation={onGoingCurrentUserReservation} />
                <p><span>ステータス:{book.isLent === true ?  "貸出中" : "貸出可能"　}</span></p>
              </InfoDivBottom>
            </InfoDiv>
            <ClearFix />
            <Description>{book.description}</Description>
          </Top>
          <InfoTab lendings={lendings} bookId={book.id} reviews={reviews} setReviews={setReviews} />
        </Wrapper>
      </>
    );
  } else if (!isLoading && isEmpty ) {
    return(
      <Wrapper width={"800px"}>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        <EmptyGuide>書籍が見つかりませんでした。</EmptyGuide>
      </Wrapper >
    );
  };
};

const Button = (props) => {
  const navigate = useNavigate();
  const {book, currentUser, currentUserLending, otherUserReserved, currentUserReserved, onGoingOtherUserReservation,onGoingCurrentUserReservation} = props;

  // 貸出無し・予約無し=レンタル可能
  if (book.deleted === true ){
    return <Deleted>貸出を終了しました。</Deleted>
  }
  if (!book.isLent && otherUserReserved === false && currentUserReserved === false) {
    return <Rent onClick={() => {navigate("lending", { state:{ bookId: book.id } })}}>この本を借りる</Rent>
  // ログインユーザーに貸出中・予約無し=返却可能
  } else if (book.isLent && currentUserLending === true && otherUserReserved === false ) {
    return <YouLent>この本をレンタル中です。</YouLent>
  // 他ユーザーに貸出中・予約無し=予約可能
  } else if (book.isLent && currentUserLending === false && otherUserReserved === false && currentUserReserved === false) {
    return <Reservation onClick={() => {navigate("reservation", { state:{ bookId: book.id } })}}><p className="up">この本は貸出中です。</p><p className="bottom">予約する</p></Reservation>
  // 貸出無し・ログインユーザーが予約中・予約期間内である=レンタル可能
  } else if (!book.isLent && currentUserReserved === true && onGoingCurrentUserReservation === true) {
      return <ReservationToLending onClick={()=>{navigate(`/reservationlending/${book.id}`, { state:{ bookId: book.id, userId: currentUser.id } })}}><p className="up">予約中:レンタルが可能になりました。</p><p className="bottom">レンタルに進む</p></ReservationToLending>
    // 貸出無し・ログインユーザーが予約中・予約期間外である=期間になるまで待機
  } else if (!book.isLent && currentUserReserved === true && onGoingCurrentUserReservation === false) {
      return <YouReserved backgroundColor={Color.dark}><p className="up">この本は予約中です。</p><p className="down">レンタルが可能になるまでお待ち下さい。</p></YouReserved>
    // 貸出無し・他ユーザーが予約中・予約期間内である=予約可能
  } else if (!book.isLent && currentUserReserved === false && otherUserReserved === true && onGoingOtherUserReservation === true ) 　{
      return <Reservation onClick={() => {navigate("reservation", { state:{ bookId: book.id } })}}><p className="up">本日、他ユーザーに予約されています。</p><p className="bottom">別の日で予約する</p></Reservation>
  // 貸出無し・他ユーザーが予約中・予約期間外である=レンタル可能
  } else if (!book.isLent && currentUserReserved === false && otherUserReserved === true && onGoingOtherUserReservation === false) {
    return <Rent onClick={() => {navigate("lending", { state:{ bookId: book.id } })}}>この本を借りる</Rent>
  // 貸出有り・予約有り・両方ログインユーザーによるケースは発生しない
  // ログインユーザーへ貸出有り・他ユーザーの予約有り=返却可能
  } else if (book.isLent && currentUserLending === true && otherUserReserved === true) {
      return <YouLent>この本をレンタル中です。</YouLent>
  //  他ユーザーへ貸出有り・ログインユーザーの予約有り・予約期間内=返却されるまで待機
} else if (book.isLent && currentUserLending === false && currentUserReserved === true && onGoingCurrentUserReservation === true) {
      return <YouReserved backgroundColor={Color.dark}><p>予約中です。他ユーザーによる貸出が未返却です。</p><p className="down">レンタルが可能になるまでお待ち下さい。</p></YouReserved>
  // 他ユーザーへ貸出有り・ログインユーザーの予約有り・予約期間外=期間になるまで待機
  } else if (book.isLent && currentUserLending === false && currentUserReserved === true && onGoingCurrentUserReservation === false) {
    return <YouReserved backgroundColor={Color.dark}><p className="up">この本は予約中です。</p><p className="down">レンタルが可能になるまでお待ち下さい。</p></YouReserved>
  // 他ユーザーへ貸出有り・他ユーザーの予約有り・予約期間内=予約可能
  } else if (book.isLent && currentUserLending === false && otherUserReserved === true && onGoingOtherUserReservation === true) {
    return <Reservation onClick={() => {navigate("reservation", { state:{ bookId: book.id } })}}><p className="up">この本は貸出中です。</p><p className="bottom">予約する</p></Reservation>
  // 他ユーザーへ貸出有り・他ユーザーの予約有り・予約期間外=予約可能
  } else if (book.isLent && currentUserLending === false && otherUserReserved === true && onGoingOtherUserReservation === false) {
    return <Reservation onClick={() => {navigate("reservation", { state:{ bookId: book.id } })}}><p className="up">この本は貸出中です。</p><p className="bottom">予約する</p></Reservation>
  }
}

const InfoTab = (props) => {
  const { lendings, reviews, bookId, setReviews } = props;
  const [ perPage ] = useState(8);
  const [ start, setStart ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ showFormFlag, setShowFormFlag ] = useState(false);

  const handlePageChange = (e) => {
    setStart(e.selected * perPage);
    setCurrentPage(e.selected)
  };

  const handleShowForm = () => {
    setShowFormFlag(true);
  }

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>レビュー</Tab>
          <Tab>貸出履歴</Tab>
        </TabList>
        <TabPanel>
          <InsideTabPanel>
            {!showFormFlag && <button onClick={()=>{handleShowForm()}}>レビューを書きませんか？</button> }
            <ReviewForm bookId={bookId} setReviews={setReviews} showFlag={showFormFlag} setShowFlag={setShowFormFlag} />
            {reviews.length > 0 ? reviews.slice(start, start + perPage).map((review,key)=>{ return(
              <ReviewDisplay key={key} userName={review.name} rating={review.rating} comment={review.comment} createdAt={review.createdAt}/>
            );
          }) : <NoReview>まだレビューがありません。</NoReview>}
          </InsideTabPanel>
        </TabPanel>
        <TabPanel>
          <InsideTabPanel>
            <table>
              <tbody>
                {lendings.length > 0 ? lendings.slice(start, start + perPage).map((lending,key)=>{ return(
                  <React.Fragment key={key}>
                  {lending.finishedAt === null ?
                    <tr>
                      <td>{lending.name}</td><td>がレンタルしました:</td><td className="start_date">{lending.startDate}</td><td>-</td><td className="on_going">{lending.finishedAt || "レンタル中"}</td>
                    </tr> :
                    <tr>
                      <td>{lending.name}</td><td>がレンタルしました:</td><td className="start_date">{lending.startDate}</td><td>-</td><td>{lending.finishedAt || "レンタル中"}</td>
                    </tr>}
                  </React.Fragment>
                );
              }) : <tr><td>貸出履歴はありません。</td></tr>}
            </tbody>
          </table>
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
          </InsideTabPanel>
        </TabPanel>
      </Tabs>
    </>
  );
}
