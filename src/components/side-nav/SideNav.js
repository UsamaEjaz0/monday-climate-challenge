import React from "react";
import "./SideNav.css";
import "monday-ui-react-core/dist/main.css"
import { Heading, List, ListItem, Search } from "monday-ui-react-core";
import View from "../../enums/view";

function SideNav(props) {
    var handleToUpdate = props.handleToUpdate;
    return <div className="side-nav">
        <Heading type={Heading.types.h1} value="App Name" brandFont />
        <Search placeholder="Search"/>
        <List>
            <ListItem onClick={() => handleToUpdate(View.SENTIMENT_ANALYSIS)}>
                Analyze Work
            </ListItem>
            <ListItem onClick={() => handleToUpdate(View.CFP_CALCULATOR)}>
                Carbon Footprint

            </ListItem >
            <ListItem onClick={() => handleToUpdate(View.GREEN_BOARD)}>
                Green Board
            </ListItem>
            <ListItem onClick={() => handleToUpdate(View.TAKE_ACTION)}>
                Take Action
            </ListItem>
        </List>
    </div>;
}

export default SideNav;
