import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"

import {Flex} from "monday-ui-react-core";
import BoardList from "./components/board-list/BoardList";
import SideNav from "./components/side-nav/SideNav";
import View from "./enums/view";
import CFPCalculator from "./components/CFPCalculator/CFPCalculator";
import LeaderBoardApp from "./components/leaderboard-app/LeaderBoardApp";
import TakeAction from "./components/TakeAction/TakeAction";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleToUpdate.bind(this);
        this.state = {
            settings: {},
            name: "",
            view: 1
        };
    }

    handleToUpdate(someArg) {
        this.setState({view: someArg});
    }

    componentDidMount() {
        // TODO: set up event listeners
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
        return <div>
            <div className="column left-nav">
                <Flex direction={Flex.directions.COLUMN} align={Flex.align.STRETCH} >
                    <SideNav handleToUpdate={handleToUpdate.bind(this)}/>
                </Flex>
            </div>
            {this.renderView()}


        </div>;
    }
}

export default App;
