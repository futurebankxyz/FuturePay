import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider"
import Authereum from "authereum";
import Fortmatic from "fortmatic";

import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Layer,
  ResponsiveContext,
  Paragraph,
  Footer,
  Text,
  Anchor,
  Nav,
} from "grommet";
import {
  FormClose,
  Notification,
  Send,
  Home,
  Upgrade,
  Money,
  Transaction,
} from "grommet-icons";
import { MAINNET_ID, addresses, abis } from "@loopring-pay/contracts";

import { ethers } from "ethers";
import { useQuery } from "@apollo/react-hooks";

import { GET_LENDING_POOL_CONFIGURATION_HISTORY_ITEMS } from './constantes/calls/GraphQL';


const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "xxsmall" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

const theme = {
  global: {
    colors: {
      brand: "#333333",
      light: "#ffffff",
      pink: "#ff66c4",
    },
    font: {
      family: "Tomorrow",
      size: "18px",
      height: "20px",
    },
  },
};


async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = ethers.getDefaultProvider();
  // Create an instance of ethers.Contract
  // Read more about ethers.js on https://docs.ethers.io/ethers.js/html/api-contract.html
  const aDAIContract = new ethers.Contract(addresses[MAINNET_ID].tokens.aDAI, abis.aToken, defaultProvider);
  const LRCContract = new ethers.Contract(addresses[MAINNET_ID].tokens.LRC, abis.lrcToken, defaultProvider);
  // A pre-defined address that owns some cDAI tokens
  const LRCBalance = await LRCContract.balanceOf(
    "0x6cd71d6cb7824add7c277f2ca99635d98f8b9248"
  );
  const aDAIBalance = await aDAIContract.balanceOf("0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C");
  console.log({ aDAIBalance: aDAIBalance.toString() });
  console.log({ LRCBalance: LRCBalance.toString() });
}




const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "c44fac7726a64d5bbbb3a1c51f02d75b", // required
    },
  },
  authereum: {
    package: Authereum,
    options: {},
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: "pk_live_897928FEA44622C4", // required
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
});

function App() {

  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const getWeb3 = async () => {
    console.log('getting web3')
    let provider = null
    if (window.ethereum) {
      provider = window.ethereum
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        alert("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, try modal
    else {
      provider = await web3Modal.connect()
    }
    setProvider(provider)
    const web3 = new Web3(provider)
    setWeb3(web3)
    const accounts = await web3.eth.getAccounts()
    setAccounts(accounts)
    window.ethereum.on("accountsChanged", async function() {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts)
    });    
  }
  useEffect(() => {
    getWeb3();
  }, []);

  const { loading, error, data } = useQuery(GET_LENDING_POOL_CONFIGURATION_HISTORY_ITEMS);
  const [showSidebar, setShowSidebar] = useState(false);

  React.useEffect(() => {
  
    if (!loading && !error && data && data.lendingPoolConfigurationHistoryItems) {
      console.log({ lendingPoolConfigurationHistoryItems: data.lendingPoolConfigurationHistoryItems });
    }
  }, [loading, error, data]);
  

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box fill>
            <AppBar>
              <Heading level="3" margin="none" align="center" color="pink">
                LoopringPay
              </Heading>
              <Button
                icon={<Notification color="pink" />}
                onClick={() => getWeb3()}
              />
            </AppBar>
            <Box
              direction="row"
              flex
              overflow={{ horizontal: "hidden" }}
              pad="medium"
              background={{
                color: "brand",
                // image:"url('https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')",
              }}
            >
              <Box flex align="center" justify="center">
                <Box
                  align="center"
                  pad="2/4"
                  background={{
                    "0": "b",
                    "1": "r",
                    "2": "a",
                    "3": "n",
                    "4": "d",
                    color: "white",
                    position: "bottom",
                    image:
                      "url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1987&q=80')",
                  }}
                  round="medium"
                  elevation="xlarge"
                  margin="medium"
                  direction="column"
                  alignSelf="center"
                  animation={{ type: "fadeIn", size: "medium" }}
                >
                  <Box
                    align="start"
                    justify="start"
                    pad="large"
                    direction="row"
                    alignSelf="start"
                  ></Box>
                  <Heading
                    level="3"
                    margin="none"
                    color="pink"
                    align="center"
                    justify="center"
                  >
                    FutureBank
                  </Heading>
                  <Box
                    align="center"
                    justify="center"
                    pad="medium"
                    margin="xsmall"
                    color="#fff"
                  >
                    <Box
                      onClick={() => getWeb3()}
                      align="center"
                      justify="center"
                      pad="large"
                      margin="medium"
                      background={{
                        dark: false,
                        image:
                          "url('https://avatars2.githubusercontent.com/u/60450216?s=200&v=4')",
                      }}
                      round="full"
                    />
                    <div id="prepare">
                      <Button
                        primary
                        uppercase
                        label="Connect Wallet"
                        color="pink"
                        pad="auto"
                      />
                    </div>
                    <Paragraph
                      size="small"
                      margin="medium"
                      textAlign="center"
                      background="pink"
                    ></Paragraph>
                  </Box>
                </Box>
              </Box>
              {!showSidebar || size !== "small" ? (
                <Collapsible direction="horizontal" open={showSidebar}>
                  <Box
                    flex
                    width="medium"
                    background="light-2"
                    elevation="small"
                    align="center"
                    justify="center"
                  >
                    sidebar
                  </Box>
                </Collapsible>
              ) : (
                <Layer>
                  <Box
                    background="light-2"
                    tag="header"
                    justify="end"
                    align="center"
                    direction="row"
                  >
                    <Button
                      icon={<FormClose />}
                      onClick={() => setShowSidebar(false)}
                    />
                  </Box>
                  <Box
                    fill
                    background="light-2"
                    align="center"
                    justify="center"
                  >
                    sidebar
                  </Box>
                </Layer>
              )}
            </Box>
            <Box align="center" pad="medium" background="brand">
              <Nav direction="row" pad="medium">
                <Anchor icon={<Send />} color="pink" hoverIndicator />
                <Anchor icon={<Home />} color="pink" hoverIndicator />
                <Anchor icon={<Transaction />} color="pink" hoverIndicator />
                <Anchor icon={<Upgrade />} color="pink" hoverIndicator />
                <Anchor icon={<Money />} color="pink" hoverIndicator />
              </Nav>
            </Box>
            <Footer background="brand" pad="medium">
              <Text>FuturePay | @codingsh</Text>
              <Anchor
                label="Donate"
                href="https://gitcoin.co/grants/646/gitcoin-developer-grant-codignsh"
              />
            </Footer>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;