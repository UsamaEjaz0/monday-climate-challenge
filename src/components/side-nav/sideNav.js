import React from "react";
import "./sideNav.css";
import "monday-ui-react-core/dist/main.css"

import {Divider, Heading, List, ListItem, ListItemIcon, Search} from "monday-ui-react-core";
import {Add, Board, Filter} from "monday-ui-react-core/icons";
import View from "../../enums/view";


class SideNav extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // TODO: set up event listeners
    }


    render() {
        var handleToUpdate = this.props.handleToUpdate;
        return <div className="side-nav">
            <Heading type={Heading.types.h1} value="App Name"/>

            {/*<Divider></Divider>*/}
            <Search
                placeholder="Search"
            />

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
                <ListItem >
                    Eco Points
                </ListItem>
                <ListItem onClick={() => handleToUpdate(View.TAKE_ACTION)}>
                    Take Action
                </ListItem>
                <ListItem>
                    FAQs
                </ListItem>
                <ListItem>
                    Others
                </ListItem>
            </List>
        </div>;
    }
}

export default SideNav;
