# Blockchain dApp
<hr>
compile token:
```truffle compile```

it will add artifacts (.json) to src/abis directory

<hr>
migrate using terminal commend:
```truffle migrate```
<hr>
to see deployed token run truffle console:
```truffle console```

and in console :
```const token = await Token.deployed()```
```token```, ```token.address``` , ```token.name()```

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
