import React from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css"

import {Flex} from "monday-ui-react-core";
import BoardList from "./components/board-list/BoardList";
import View from "./enums/view";
import CFPCalculator from "./components/carbon-footprint-calculator/CFPCalculator";
import LeaderBoardApp from "./components/leaderboard-app/LeaderBoardApp";
import TakeAction from "./components/take-action/TakeAction";
import SideNav from "./components/side-nav/SideNav";
import Widget from "./components/widget/Widget";
import News from "./components/news/News";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();


class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleToUpdate.bind(this);
        this.state = {
            viewMode: "widget",
            name: "",
            view: 2,
            matches: window.matchMedia("(min-width: 650px)").matches
        };
    }

    componentDidMount() {

        const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s"
        // const TOKEN2 = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3ODY4NTYzNiwidWlkIjozMzY3MDEwMCwiaWFkIjoiMjAyMi0wOS0wMVQxNTowOToyMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.KyArAeAxG2O6-RdVW1jf4QLRXheyD2eGhR-pekPpKPU";
        monday.setToken(TOKEN);
        monday.listen("context", this.setContext);
        const handler = e => this.setState({matches: e.matches});
        window.matchMedia("(min-width: 650px)").addEventListener('change', handler);
    }

    setContext = (res) => {
        if (res.data.viewMode !== this.state.viewMode){
            this.setState({viewMode: res.data.viewMode})
        }
    };

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
        }else if (this.state.view === View.NEWS) {
            return <div className="column right-nav">
                <News/>
            </div>
        }

    }

    render() {
        const handleToUpdate = this.handleToUpdate;

        return this.state.viewMode === "widget"?  <Widget/> :
        <div>
            <div className="column left-nav">
                <Flex direction={Flex.directions.COLUMN} align={Flex.align.STRETCH} >
                    <SideNav handleToUpdate={handleToUpdate.bind(this)}/>
                </Flex>
            </div>
            {this.renderView()}
        </div>


    }
}

export default App;
