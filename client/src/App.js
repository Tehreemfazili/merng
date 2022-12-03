import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import ReactDOM from "react-dom/client";
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/authRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import SinglePost from './pages/SinglePost';

function App() {
  return (
    //Used fragment as menu is not the part of route
    //</Route> is only ever to be used as the child of <Routes> element, never rendered directly.
    <AuthProvider>
        <Fragment>
            <Container> 
            <MenuBar />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={ <Home/>}/>
                </Routes> 
                <AuthRoute exact path="/login" element={<Login/>}  />
                    <AuthRoute exact path="/register" element={<Register/>} />
            </BrowserRouter>
        </Container>
    </Fragment>
    </AuthProvider>
       
    // </BrowserRouter>
       
    // <AuthProvider>
    //   <Router>
    //     <h1>hello world</h1>
    //     {/* <Container> */}
        
    //       <MenuBar />
    //       <Route exact path="/" component={Home} />
    //       <Route exact path="/login" component={Login}  />
    //       <Route exact path="/register" component={Register} />

    //       {/* <AuthRoute exact path="/login" component={Login} />
    //       <AuthRoute exact path="/register" component={Register} />
    //       <Route exact path="/posts/:postId" component={SinglePost} /> */}
    //     {/* </Container> */}
    //   </Router>
    // </AuthProvider>
  );
}

export default App;