Truffle Arkane Wallet Provider
===

Arkane Wallet-enabled Web3 Provider. 

### Install

```
npm i @arkane-network/truffle-arkane-provider
```

### General Usage

```
var ArkaneProvider = require("@arkane-network/truffle-arkane-provider");

var provider = new ArkaneProvider({
    apiKey: 'my-api-key', //mandatory
    baseUrl: 'https://api.arkane.network',
    providerUrl: 'http://localhost:8545'
);

```

### Truffle Usage

You can easily use this from within a truffle configuration

```
var ArkaneProvider = require("@arkane-network/truffle-arkane-provider");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () =>
        new ArkaneProvider({
            apiKey: 'my-api-key',
            baseUrl: 'https://api.arkane.network',
            providerUrl: 'https://ropsten.infura.io'
        }),
      network_id: '3',
    }
  }
};
```

![Documentation](https://github.com/ArkaneNetwork/content-management/blob/master/gifs/installation.gif?raw=true)