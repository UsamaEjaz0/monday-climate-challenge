import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"

import {Avatar, Divider, Flex, Heading, Icon, List, ListItem, ListItemIcon, Search} from "monday-ui-react-core";
import BoardList from "./components/board-list/boardList";
import {Add, Board, DropdownChevronDown, Filter} from "monday-ui-react-core/icons";
import SideNav from "./components/side-nav/sideNav";
import CFPCalculator from "./components/CFPCalculator";

const monday = mondaySdk();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: {},
            name: "",
        };
    }

    componentDidMount() {
        // TODO: set up event listeners
    }

    render() {
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

            {/*<div className="column left">*/}
            {/*    <Flex direction={Flex.directions.COLUMN} align={Flex.align.STRETCH} justify={Flex.justify.STRETCH}>*/}
            {/*        <SideNav></SideNav>*/}
            {/*    </Flex>*/}
            {/*</div>*/}
            {/*<div className="column right">*/}
            {/*        <Flex direction={Flex.directions.COLUMN} align={Flex.align.STRETCH} justify={Flex.justify.STRETCH}>*/}
            {/*            /!*<Heading style={{textAlign: "center"}} type={Heading.types.h1} value="Is my work eco-friendly?"/>*!/*/}
            {/*            <BoardList></BoardList>*/}
            {/*        </Flex>*/}
            {/*</div>*/}
            <CFPCalculator></CFPCalculator>


        </div>;
    }
}

export default App;
