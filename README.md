# Blockchain dApp
<hr>
compile token:

```truffle compile```

it will add artifacts (.json) to src/abis directory

<hr>
migrate using terminal commend:

```truffle migrate```

if remigrating use:

```truffle migrate --reset```

<hr>
to see deployed token run truffle console:

```truffle console```

and in console :

```const token = await Token.deployed()```

```token```

```token.address```

```token.name()```

<hr>
Check Ganache running accounts addresses and balances:
```const accounts = await web3.eth.getAccounts()```

```account = accounts[0]```

```const accountBalance = await web3.eth.getBalance(account)```

```accountBalance.toString()```

check how much decimals have tokens:

```dec = await token.decimals()```

```dec.toString()```

convert from Wei to Eth:

```web3.utils.fromWei(accountBalance)```

convert from ETH to Wei:

```web3.utils.toWei('98,99')```

mint tokens to account:

```token.mint(account, web3.utils.toWei('100'))```

check balance of account in created "Token.sol" token:
(should have 100 as "toWei" function converted '100' into 18 decimal number)

```tokenBalance = await token.balanceOf(account)```

```tokenBalance.toString()```

check total supply in created token (should be 100):

```totalSupply = await token.totalSupply()```

```web3.utils.fromWei(totalSupply)```

<hr>
start tests with:

```truffle test```

<hr>
If problem with contract not having networks in migrated .json then do:

```truffle migrate --reset```

<hr>

## Run Web server

```npm run start```

Metamask have to be connected to site:

```open metamask > 3 dots on right > Connected sites > add site```

then ```web3.eth.getAccounts()``` can see metamask accounts

<hr>

How to find token address:

open abis/Toked.json and search for:

```"address": "```
<hr>

To get contract address:

```Token.networks[netId].address```

to get token name:

```await token.methods.name().call()```

convert Wei to ETH:

```web3.utils.fromWei(balance)```

convert ETH to WEI
```web3.utils.toWei(balance)```


test
