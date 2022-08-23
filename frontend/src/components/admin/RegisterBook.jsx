import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Color from '../parts/Color';
import { Wrapper } from '../parts/Wrapper';
import { BookForm } from '../parts/BookForm';
import { BookImport } from '../parts/BookImport';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export const RegisterBook = () => {
  const navigate = useNavigate();

  return (
    <>
      <Wrapper width={"800px"}>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        <RegisterTitle>書籍の登録</RegisterTitle>
        <Tabs>
          <TabList>
            <Tab>1件ずつ登録</Tab>
            <Tab>CSVから一括登録</Tab>
          </TabList>
          <TabPanel>
            <InsideTabPanel>
              <BookForm />
            </InsideTabPanel>
          </TabPanel>
          <TabPanel>
            <InsideTabPanel>
              <BookImport/>
            </InsideTabPanel>
          </TabPanel>
        </Tabs>
      </Wrapper>
    </>
  );
};

const BackButton = styled.button`
  outline: 0;
  background: ${Color.primary};
  font-size: 0.8rem;
  border: 0;
  padding: 5px 15px;
  margin-bottom: 20px;
  color: #FFFFFF;
  cursor: pointer;
`
const RegisterTitle = styled.h1`
  text-align: center;
  font-weight: lighter;
  color: rgb(85, 85, 85);
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
