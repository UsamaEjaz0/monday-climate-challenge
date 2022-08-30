import React, {useState} from "react";
import "./SideNav.css";
import "monday-ui-react-core/dist/main.css"
import { Heading, List, ListItem, Search } from "monday-ui-react-core";
import View from "../../enums/view";

const items = [
    ["Analyze Work", View.SENTIMENT_ANALYSIS],
    ["Carbon Footprint", View.CFP_CALCULATOR],
    ["Green Board", View.GREEN_BOARD],
    ["Take Action", View.TAKE_ACTION]
]

function SideNav(props) {
    var handleToUpdate = props.handleToUpdate;
    const [currentItems, setCurrentItems] = useState(items)

    const filterList = (item) => {
        if (item === "") {
            setCurrentItems(items)
            return
        }

        let filtered = []
        for (let i = 0; i < items.length; i++) {
            if (items[i][0].toLowerCase().includes(item.toLowerCase())) {
                filtered.push([items[i][0], items[i][1]])
            }
        }
        setCurrentItems(filtered)
    }

    const displayList = currentItems.map((listItem) =>
        <ListItem onClick={() => handleToUpdate(listItem[1])}>
            {listItem[0]}
        </ListItem>
    )

    return <div className="side-nav">
        <Heading type={Heading.types.h1} value="App Name" brandFont />
        <Search placeholder="Search" onChange={filterList}/>
        <List>{displayList}</List>
    </div>;
}

export default SideNav;
