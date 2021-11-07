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


### 部落格
#### ./src
``` js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {
  // BrowserRouter as Router,
  // for SPA
  HashRouter as Router,
} from "react-router-dom";

ReactDOM.render(
	<Router>
		<App />
	</Router>
	,
	document.getElementById('root')
);
```

``` js 
// contexts.js 
import { createContext } from "react";

export const AuthContext = createContext(null);
```

``` js
// utils.js
const TOKEN_NAME = 'token';

export const setAuthToken = token => {
	localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => {
	return localStorage.getItem(TOKEN_NAME);
};
```

``` js
// WebApi.js
import { getAuthToken } from "./utils";

const BASE_URL = "https://student-json-api.lidemy.me";

// api https://github.com/Lidemy/lidemy-student-json-api-server
// https://student-json-api.lidemy.me/posts?userId=1&_expand=user
// https://student-json-api.lidemy.me/posts?id=1
export const getPosts = () => {
	return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`)
		.then( (res) => res.json());
};

export const getPostId = (id) => {
	return fetch(`${BASE_URL}/posts?id=${id}`)
		.then( (res) => res.json());
};

// https://student-json-api.lidemy.me/login
// user01 Lidemy
// JWT 
export const login = (username, password) => {
	return fetch(`${BASE_URL}/login`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			username,
			password
		})
	})
	.then(res => res.json());
};

export const getMe = () => {
	const token = getAuthToken();

	return fetch(`${BASE_URL}/me`, {
		headers: {
			'authorization': `Bearer ${token}`
		}
	})
	.then(res => res.json());
};

// https://student-json-api.lidemy.me/posts
export const create = (title , body ) => {
	const token = getAuthToken();

	return fetch(`${BASE_URL}/posts`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'authorization': `Bearer ${token}`,
		},
		body: JSON.stringify({
			title,
			body
		})
	})
	.then(res => res.json());
};
```

#### ./src/components/App
``` js
// ./component/App/App.js
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {
  Switch,
  Route,
} from "react-router-dom";
import HomePage from "../../Pages/HomePage";
import LoginPage from "../../Pages/LoginPage"; 
import BlogPost from "../../Pages/BlogPost"; 
import CreatePage from "../../Pages/CreatePage";
import Header from "../Header";
import { getMe } from "../../WebApi";
import { AuthContext } from "../../contexts";
import { getAuthToken } from "../../utils";

const Root =  styled.div`
  padding-top: 64px;
`;

export default function App() {
  const [user, setUser] = useState();
  const [isDone, setIsDone] = useState(false);
  // const isDone = useRef(false);
  
  useEffect(() =>{
    const token = getAuthToken();
    if (token) {
      getMe().then(resp =>{
        if (resp.ok === 1) {
          setUser(resp.data);
        }
      });
    }
    setIsDone(true);
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Root>
        <Header done={isDone} />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/posts/:slug">
            <BlogPost />
          </Route>
          <Route path="/new-post">
            <CreatePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Root>
    </AuthContext.Provider>
  );
}
```

``` js
// ./component/App/index.js
export { default } from './App';
```

#### ./src/components/Header
``` js
// ./component/Header/Header.js
import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";
import PropTypes from 'prop-types';

const HeaderConainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0px 32px;
  background: white;
`;

const NavbarList = styled.div`
  display: flex;
  align-utems: center;

`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 64px;
  }
`; 

const Brand = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

// set to link
const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  box-sizing: border-box;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${(props) =>
    props.$active && 
    `
      background: rgba(0, 0, 0, 0.1);
    `}
`;

export default function Header({done}) {
  const location = useLocation();
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext); 

  const handleLogout = () => {
    setAuthToken('');
    setUser(null);
    if (location.pathname !==  "/") {
      history.push('/');
    } 
  };

  return (
    <HeaderConainer>
      <LeftContainer>
        <Brand >部落格</Brand>
        <NavbarList>
          <Nav to="/" $active={location.pathname ===  "/"} >首頁</Nav>
          { (user && done)&& <Nav to="/new-post" $active={location.pathname ===  "/new-post"} >發佈文章</Nav>}
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        {(!user && done) && <Nav to="/login" $active={location.pathname ===  "/login"}>登入</Nav>}
        {(user && done)  && <Nav to="#" onClick={handleLogout}>登出</Nav>}
      </NavbarList>
    </HeaderConainer>
  );
}

Header.propTypes = {
  done: PropTypes.bool
};
```

``` js
// ./component/Header/index.js
export { default } from './Header';
```

#### ./src/Pages/BlogsPost
``` js
// ./Pages/BlogPost/BlogPost.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getPostId } from "../../WebApi";
import { useParams } from "react-router-dom";

const PostContainer = styled.div`
    width: 80%;
    margin: 0 auto;
  `;
const PostTitle = styled.div`
  text-align: center;
  font-size: 24px;
`;
const PostBody = styled.div``;


export default function BlogPost() {
  let { slug } = useParams();

  const [ post, setPost ] = useState({
    title: "",
    body: "" 
  });


  useEffect(() => {
    getPostId(slug).then( post => {
      if (post.length > 0) {
        setPost(post[0]);
      }
    });
  }, [slug]);

  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostBody>{post.body}</PostBody>
    </PostContainer>
  );
}
```

``` js
// ./Pages/BlogPost/index.js
export { default } from './BlogPost';
```


#### ./src/Pages/CreatePage
``` js
// ./Pages/CreatePage/CreatePage.js
import React, { useState } from "react";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { create } from "../../WebApi";

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Title = styled.div`
  padding: 5px 0;
  input {
    width: 100%;
  }

  div {
    padding-bottom: 5px;
  }
`;

const Content = styled.div`
  padding-bottom: 10px;
  
  textarea {
    width: 100%;
  }

  div {
    padding-bottom: 5px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
`;


export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory(); 

  const handleSubmit = e => {
    e.preventDefault();
    create(title, content).then( data => {
      console.log(data);
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      history.push('/');
    });
  };



  return (
    <Root>
      <form onSubmit={handleSubmit}>
        <Title>
          <div>
            Title
          </div>
          <input type="text" value={title} onChange={ e => setTitle(e.target.value)} />
        </Title>
        <Content>
          <div>
            Content
          </div>
          <textarea rows="10" value={content} onChange={ e => setContent(e.target.value)}>
          </textarea>
        </Content>
        <div>
          <button type="submit">新增</button>
        </div>
        { errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
    </Root>
  );
};
```

``` js
// ./Pages/CreatePage/index.js
export { default } from './CreatePage';
```


#### ./src/Pages/HomePage
``` js
// ./Pages/HomePage/HomePage.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PropTypes } from "prop-types";
import { getPosts } from "../../WebApi";
import { Link } from "react-router-dom";

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.3);
`;


function Post ({post}) {
  return (
    <PostContainer >
      <PostTitle to={`/posts/${post.id}`} >{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object
};

export default function HomePage() {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    getPosts().then( posts => {
      setPosts(posts);
    });
  }, []);

  return (
    <Root>
      {posts.map( post => <Post post={post} key={post.id}/>)}
    </Root>
  );
}
```

``` js
// ./Pages/HomePage/index.js
export { default } from './HomePage';
```


#### ./src/Pages/LoginPage
``` js
// ./Pages/LoginPage/LoginPage.js
import React, { useState, useContext } from "react";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { setAuthToken } from "../../utils";
import { login, getMe } from "../../WebApi";
import { AuthContext } from "../../contexts";

const Root = styled.div`
  width: 400px;
  margin: 10px auto;
  border: 1px solid black;
  padding: 10px;
`;

const UserName = styled.div`
  margin-bottom: 10px;
  input {
    width: 320px;
  }
`;
const Password = styled.div`
  margin-bottom: 10px;
  input {
    width: 320px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default function LoginPage() {
  const {setUser} = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory(); 


  const handleSubmit = e => {
    e.preventDefault();
    login(username, password).then( data => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      setErrorMessage('');

      getMe().then(resp => {
        if (resp.ok !==1) {
          setAuthToken(null);
          return setErrorMessage(resp.toString());
        }
        setUser(resp.data);
        history.push('/');
      });
    });
  };

  return (
    <Root>
      <form onSubmit={handleSubmit}>
        <UserName>
          username: <input type="text" value={username} onChange={ e => setUsername(e.target.value)} />
        </UserName>
        <Password>
          password: <input type="password" value={password} onChange={ e => setPassword(e.target.value)} />
        </Password>
        <button type="submit">登入</button>
        { errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
    </Root>
  );
};
```

``` js
// ./Pages/LoginPage/index.js
export { default } from './LoginPage';
```

### 報名表單

#### ./App.css
``` css
body {
  background: #b2b2b2;
}
```

#### ./App.js
``` js
// App.js
import "./App.css";
import { useState } from "react";
import styled from "styled-components";

const Root = styled.div`
  width: 645px;
  border-top: 5px solid #fad312;
  margin: 10px auto;
  background: #fff;
  padding: 50px 32px;

  .h1 {
    font-size: 36px;
  }

  .input-middle-note {
    font-size: 14px;
    color: red;
    margin-top: 20px;
  }

  .input-note {
    font-size: 14px;
  }

  .input-label {
    font-size: 20px;
    margin-top: 50px;
  }

  .input-middle {
    font-size: 18px;
  }

  button {
    font-size: 16px;
    background: #fad312;
    border-width: 0;
    padding: 12px 32px;
    cursor: pointer;
    margin: 30px 0 20px 0;
    border-radius: 5px;
  }

  input {
    padding: 8px;
    margin-top: 10px;
  }

  .required::after {
    position: relative;
    top: 2px;
    left: 2px;
    content: "*";
    color: red;
  }
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default function App() {
  const [submit, setSumbit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");
  const [submitMode, setSubmitMode] = useState("");
  const [how, setHow] = useState("");
  const [suggest, setSuggest] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone, submitMode, how, suggest);
    let submitString = "";
    if (submitMode === "bed") {
      submitString = "躺在床上用想像力實作";
    }
    if (submitMode === "mobile") {
      submitString = "趴在地上滑手機找現成的";
    }

    setSumbit(true);

    if (!name || !email || !phone || !submitMode) return;

    let report =
      `暱稱 : ${name}\n` +
      `電子郵件 : ${email}\n` +
      `手機號碼 : ${phone}\n` +
      `報名類型 : ${submitString}\n` +
      `來源 :  ${how}\n` +
      `建議 :  ${suggest}`;
    alert(report);

    window.location.reload();
  };

  return (
    <Root>
      <form onSubmit={handleSubmit}>
        <h1>新拖延運動報名表單</h1>
        <div className="input-note">活動日期：2020/12/10 ~ 2020/12/11</div>
        <div className="input-note">活動地點：台北市大安區新生南路二段1號</div>

        <div className="input-middle-note">* 必填</div>

        <div className="input-label required">
          <label htmlFor="">暱稱</label>
        </div>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {!name && submit && <ErrorMessage>不可為空白!</ErrorMessage>}

        <div className="input-label required">
          <label htmlFor="">電子郵件</label>
        </div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!email && submit && <ErrorMessage>不可為空白!</ErrorMessage>}

        <div className="input-label  required">
          <label htmlFor="">手機號碼</label>
        </div>
        <input
          type="tel"
          nampe="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {!phone && submit && <ErrorMessage>不可為空白!</ErrorMessage>}

        <div className="input-label required">
          <label htmlFor="">報名類型</label>
        </div>
        <div>
          <div>
            <input
              className="input-middle"
              type="radio"
              name="submit-mode"
              value="bed"
              onChange={(e) => setSubmitMode(e.target.value)}
            />
            躺在床上用想像力實作
          </div>
          <div>
            <input
              className="input-middle"
              type="radio"
              name="submit-mode"
              value="mobile"
              onChange={(e) => setSubmitMode(e.target.value)}
            />
            趴在地上滑手機找現成的
          </div>
        </div>
        {!submitMode && submit && <ErrorMessage>不可不選!</ErrorMessage>}

        <div className="input-label">
          <label htmlFor="">怎麼知道這個活動的？ </label>
        </div>
        <input
          type="text"
          name="how"
          value={how}
          onChange={(e) => setHow(e.target.value)}
        />

        <div className="input-label">其他</div>
        <div className="input-note">對活動的一些建議</div>
        <input
          type="text"
          name="suggest"
          value={suggest}
          onChange={(e) => setSuggest(e.target.value)}
        />
        <div>
          <button type="submit">提交</button>
        </div>
      </form>
      <div className="input-note">請勿透過表單送出您的密碼。</div>
    </Root>
  );
}
```

### 五子棋
#### ./App.js
``` js
// App.js
import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Board from "./Board";

const Game = styled.div`
  background: #f9cc9d;
`;

const SequareContentB = styled.div`
  width: 26px;
  height: 26px;
  background: black;
  border-radius: 50%;
  box-sizing: border-box;
  position: relative;
  left: 1px;
  top: 1px;
  margin-left: 10px;
  margin-top: 5px;
`;

const SequareContentW = styled.div`
  width: 26px;
  height: 26px;
  background: white;
  // border: 1px solid black;
  border-radius: 50%;
  box-sizing: border-box;
  position: relative;
  left: 1px;
  top: 1px;
  margin-left: 10px;
  margin-top: 5px;
`;

const StatusLine = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  font-size: 30px;
`;

function Status({ blackNext, winner }) {
  let status;
  if (!winner) {
    status = "Next player:";
  } else {
    status = "Winner:";
  }

  return (
    <StatusLine>
      {status}
      {blackNext && <SequareContentB />}
      {!blackNext && <SequareContentW />}
    </StatusLine>
  );
}

Status.propTypes = {
  blackNext: PropTypes.bool,
  winner: PropTypes.bool,
};

// Next player: X
// Winner: X
// Draw
export default function App() {
  const [squares, setSquares] = useState(Array(19 * 19).fill(null));
  const [blackNext, setBlackNext] = useState(true);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    // console.log("app..");
    // console.log(squares);
    if (squares[0] !== null) {
      if (squares[0] === "b") {
        setBlackNext(true);
      } else {
        setBlackNext(false);
      }
      setWinner(true);
      console.log("Winner...");
    }
  }, [squares]);

  return (
    <Game>
      <Status blackNext={blackNext} winner={winner}></Status>
      <Board
        squares={squares}
        setSquares={setSquares}
        blackNext={blackNext}
        setBlackNext={setBlackNext}
        setWinner={setWinner}
        winner={winner}
      ></Board>
    </Game>
  );
}
```

#### ./Board.js
``` js
import styled from "styled-components";
import PropTypes from "prop-types";

const MAX_BOARD_WIDTH = 19;
const MIN_POSITION = 0;
const MAX_POSITION = 18;
const WIN_COUNT = 5;

const Root = styled.div`
  display: flex;
  width: 610px;
  justify-content: start;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 0 auto;
  border: 1px solid black;
`;

const SquareBlock = styled.div`
  border: 1px solid black;
  width: 32px;
  height: 32px;
  display: block;
  box-sizing: border-box;
`;

const SequareContentB = styled.div`
  width: 26px;
  height: 26px;
  background: black;
  border-radius: 50%;
  box-sizing: border-box;
  position: relative;
  left: 1px;
  top: 1px;
`;

const SequareContentW = styled.div`
  width: 26px;
  height: 26px;
  background: white;
  border-radius: 50%;
  box-sizing: border-box;
  position: relative;
  left: 1px;
  top: 1px;
`;

function Square({
  index,
  squares,
  setSquares,
  blackNext,
  setBlackNext,
  setWinner,
  winner,
}) {
  const winCount = (x, y, square, ox, oy) => {
    let count = 1;
    // console.log(`(${x},${y}) : ${square}`);
    for (let i = 1; i < 5; i++) {
      const tempX = x + i * ox;
      const tempY = y + i * oy;
      if (
        tempX < MIN_POSITION ||
        tempX > MAX_POSITION ||
        tempY < MIN_POSITION ||
        tempY > MAX_POSITION
      ) {
        continue;
      }

      if (squares[tempX + tempY * MAX_BOARD_WIDTH] === square) {
        count = count + 1;
      } else {
        break;
      }
      // console.log(`(${tempX},${tempY})`, tempX + tempY * MAX_BOARD_WIDTH);
    }
    for (let i = 1; i < 5; i++) {
      const tempX = x + i * -ox;
      const tempY = y + i * -oy;
      if (
        tempX < MIN_POSITION ||
        tempX > MAX_POSITION ||
        tempY < MIN_POSITION ||
        tempY > MAX_POSITION
      ) {
        continue;
      }

      if (squares[tempX + tempY * MAX_BOARD_WIDTH] === square) {
        count = count + 1;
      } else {
        break;
      }
      // console.log(`(${tempX},${tempY})`, tempX + tempY * MAX_BOARD_WIDTH);
    }

    return count;
  };

  const win = (x, y, square) => {
    const count1 = winCount(x, y, square, 1, 0);
    const count2 = winCount(x, y, square, 0, 1);
    const count3 = winCount(x, y, square, 1, 1);
    const count4 = winCount(x, y, square, 1, -1);
    console.log(`(${x},${y}) : ${square}`, count1, count2, count3, count4);
    return (
      count1 >= WIN_COUNT ||
      count2 >= WIN_COUNT ||
      count3 >= WIN_COUNT ||
      count4 >= WIN_COUNT
    );
    // console.log(`(${x},${y}) : ${square}`);
    // for (let i = 0; i < 5; i++) {
    //   console.log(`(${x + i},${y})`);
    // }
    // for (let i = 0; i < 5; i++) {
    //   console.log(`(${x - i},${y})`);
    // }
    // console.log("-----");
    // for (let i = 0; i < 5; i++) {
    //   console.log(`(${x},${y + i})`);
    // }
    // for (let i = 0; i < 5; i++) {
    //   console.log(`(${x},${y - i})`);
    // }
    // console.log("-----");
    // for (let i = 0; i < 5; i++) {
    //   console.log(`(${x + i},${y + i})`);
    // }
    // for (let i = 0; i < 5; i++) {
    //   console.log(`(${x - i},${y - i})`);
    // }
    // console.log("-----");
    // for (let i = 0; i < 5; i++) {
    //   console.log(`(${x + i},${y - i})`);
    // }
    // for (let i = 0; i < 5; i++) {
    //   console.log(`(${x - i},${y + i})`);
    // }
    // console.log("-----");
  };

  const handleClick = () => {
    if (squares[index] !== null) return;
    if (winner) return;
    const x = index % MAX_BOARD_WIDTH;
    const y = Math.floor(index / MAX_BOARD_WIDTH);
    const player = blackNext ? "b" : "w";
    setSquares(
      squares.map((item, i) => {
        if (i !== index) return item;
        return player;
      })
    );
    setBlackNext(!blackNext);

    if (win(x, y, player)) {
      if (player === "b") {
        setBlackNext(true);
      } else {
        setBlackNext(false);
      }
      setWinner(true);
      console.log("Winner...");
    }
  };

  return (
    <SquareBlock onClick={handleClick}>
      {squares[index] === "b" && <SequareContentB />}
      {squares[index] === "w" && <SequareContentW />}
    </SquareBlock>
  );
}

Square.propTypes = {
  index: PropTypes.number,
  squares: PropTypes.array,
  setSquares: PropTypes.func,
  blackNext: PropTypes.bool,
  setBlackNext: PropTypes.func,
  setWinner: PropTypes.func,
  winner: PropTypes.bool,
};

export default function Board({
  squares,
  setSquares,
  blackNext,
  setBlackNext,
  setWinner,
  winner,
}) {
  return (
    <Root>
      {squares.map((point, index) => {
        return (
          <Square
            key={index}
            index={index}
            squares={squares}
            setSquares={setSquares}
            blackNext={blackNext}
            setBlackNext={setBlackNext}
            setWinner={setWinner}
            winner={winner}
          ></Square>
        );
      })}
    </Root>
  );
}

Board.propTypes = {
  squares: PropTypes.array,
  setSquares: PropTypes.func,
  blackNext: PropTypes.bool,
  setBlackNext: PropTypes.func,
  setWinner: PropTypes.func,
  winner: PropTypes.bool,
};
```

