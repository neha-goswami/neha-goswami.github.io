import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import { Helmet } from 'react-helmet';
import { Button, NavBar, WingBlank, WhiteSpace, InputItem, List } from 'antd-mobile';

import RepCounter from './RepCounter';
import './style.css';
import GlobalStyle from './global-styles';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: 10,
            weight: 0,
            endpoint: "18.216.79.215:4001",
            username: "",
            tracking: false
        };
    }

    componentDidMount() {
        const {endpoint} = this.state;
        //Very simply connect to the socket
        const socket = socketIOClient(endpoint);
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        socket.on("outgoing rep", data => this.setState({response: data.num}));
        socket.on("outgoing weight", data => this.setState({weight: data.num}));
    }

    render() {
        const {response, username, tracking} = this.state;
        return (
            <div >
                <div>
                    <Helmet>
                        <title>Rep Counter</title>
                        <meta name="description" content="A Balans AI application rep counter" />
                    </Helmet>
                    <div>
                    <NavBar mode="dark" style={{ padding: '10px 0px' , 
                                                 textAlign: "center" ,
                                                 backgroundColor: '#03a1fc'}}>
                        <h1>
                            <span
                            role="img"
                            aria-label="Weight Lifter"
                            style={{ marginRight: '10px' }}>🏋️</span>‍Balans
                        </h1>
                    </NavBar>
                    <WhiteSpace size="lg" />
                    <WingBlank>
                        {(!username & !tracking)? (
                            <div className="informational">
                                Please enter your name to get started
                                <br />
                            </div>
                        ) : (!tracking) ? (
                            <div className="success">
                                <div>Nice to meet you, {username}.</div>
                                <div>Click to start tracking
                                    <span role="img" aria-label="Weight Lifter">  💪</span>
                                </div>
                            </div>
                        ) : (<div></div>)}
                    
                    </WingBlank>
                    </div>
                <div>
                    {tracking?  
                    (<RepCounter repCount={this.state.response} weight={this.state.weight} />)
                    : (<div><InputItem
                        type="text"
                        placeholder="Input your name"
                        style={{ fontSize: '22px',
                                 textAlign: 'center'}}
                        onChange={newname => this.setState({username: newname})}
                        disabled={tracking}
                        value={username}
                    >Name</InputItem>
                    <div class="clearfix"></div>
                    <WhiteSpace size="lg" />
                    <div>
                        <Button type="primary" onClick={() => this.setState({tracking: true})}>
                            Track bench press
                        </Button>
                        <WhiteSpace />
                    </div></div>) }
                </div>
            </div>
            <GlobalStyle />
        </div>
        )
    }
}

export default App;
