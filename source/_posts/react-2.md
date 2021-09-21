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


