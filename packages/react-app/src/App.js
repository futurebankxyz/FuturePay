import React from "react";
import logo from "./ethereumLogo.png";
import { MAINNET_ID, addresses, abis } from "@aave-app/contracts";
import { gql } from "apollo-boost";
import { ethers } from "ethers";
import { useQuery } from "@apollo/react-hooks";
import "./App.css";

const GET_LENDING_POOL_CONFIGURATION_HISTORY_ITEMS = gql`
  {
    lendingPoolConfigurationHistoryItems(first: 5) {
      id
      provider {
        id
      }
      lendingPool
      lendingPoolCore
    }
  }
`;

async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = ethers.getDefaultProvider();
  // Create an instance of ethers.Contract
  // Read more about ethers.js on https://docs.ethers.io/ethers.js/html/api-contract.html
  const aDAIContract = new ethers.Contract(addresses[MAINNET_ID].tokens.aDAI, abis.aToken, defaultProvider);
  // A pre-defined address that owns some cDAI tokens
  const aDAIBalance = await aDAIContract.balanceOf("0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C");
  console.log({ aDAIBalance: aDAIBalance.toString() });
}

function App() {
  const { loading, error, data } = useQuery(GET_LENDING_POOL_CONFIGURATION_HISTORY_ITEMS);

  React.useEffect(() => {
    if (!loading && !error && data && data.lendingPoolConfigurationHistoryItems) {
      console.log({ lendingPoolConfigurationHistoryItems: data.lendingPoolConfigurationHistoryItems });
    }
  }, [loading, error, data]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="react-logo" />
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>
        {/* Remove the "display: none" style and open the JavaScript console in the browser to see what this function does */}
        <button onClick={() => readOnChainData()} style={{ display: "none" }}>
          Read On-Chain Balance
        </button>
        <a
          className="App-link"
          href="https://ethereum.org/developers/#getting-started"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: "0px" }}
        >
          Learn Ethereum
        </a>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <a className="App-link" href="https://developers.aave.com/" target="_blank" rel="noopener noreferrer">
          Learn Aave
        </a>
      </header>
    </div>
  );
}

export default App;
