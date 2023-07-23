import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoAPI';

import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data:coinsData,isFetching:isFetch1}=useGetCryptosQuery(20);
  const coinList = coinsData?.data?.coins;
  
  
 // Note: To access this endpoint you need premium plan
  if (isFetch1) return <Loader />;

  return (
    <>
      <Row key={1}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row key={2}>
        {coinList?.map((coin:any) => (
          <Col span={24} key={1}>
            <Collapse>
              <Panel
                key={coin?.uuid}
                showArrow={false}
                header={(
                  <Row key={coin?.uuid}>
                    <Col span={6}>
                      <Text><strong>{coin?.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={coin?.iconUrl} />
                      <Text ><strong>{coin.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(coin?.listedAt)}</Col>
                    <Col span={6}>{millify(coin?.marketCap)}</Col>
                    <Col span={6}>{millify(coin?.change)}%</Col>
                  </Row>
                  )}
              >
                Check Further Here : <a href={coin.coinrankingUrl}>Check Here</a>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;