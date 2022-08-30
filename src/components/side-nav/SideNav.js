import React, {useState} from "react";
import "./SideNav.css";
import "monday-ui-react-core/dist/main.css"
import {Heading, Label, List, ListItem, Search} from "monday-ui-react-core";
import View from "../../enums/view";

const items = [

    ["Carbon Footprint", View.CFP_CALCULATOR],
    ["Green Board", View.GREEN_BOARD],
    ["Take Action", View.TAKE_ACTION],
    ["Analyze Work", View.SENTIMENT_ANALYSIS],
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
        <ListItem  className="ellipsis" onClick={() => handleToUpdate(listItem[1])}>
            {listItem[0]} &nbsp; {listItem[0] === "Analyze Work" ?
            <Label text="Beta" />: <div></div>}
        </ListItem>
    )

    return <div className="side-nav">
        <Heading type={Heading.types.h1} value="Climatio" brandFont />
        <Search placeholder="Search" onChange={filterList}/>
        <p/>
        <List>{displayList}</List>
    </div>;
}

export default SideNav;
