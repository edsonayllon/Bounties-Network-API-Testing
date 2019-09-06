import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [bounties, setBounties] = useState([{
    title: 'Loading...',
    token_symbol: '',
    calculated_fulfillment_amount: '0',
    description: '',
    attached_url: '#',
    id: 1
  }])
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const getApi = async () => {
    // this example shows all active bounties 
    // for one issuer
    // sorted by reward in USD
    // only showing open bounties
    // if more than 25 results, allows sorting through pages
    let res = await fetch(`https://api.bounties.network/bounty/?ordering=usd_price&issuer=0x4be5f7c9912afd58bcda39b0a4ec76e7b21ba0f1&bountyStage=1&offset=${page}`)
    let json = await res.json();
    console.log(json);
    setTotalResults(json.count)
    setBounties(json.results);
  }

  const nextPage = () => {
    setPage(page+25);
  }

  const prevPage = () => {
    setPage(page-25);
  }

  const createCard = () => {
    return bounties.map((bounty) =>  (
      <div key={bounty.id}>
        <h2><a href={bounty.attached_url}>{bounty.title} [{parseFloat(bounty.calculated_fulfillment_amount).toFixed(2)} {bounty.token_symbol}]</a></h2>
        <p>
          {bounty.description}
        </p>
      </div>
    ))
  }

  useEffect(() => {
    getApi();
  },[page])

  console.log(bounties)
  console.log(totalResults);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>Bounty Title</h2>
          <p>
            Bounty description
          </p>
        </div>
        {
          createCard()
        }
        <tr>
        {
          page - 25 > 0 && (<a href='#' onClick={prevPage}>prev</a>)
        }
        {
          page + 25 < totalResults && (<a href='#' onClick={nextPage}>next</a>)
        }
        </tr>
      </header>
    </div>
  );
}

export default App;
