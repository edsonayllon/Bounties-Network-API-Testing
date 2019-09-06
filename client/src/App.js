import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [bounties, setBounties] = useState([{
    title: 'loading',
    token_symbol: '',
    calculated_fulfillment_amount: '-',
    description: ''
  }])
  const getApi = async () => {
    // this example shows all active bounties 
    // for the gitcoin platform
    // sorted by reward in USD
    // for only one platform, here gitcoin
    // only showing open bounties
    // with pay greater than 0
    let res = await fetch(`https://api.bounties.network/bounty/?ordering=-usd_price&platform=gitcoin&bountyStage=1`)
    let json = await res.json();
    setBounties(json.results);
  }

  const createCard = () => {
    bounties.map((bounty) => {
      console.log(bounty)
      return (
        <div> 
          <h2>Bounty Title</h2>
          <p>
            Bounty description
          </p>
        </div>
      )
    })
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
