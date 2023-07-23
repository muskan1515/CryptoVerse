import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// const headers= {
//     'X-BingApis-SDK': 'true',
//     'X-RapidAPI-Key': '0cda613677mshbb1189dcd18e2a1p12ffc7jsn89f4e87a1732',
//     'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
// }

const headers= {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key':process.env.REACT_APP_NEWS_RAPID_API,
    'X-RapidAPI-Host': process.env.REACT_APP_NEWS_RAPID_HOST
}
// const baseURL='https://coinranking1.p.rapidapi.com';
const baseURL = process.env.REACT_APP_BASE_URL;

const createRequest=(url:string)=>({
    url,
    headers:headers
})

interface argTypeForCategoryNews{
    category:string;
    count:number
}

export const cryptoNewsApi= createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl:baseURL}),
    endpoints:(builder)=>({
        getCryptoNews:builder.query({
            query:({category,count}:argTypeForCategoryNews)=>createRequest(`/news/search?q=${category}&safeSearch=Off&textFormat=Raw&Freshness=Day&Count=${count}`)
        })
    })
}) 

export const {useGetCryptoNewsQuery} = cryptoNewsApi