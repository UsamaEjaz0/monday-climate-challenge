import React from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css"

import {Flex, Icon} from "monday-ui-react-core";
import BoardList from "./components/board-list/BoardList";
import View from "./enums/view";
import CFPCalculator from "./components/CFPCalculator/CFPCalculator";
import LeaderBoardApp from "./components/leaderboard-app/LeaderBoardApp";
import TakeAction from "./components/TakeAction/TakeAction";
import SideNav from "./components/side-nav/SideNav";
import Widget from "./components/Widget/Widget";



class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleToUpdate.bind(this);
        this.state = {
            settings: {},
            name: "",
            view: 2,
            matches: window.matchMedia("(min-width: 650px)").matches
        };
    }

    componentDidMount() {
        const handler = e => this.setState({matches: e.matches});
        window.matchMedia("(min-width: 650px)").addEventListener('change', handler);
    }

    handleToUpdate(someArg) {
        this.setState({view: someArg});
    }


    renderView = () => {
        if (this.state.view === View.SENTIMENT_ANALYSIS) {
            return <div className="column right-nav">
                <Flex direction={Flex.directions.COLUMN} align={Flex.align.STRETCH} >
                    <BoardList/>
                </Flex>
            </div>
        } else if (this.state.view === View.CFP_CALCULATOR) {
            return <div className="column right-nav">

                <CFPCalculator/>
            </div>
        } else if (this.state.view === View.GREEN_BOARD) {
            return <div className="column right-nav">
                <LeaderBoardApp/>
            </div>
        } else if (this.state.view === View.TAKE_ACTION) {
            return <div className="column right-nav">
                <TakeAction/>
            </div>
        }

    }

    render() {
        const handleToUpdate = this.handleToUpdate;

        return  this.state.matches ?<div>
            <div className="column left-nav">
                <Flex direction={Flex.directions.COLUMN} align={Flex.align.STRETCH} >
                    <SideNav handleToUpdate={handleToUpdate.bind(this)}/>
                </Flex>
            </div>
            {this.renderView()}
        </div> : <Widget></Widget>

    }
}

export default App;
