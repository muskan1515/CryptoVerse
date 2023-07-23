import React, { useEffect, useState } from 'react'
import icon from '../images/cryptocurrency.png';
import  {Button,Menu,Typography,Avatar} from 'antd'
import { Link } from 'react-router-dom';
import {BulbOutlined, FundOutlined, HomeOutlined, MoneyCollectOutlined,MenuOutlined} from '@ant-design/icons'
import MenuItem from 'antd/es/menu/MenuItem';

const Navbar = () => {
    const [activeMenu,setActiveMenu]=useState(false);
    const [screenSize,setScreenSize]=useState(0);

    useEffect(()=>{
        const handleResize=()=>setScreenSize(window.innerWidth);
        handleResize();
        window.addEventListener('resize',handleResize);

        return()=> window.removeEventListener('resize',handleResize);
    },[]);

    useEffect(()=>{
        if(screenSize<768)
         setActiveMenu(false);
        else
         setActiveMenu(true);
    },[screenSize]);

  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon}  size="large"/>
            <Typography.Title className='logo' level={2}>
                <Link to='/'>CyrptoVerse</Link>
            </Typography.Title>
            {screenSize<768 ?<div className='menu-control-container' onClick={(e)=>setActiveMenu(!activeMenu)}>
                <MenuOutlined/>
            </div>:""}
            {activeMenu && (<Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined/>} key={1}>
                    <Link to ='/'>Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined/>} key={2}>
                    <Link to ='/cryptocurrencies'>Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined/>} key={3}>
                    <Link to ='/exchanges'>Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined/>} key={4}>
                    <Link to ='/news'>News</Link>
                </Menu.Item>
            </Menu>)}
        </div>
    </div>
  )
}

export default Navbar