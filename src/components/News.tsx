import React, { useState } from 'react'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsAPI'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { Row,Col,Card, Typography, Avatar, Select } from 'antd'

import moment from 'moment'
import Loader from './Loader'

interface typeArgs{
  Limit:number
}

interface typeMap{
  new:Object,
  i:number
}

const {Option} = Select

const demoImage='https://th.bing.com/th/id/OIP.Jc2qQPFQ60TNlggcb8GTHAHaEK?w=315&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7';

const News = ({Limit}:typeArgs) => {
  const count=(Limit)?6:20;
  const [category,setCategory]=useState("Cryptocurrency");
  const {data,isFetching}=useGetCryptosQuery(count);
  const {data:dataNew,isFetching:isFetching2}=useGetCryptoNewsQuery({category,count});
  const cryptoNews=dataNew?.value;
  const cryptoCoins=data?.data?.coins;

  if(isFetching||isFetching2)
  return <Loader/>
  return (
    <>
      <Row gutter={[24,24]} className='crypto-card-container' >
        {!Limit?
        <Col span={24}>
          <Select
          showSearch
          className='select-news'
          placeholder='Select '
          optionFilterProp='items'
          onChange={(value)=>setCategory(value)}
          filterOption={(value,option)=>option?.items?.toLowerCase().indexOf(value.toLowerCase())}
          >
            <Option value="Cryptocurrency">CryptoCurrency</Option>
           {cryptoCoins?cryptoCoins.map((coin:any)=>(
              <Option value={coin.name}>{coin.name}</Option>
           )):""
          }
          </Select>
          
        </Col>
        :""}
        {cryptoNews ? cryptoNews.map((news:any,idx:number) => (
            <Col xs={24} sm={12} lg={8} className='news-card' key={idx}>
              <Card hoverable className='news-card'>
              <a href={news.url} rel="non-refferrer" target='_blank'>
                <div className='news-image-container'>
                  <Typography.Title level={4} className='news-title'>{news.name}</Typography.Title>
                  <img style={{width:'200px',height:'100px'}} src={news?.image?.thumbnail?.contentUrl|| demoImage} alt="news image"/>
                </div>
                <p>
                    {
                      news.description>100? `${news.description.substring(0,100)}....`:news.description
                    }
                </p>
                <div className='provider-container'>
                    <div >
                      <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl||demoImage} alt='news provider'/>
                      <Typography.Text className="provider-name">{news?.provider[0]?.name}</Typography.Text>
                    </div>
                    <Typography.Text>{`${moment(news.datePublished).startOf('m').fromNow()}`}</Typography.Text>
                </div>
              </a>
              </Card>
          </Col>
        ))
      :""}
    </Row>
    </>
  )
}

export default News