import React, {useEffect, setState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const getApi = async () => {
    // this example shows all active bounties 
    // for the gitcoin platform
    // sorted by reward in USD
    // for only one platform, here gitcoin
    // only showing open bounties
    let res = await fetch(`https://api.bounties.network/bounty/?ordering=usd_price&platform=gitcoin&bountyStage=1`)
    let json = await res.json();
    return json
  }

  const createCard = async () => {
    const bounties = await getApi();
    console.log(bounties)
  }

  const getIpfsData = async () => {
    // gets bounty details from ipfs gateway
    let res = await fetch(`https://ipfs.io/ipfs/QmPXcbkWrKyxAcSrg5TXUM1QjuFtwSYTkXERNLoWrRQMno`)
    let text = await res.json()
    console.log(text);
  }

  useEffect(() => {
    createCard();
    getIpfsData();
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>Bounty Title</h2>
          <p>
            Bounty description
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
