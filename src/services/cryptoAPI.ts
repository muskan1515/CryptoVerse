import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// const APIHeaders= {
//     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
//     'X-RapidAPI-Key': '0cda613677mshbb1189dcd18e2a1p12ffc7jsn89f4e87a1732'
    
// };

const APIHeaders= {
    'X-RapidAPI-Host': process.env.REACT_APP_COINS_RAPID_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_COINS_RAPID_API
    
};

// const baseURL='https://coinranking1.p.rapidapi.com';
const baseURL=process.env.REACT_APP_BASE_URL;

const createRequest = (url: string) => ({
    url: url,
    headers: APIHeaders
  });

  interface argHistory{
    coinIdx:Number,
    timeperiod:String
  }


export const cryptoApi= createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    endpoints:(builder)=>({
        getCryptos:builder.query({
            query:(count:number)=>createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails:builder.query({ 
            query:(coinId:string)=>createRequest(`/coin/${coinId}`)
            
        }),
        getCryptoHistory:builder.query({ 
            query:({coinIdx,timeperiod}:argHistory)=>createRequest(`/coin/${coinIdx}/history?timePeriod=${timeperiod}`)
            
        }),
        getExchanges: builder.query({
            query: (coinId:String) => createRequest(`/coin/${coinId}/exchanges`),
        })
    })
});

export const {useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery,useGetExchangesQuery}=cryptoApi;

