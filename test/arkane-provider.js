const Ganache = require('ganache-core');
const expect = require('chai').expect;
const ArkaneSubProvider = require('../../../FundRequest/ArcanePrivate/truffle-arkane-provider/arkane-sub-provider');
const Arkane = require('../../../FundRequest/ArcanePrivate/truffle-arkane-provider/arkane-api');
const sinon = require("sinon");

describe("Arkane Provider", async function () {
  const port = 8545;
  let server;
  let provider;

  before(done => {
    server = Ganache.server();
    server.listen(port, done);
  });

  after(done => {
    setTimeout(() => server.close(done), 1);
  });

  it('should correctly return address from Arkane API', async function () {
    let stub = sinon.stub(Arkane.prototype, 'getWallets').returns(Promise.resolve(
      {
        status: 200,
        data: {
          success: true,
          result: {
            wallets: [
              {
                address: "0x627306090abab3a6e1400e9345bc60c78a8bef57",
                walletId: 'walletId'
              }
            ]
          }
        }
      }
    ));

    provider = new ArkaneSubProvider("azerty", `http://192.168.1.214:8080`);


    return await provider.getAccounts(function (a, b) {
      expect(b).to.eql(["0x627306090abab3a6e1400e9345bc60c78a8bef57"]);
      stub.restore();
    });
  });

  it('should correctly sign a transaction', async function () {
    let stub = sinon.stub(Arkane.prototype, 'sign').returns(Promise.resolve(
      {
        status: 200,
        data: {
          success: true,
          result: {
            signedTransaction: '0x000000000'
          }
        }
      }
    ));

    provider = new ArkaneSubProvider("azerty", `http://192.168.1.214:8080`);


    return await provider.signTransaction({
      gasPrice: 0,
      gasLimit: 21000,
      to: 0,
      value: 12000,
      data: 15,
    }, function (a, b) {
      expect(b).to.eql("0x000000000");
      stub.restore();
    });
  });
});