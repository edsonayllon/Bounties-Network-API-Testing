import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [bounties, setBounties] = useState([{
    title: 'Loading...',
    token_symbol: '',
    calculated_fulfillment_amount: '0',
    description: '',
    attached_url: '#'
  }])
  const getApi = async () => {
    // this example shows all active bounties 
    // for the gitcoin platform
    // sorted by reward in USD
    // for only one platform, here gitcoin
    // only showing open bounties
    // with pay greater than 0
    let res = await fetch(`https://api.bounties.network/bounty/?ordering=usd_price&issuer=0x4be5f7c9912afd58bcda39b0a4ec76e7b21ba0f1&bountyStage=1`)
    let json = await res.json();
    setBounties(json.results);
  }

  const createCard = () => {
    return bounties.map((bounty) => (
      
        <div>
        <h2><a href={bounty.attached_url}>{bounty.title} [{parseFloat(bounty.calculated_fulfillment_amount).toFixed(2)} {bounty.token_symbol}]</a></h2>
          <p>
            {bounty.description}
          </p>
        </div>
      
    ))
  }

  useEffect(() => {
    getApi();
  },[])

  console.log(bounties)

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
      </header>
    </div>
  );
}

export default App;
