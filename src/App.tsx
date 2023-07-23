import React from 'react';
import {  Routes,Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { Typography, Space, Layout, Switch } from 'antd';
import './App.css';

import { Navbar, HomePage, Cryptocurrencies, CryptoDetails, News, Exchange } from './components';

function App() {
  return (
    <div className="app">
      <div className='navbar'>
        <Navbar/>
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
                <Route  path='/' element={<HomePage/>}/>
                <Route  path='/cryptocurrencies' element={<Cryptocurrencies Limit={0} />}/>
                <Route  path='/news' element={<News Limit={0}/>}/>
                <Route  path='/exchanges'element={<Exchange/>}/>
                <Route  path='/crypto/:coinId' element={<CryptoDetails/>}/>
            </Routes>
          </div>
        </Layout>
      <div className='footer'>
        <Typography.Title style={{color:'white',alignContent:'center'}} level={5}>
            CryptoVerse <br/>
            All rights are Reserved
        </Typography.Title>
        <Space>
          <Link to='/'>
            Home
          </Link>
          <Link to='/exchanges'>
            Exchanges
          </Link>
          <Link to='/news'>
            News
          </Link>
        </Space>
      </div>
      </div>
    </div>
  );
}

export default App;
