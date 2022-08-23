import React from "react";
import "./sideNav.css";
import "monday-ui-react-core/dist/main.css"

import {Divider, Heading, List, ListItem, ListItemIcon, Search} from "monday-ui-react-core";
import {Add, Board, Filter} from "monday-ui-react-core/icons";


class SideNav extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // TODO: set up event listeners
    }


    render() {
        return <div className="side-nav">
                <Heading type={Heading.types.h1} value="App Name"/>

                {/*<Divider></Divider>*/}
                    <Search
                        placeholder="Search"
                    />

                <List>
                    <ListItem>
                        Analyze Work
                    </ListItem>
                    <ListItem>
                        Carbon Footprint
                    </ListItem>
                    <ListItem>
                        Eco Points
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
