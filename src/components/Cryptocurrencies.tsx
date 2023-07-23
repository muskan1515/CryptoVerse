import {useState,useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { Row,Col,Card, Input } from 'antd'
import Loader from './Loader'

interface MyComponentProps{
  Limit:number;
  
}
const Cryptocurrencies : React.FC<MyComponentProps> = ({ Limit }) => {
  const count=(Limit)?10:100;
  const {data,isFetching}=useGetCryptosQuery(count);

  

  const [crypto,setCrypto]=useState([]);
  const [searchTerm,setSearchTerm]=useState('');
 
  
  useEffect(()=>{
      const filteredData=data?.data?.coins.filter((coin:any)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setCrypto(filteredData);
  },[searchTerm]);

  if(isFetching)
  return <Loader/>
  return (
    <>
     {!Limit?
     <div className='search-crypto'>
      <Input placeholder='Search for Crypto Currencies.' onChange={(e)=>setSearchTerm(e.target.value)}/>
    </div>
    :""}
    <Row gutter={[32,32]} className='crypto-card-container' key={1} >
        {crypto ? crypto.map((currency:any) => (
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
          <Link to={`/crypto/${currency.uuid}`} key={currency.uuid}>
              <Card
                title={`${currency.rank}.${currency.name}`}
                extra={<img className='crypto-image' src={currency.iconUrl}/>}
                hoverable
              >
                <p>Price : {millify(currency.price)}$</p>
                <p>Market Cap : {millify(currency.marketCap)}</p>
                <p>Daily Chnages : {millify(currency.change)}%</p>
              </Card>
          </Link>
        </Col>
        ))
      :""}
    </Row>
    </>
    )
}

export default Cryptocurrencies