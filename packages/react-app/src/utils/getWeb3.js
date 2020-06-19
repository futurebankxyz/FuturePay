import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Authereum from 'authereum';
import Fortmatic from "fortmatic";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "c44fac7726a64d5bbbb3a1c51f02d75b",
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

const getWeb3 = () => (
  new Promise(async(resolve, reject) => {
    try {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        theme: "dark",
        providerOptions
      })
      web3Modal.clearCachedProvider()

      const provider = await web3Modal.connect()
      let web3 = new Web3(provider)

      resolve(web3)
    } catch(e){
      resolve(e)
    }
  })
);

export default getWeb3;