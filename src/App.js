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
// import {neg_tweets, neutral_tweets, positive_tweets} from "./data";
// import * as fs from "fs";
// const { Classifier } = require('ml-classify-text')


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
        // const classifier = new Classifier()
        // let positive = positive_tweets;
        //
        // let negative = neg_tweets;
        // let neutral = neutral_tweets;
        //
        // console.log("Training")
        // classifier.train(positive, 'positive')
        // classifier.train(negative, 'negative')
        // classifier.train(neutral, 'neutral')
        // console.log("Trained")
        // classifier.model = require('./model-new.json')
        // let predictions = classifier.predict('Man has no significant effect on climate! Hence the name change from global warming hoax to climate change hoax')
        // if (predictions.length) {
        //     predictions.forEach(prediction => {
        //         console.log(`${prediction.label} (${prediction.confidence})`)
        //     })
        // } else {
        //     console.log('No predictions returned')
        // }
    }

    exportToTxt = (data) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
            type: "text/plain"
        }));
        a.setAttribute("download", "model-new.txt");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
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
