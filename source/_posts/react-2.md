---
title: React 練習
abbrlink: e124
date: 2021-09-13 12:14:50
categories: Framework
tags:
	- react
---

### 留言板
#### package.json
``` json
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
	"homepage": "https://hot5656.github.io/react-comments-test2",
```

<!--more-->

#### index.js
``` js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';


ReactDOM.render(
	<App />
	,
	document.getElementById('root')
);
```

#### ./component/App/index.js
``` js
// ./component/App/index.js
// import App from './App';
// export default App;

// re-export
export { default } from './App';
```

#### ./component/App/App.js
``` js
// ./component/App/App.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const API_ENDPOINT = 'https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc';

const Page = styled.div`
  width: 360px;
  margin: 0 auto;
`;
const Title = styled.h1`
  color: #333;
`;
const MessageForm = styled.form`
  margin-top: 16px;
`;
const ErrorMessage = styled.div`
  marge-top: 16px;
  color: red;
`;


const MessageTextArea = styled.textarea`
  display: block;
  width: 100%;
`;

const SubmitButton = styled.button`
  margin-top: 8px;
`;

const MessageList = styled.div`
  margin-top: 16px;
`;

const MessageContainer = styled.div`
  border: 1px solid black;
  padding: 8px 16px;
  border-radius: 8px;
  

  // &:not(:first-child) {
  //   margin-top: 8px;
  // }

  & + & {
    margin-top: 8px;
  }
`;

const MessageHead = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3)
`;

const MessageAuthor = styled.div`
  color: rgba(23, 78, 55, 0.3)
`;

const MessageTime = styled.div``;

const MessageBody = styled.div`
  margin-top: 16px;
  font-size: 16px;
`;

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Message({author, time, children}) {
  return (
    <MessageContainer>
      <MessageHead>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
      </MessageHead>
      <MessageBody>{children}</MessageBody>
    </MessageContainer>
  );
}

Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  children: PropTypes.node
};

// api https://github.com/Lidemy/lidemy-student-json-api-server
// https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc
export default function App() {
  const [messages, setMessages] = useState(null);
  const [messageApiError, setMessageApiError] = useState(null);
  const [value, setValue] = useState();
  const [postMessageError, setPostMessageError] = useState();
  const [isLoadingPostMessage, SetIsLoadingPostMessage] = useState(false);

  const fetchMessahe = () => {
    fetch(API_ENDPOINT)
    .then( res => res.json())
    .then( data => {
      setMessages(data);
    })
    .catch(err => {
      setMessageApiError(err.message);
    });
  };

  const handleTextAreaChange = e => {
    setValue(e.target.value);
  }; 

  const handelTextAreaFocus = e => {
    setPostMessageError(null);
  }; 

  const handleFormSubmit = e => {
    e.preventDefault();
    if (isLoadingPostMessage) {
      console.log('no send');
      return;
    }
    SetIsLoadingPostMessage(true);

    fetch('https://student-json-api.lidemy.me/comments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        nickname: 'Hi',
        body: value
      })
    })
    .then(res => res.json())
    .then(data => {
      SetIsLoadingPostMessage(false);
      if ( data.ok === 0) {
        setPostMessageError(data.message);
        return;
      }
      setValue("");
      fetchMessahe();
    }).catch(err => {
      SetIsLoadingPostMessage(false);
      setPostMessageError(err.message);
    });
  };

  useEffect(() =>{
    fetchMessahe();
  }, []);

  return (
     <Page>
       {isLoadingPostMessage && <Loading>Loading...</Loading>}
      <Title>留言板</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageTextArea value={value} onChange={handleTextAreaChange} onFocus={handelTextAreaFocus} rows="10" />
        <SubmitButton>送出留言</SubmitButton>
        {postMessageError && <ErrorMessage>{postMessageError}</ErrorMessage>}
      </MessageForm>
      {messageApiError && (
        <ErrorMessage>
          Something went wrong. {messageApiError.toString()}
        </ErrorMessage>
      )}
      {messages && messages.length === 0 && <div>No Messahe</div>}
      <MessageList>
        {messages && messages.map(message =>{
          return (
          <Message key={message.id} author={message.nickname} time={new Date(message.createdAt).toLocaleString() }>
            {message.body}
          </Message>
          );
        })}


      </MessageList>
    </Page>
  );
}
```


