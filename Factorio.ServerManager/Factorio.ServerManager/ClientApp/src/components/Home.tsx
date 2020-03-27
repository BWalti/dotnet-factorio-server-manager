import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import * as signalR from "@microsoft/signalr";
import { ApplicationState } from "../store/index";
import * as FactorioServer from "../store/FactorioServer";

type HomeProps =
    FactorioServer.FactorioServerState &
    typeof FactorioServer.actionCreators &
    RouteComponentProps<{}>;

class Home extends React.PureComponent<HomeProps> {
    connection: any;

    // This method is called when the component is first added to the document
    componentDidMount() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/hub")
            .build();

        this.connection.on("messageReceived", (args: any) => {
            console.log(args);
            //    //this.setState();
            //    //divMessages.appendChild(m);
            //    //divMessages.scrollTop = divMessages.scrollHeight;
        });
    }

    render() {
        return (
            <div>
                <div className="input-zone">
                    <label id="lblMessage" htmlFor="tbMessage">Message:</label>
                    <input id="tbMessage" className="input-zone-input" type="text"/>
                    
                    <button type="button"
                            className="btn btn-primary btn-lg"
                            onClick={() => { this.props.requestServerState(); }}>
                        Request Server State
                    </button>
                </div>
            </div>
        );
    }
}
    
export default connect(
    (state: ApplicationState) => state.serverState, 
    FactorioServer.actionCreators
)(Home as any);