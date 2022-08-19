import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Color from '../parts/Color';
import { Wrapper } from '../parts/Wrapper';
import { BookForm } from '../parts/BookForm';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export const RegisterBook = () => {
  const navigate = useNavigate();

  return (
    <>
      <Wrapper width={"800px"}>
        <BackButton onClick={() =>{navigate(-1)}}>&lt; 戻る</BackButton>
        <Tabs>
          <TabList>
            <Tab>1件ずつ登録</Tab>
            <Tab>CSVから登録</Tab>
          </TabList>
          <TabPanel>
            <BookForm />
          </TabPanel>
          <TabPanel>
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
  color: #FFFFFF;
  cursor: pointer;
`
