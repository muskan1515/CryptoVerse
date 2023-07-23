import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from '../services/cryptoAPI';
import Loader from './Loader';


const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data:coinData, isFetching } = useGetCryptoDetailsQuery(`${coinId}`);

  const cryptoDetails = coinData?.data?.coin;
  const coinIdx=cryptoDetails?.uuid;

  if(isFetching)
   return <Loader/>

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const volume: number | undefined = cryptoDetails?.['24hVolume'];
  
  const stats = (cryptoDetails?[
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(Number(cryptoDetails.price))}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${volume && millify(Number(volume))}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(Number(cryptoDetails.marketCap))}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(Number(cryptoDetails?.allTimeHigh?.price))}`, icon: <TrophyOutlined /> },
  ]:[])

  const genericStats = (cryptoDetails?[
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(Number(cryptoDetails.supply.total))}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(Number(cryptoDetails.supply.circulating))}`, icon: <ExclamationCircleOutlined /> },
  ]:[])

  return (
    <Col className="coin-detail-container" key={1}>
      <Col className="coin-heading-container" key={1}>
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.slug}) <img style={{width:'30px',height:'30px',paddingTop:'4px',top:'30%'}} src={cryptoDetails?.iconUrl} alt="currency-logo"/>
        </Title>
        <p>{cryptoDetails?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
     
      <Col className="stats-container" key={2}>
        <Col className="coin-value-statistics" key={1}>
          <Col className="coin-value-statistics-heading" key={1}>
            <Title level={3} className="coin-details-heading">{cryptoDetails?.name} Value Statistics</Title>
            <p>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={2}>
              <Col className="coin-stats-name" key={1}>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info" key={3}>
          <Col className="coin-value-statistics-heading" key={1}>
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={1}>
              <Col className="coin-stats-name" key={1}>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link" key={4}>
        <Row className="coin-desc" key={1}>
          <Title level={3} className="coin-details-heading">What is {cryptoDetails?.name}?</Title>
          {HTMLReactParser(String(cryptoDetails?.description))}        
          </Row>
        <Col className="coin-links" key={2}>
          <Title level={3} className="coin-details-heading">{cryptoDetails?.name} Links</Title>
          {cryptoDetails?.links?.map((link:any) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
    
  );
  
};

export default CryptoDetails;
