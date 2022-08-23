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

                <List>
                    <Search
                        placeholder="Placeholder text here"
                        wrapperClassName="monday-storybook-search_size"
                    />
                    <ListItem>
                        <ListItemIcon icon={Add} />

                    </ListItem>
                    <ListItem>
                        <ListItemIcon icon={Filter} />
                        Filter
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemIcon icon={Board} />
                        Board name
                    </ListItem>
                    <ListItem>
                        <ListItemIcon icon={Board} />
                        Board name
                    </ListItem>
                    <ListItem>
                        <ListItemIcon icon={Board} />
                        Board name
                    </ListItem>
                </List>
            </div>;
    }
}

export default SideNav;
