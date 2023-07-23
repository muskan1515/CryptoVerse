import React, { useEffect } from 'react'
import { useGetExchangesQuery } from '../services/cryptoAPI';
import Loader from './Loader';

interface type{
    setCoinExchange:any;
    coinId:String;
}

const CoinExchange = ({setCoinExchange,coinId}:type) => {
    const {data:exchnageData,isFetching}=useGetExchangesQuery(coinId);

    useEffect(()=>{
        setCoinExchange(exchnageData);
    },[]);
    console.log(exchnageData);
    if(isFetching)
     return <Loader/>
    
  return (
    <></>
  )
}

export default CoinExchange