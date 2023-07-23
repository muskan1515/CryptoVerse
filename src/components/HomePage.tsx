import React from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { Typography,Row , Col , Statistic } from 'antd'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
import Loader from './Loader'


const HomePage = () => {

  const {data,isFetching} = useGetCryptosQuery(100);
  const globaData=data?.data?.stats;
  if(isFetching)
  return <Loader/>
  return (
    <div>
      
      <Typography.Title level={2}>
        Global Crypto Stats
      </Typography.Title>
      {globaData ? <Row>
        <Col span={12}><Statistic title="Total CryptoCurrency" value={millify(globaData.total)}/></Col>
        <Col span={12}><Statistic title="Total Exchange" value={millify(globaData.totalExchanges)}/></Col>
        <Col span={12}><Statistic title="Total Market cap" value={millify(globaData.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title="Total 24 Volume" value={millify(globaData.total24hVolume)}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globaData.totalMarkets)}/></Col>
      </Row>:""}
      <div className='home-heading-container'>
        <Typography.Title level={2} className='home-title'>Top 10 CryptoCurrencies In The World</Typography.Title>
        <Typography.Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Typography.Title>
      </div>
      <Cryptocurrencies  Limit={1}/>
      <div className='home-heading-container'>
        <Typography.Title level={2} className='home-title'>Latest Crypto News</Typography.Title>
        <Typography.Title level={3} className='show-more'><Link to='/news'>Show More</Link></Typography.Title>
      </div>
      <News  Limit={1} />
    </div>
  )
}

export default HomePage