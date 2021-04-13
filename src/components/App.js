import {Tab, Tabs} from 'react-bootstrap'
import dBank from '../abis/dBank.json'
import React, {Component} from 'react';
import Token from '../abis/Token.json'
import dbank from '../dbank.png';
import Web3 from 'web3';
import './App.css';

class App extends Component {

    async componentWillMount() {
        await this.loadBlockchainData(this.props.dispatch)
    }

    async loadBlockchainData(dispatch) {

        //check if MetaMask exists
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            const netId = await web3.eth.net.getId()
            const accounts = await web3.eth.getAccounts()

            console.log(netId)
            console.log(accounts[0])

            //check if account is detected, then load balance&setStates, else push alert
            if (typeof accounts[0] !== 'undefined') {

                const balance = await web3.eth.getBalance(accounts[0])
                console.log(web3.utils.fromWei(balance))

                //assign to values to variables: web3, netId, accounts
                this.setState({account: accounts[0], balance: balance, web3: web3})

            } else {
                window.alert('Please login with Metamask')
            }

            //in try block load contracts
            try {
                const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)

                const dbankAddress = dBank.networks[netId].address
                const dbank = new web3.eth.Contract(dBank.abi, dbankAddress)

                const tokenName = await token.methods.name().call()
                console.log(tokenName)

                const isDeposited = await dbank.methods.isDeposited(this.state.account).call()
                console.log(isDeposited)

                this.setState({
                    token: token, dbank: dbank, dBankAddress: dbankAddress,
                    tokenName: tokenName
                })

                await this.balance()
                await this.checkDepositState()

            } catch (e) {
                console.log('Error occurred during token initialisation', e)
                window.alert('Fail to deploy contracts')
            }

        } else {
            //if MetaMask not exists push alert
            window.alert('Please install MetaMask')
        }
    }

    async deposit(amount) {
        console.log("Amount to deposit: " + amount)

        try {
            await this.state.dbank.methods.deposit().send({value: amount.toString(), from: this.state.account})
            await this.balance()
            await this.checkDepositState()

        } catch (e) {
            console.log('Error during deposit: ', e)
        }
    }

    async withdraw(e) {
        //prevent button from default click
        e.preventDefault()

        try {
            await this.state.dbank.methods.withdraw().send({from: this.state.account})
            await this.balance()
            await this.checkDepositState()

        } catch (e) {
            console.log('Error during withdraw: ', e)
        }
    }

    async balance() {
        const balance = await this.state.token.methods.balanceOf(this.state.account).call()
        this.setState({content: balance})
        console.log(balance)
    }

    async checkDepositState() {
        const isDeposited = await this.state.dbank.methods.isDeposited(this.state.account).call()
        if (isDeposited) {
            this.setState({depositState: "deposited"})
        } else {
            this.setState({depositState: "not deposited"})
        }
        console.log(isDeposited)
    }

    constructor(props) {
        super(props)
        this.state = {
            web3: 'undefined',
            account: '',
            token: null,
            dbank: null,
            balance: 0,
            dBankAddress: null
        }
    }

    render() {
        return (
            <div className='text-monospace'>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a
                        className="navbar-brand col-sm-3 col-md-2 mr-0"
                        href="http://lukksarna.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={dbank} className="App-logo" alt="logo" height="32"/>
                        <b>dBank</b>
                    </a>
                </nav>
                <div className="container-fluid mt-5 text-center">
                    <br/>
                    <h1>Hello to my World</h1>
                    <h2>{this.state.account}</h2>
                    <br/>
                    <div className="row">
                        <main role="main" className="col-lg-12 d-flex text-center">
                            <div className="content mr-auto ml-auto">
                                <Tabs defaultActiveKey="deposit" id="uncontrolled-tab-example">
                                    <Tab title="Deposit" eventKey="deposit">
                                        <div>
                                            <br/>
                                            How much to deposit?
                                            <br/>
                                            <br/>
                                            Min amount is 0.01 ETH
                                            <br/>
                                            1 deposit at the time
                                            <br/>
                                            <form onSubmit={(e) => {
                                                e.preventDefault()
                                                let amount = this.depositAmount.value
                                                //convert to WEI
                                                amount = amount * 10 ** 18
                                                this.deposit(amount)
                                            }}>
                                                <div className='form-group mr-sm-2'>
                                                    <br/>
                                                    <input
                                                        id='depositAmount'
                                                        step='0.0001'
                                                        type={'number'}
                                                        className={'form-control form-control-md'}
                                                        placeholder={'amount..'}
                                                        required
                                                        ref={(input) => {
                                                            this.depositAmount = input
                                                        }}
                                                    />
                                                </div>
                                                <button type={'submit'} className={'btn btn-primary'}> DEPOSIT</button>
                                            </form>
                                        </div>
                                    </Tab>
                                    <Tab title="Withdraw" eventKey="withdraw">
                                        <div>
                                            <br/>
                                            Do you want to withdraw?
                                            <br/>
                                            <br/>
                                            <button type={'submit'} className={'btn btn-primary'}
                                                    onClick={(e) => this.withdraw(e)}> Withdraw
                                            </button>
                                        </div>
                                    </Tab>
                                    <Tab title="Balance" eventKey="balance">
                                        <br/>
                                        Your balance of {this.state.tokenName} is:
                                        <br/>
                                        <br/>
                                        <div><strong>{this.state.content}</strong></div>
                                    </Tab>
                                </Tabs>
                                <br/>
                                <br/>
                                <br/>
                                <div>Deposit state: {this.state.depositState}</div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
