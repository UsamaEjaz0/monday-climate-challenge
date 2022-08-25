import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"

import {Avatar, Divider, Flex, Heading, Icon, List, ListItem, ListItemIcon, Search} from "monday-ui-react-core";
import BoardList from "./components/board-list/boardList";
import {Add, Board, DropdownChevronDown, Filter} from "monday-ui-react-core/icons";
import SideNav from "./components/side-nav/sideNav";
import CFPCalculator from "./components/CFPCalculator";
import View from "./enums/view";
import Leaderboard from "./components/leaderboard/leaderboard";

const monday = mondaySdk();

class App extends React.Component {
    constructor(props) {
        super(props);
        var handleToUpdate = this.handleToUpdate.bind(this);
        this.state = {
            settings: {},
            name: "",
            view: 1
        };
    }
    handleToUpdate(someArg){
        this.setState({view:someArg});
    }

    componentDidMount() {
        // TODO: set up event listeners
    }

    renderView = () => {
        if (this.state.view === View.SENTIMENT_ANALYSIS){
            return <div className="column right-nav">
                <Flex direction={Flex.directions.COLUMN} align={Flex.align.STRETCH} justify={Flex.justify.STRETCH}>
                    {/*<Heading style={{textAlign: "center"}} type={Heading.types.h1} value="Is my work eco-friendly?"/>*/}
                    <BoardList></BoardList>
                </Flex>
            </div>
        }
        else if (this.state.view === View.CFP_CALCULATOR){
            return <div className="column right-nav">
                <CFPCalculator></CFPCalculator>
            </div>
        }

    }

    render() {
        var handleToUpdate = this.handleToUpdate;
        return <div >

            {/*<Flex direction={Flex.directions.ROW} align={Flex.align.STRETCH} >*/}

            {/*    <SideNav/>*/}
            {/*/!*<div >*!/*/}
            {/*    <Flex direction={Flex.directions.COLUMN} align={Flex.align.CENTER} justify={Flex.justify.CENTER}>*/}
            {/*        <Heading type={Heading.types.h1} value="Is my work eco-friendly?"/>*/}
            {/*        <BoardList></BoardList>*/}
            {/*    </Flex>*/}
            {/*/!*</div>*!/*/}

            {/*</Flex>*/}

            {/*<div className="column left-nav">*/}
            {/*    <Flex direction={Flex.directions.COLUMN} align={Flex.align.STRETCH} justify={Flex.justify.STRETCH}>*/}
            {/*        <SideNav handleToUpdate = {handleToUpdate.bind(this)}></SideNav>*/}
            {/*    </Flex>*/}
            {/*</div>*/}
            {/*{this.renderView()}*/}
            <Leaderboard></Leaderboard>


        </div>;
    }
}

export default App;
