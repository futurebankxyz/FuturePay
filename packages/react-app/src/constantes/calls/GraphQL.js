import { gql } from "apollo-boost";

const UNISWAP_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap';
const ENS_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';
const AAVE_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/aave/protocol';
const COMPOUND_ENDPOINT ='https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2';
const MOLOCH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/molochventures/moloch';


export const GET_LENDING_POOL_CONFIGURATION_HISTORY_ITEMS = gql`
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