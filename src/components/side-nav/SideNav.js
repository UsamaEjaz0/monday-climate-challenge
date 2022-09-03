import React, {useState} from "react";
import "./SideNav.css";
import "monday-ui-react-core/dist/main.css"
import {Heading, List, ListItem, Search} from "monday-ui-react-core";
import View from "../../enums/view";


function SideNav(props) {
    const [selected, setSelected] = useState(0);
    const handleToUpdate = props.handleToUpdate;
    const items = [
        ["Carbon Footprint", View.CFP_CALCULATOR],
        ["Green Board", View.GREEN_BOARD],
        ["Take Action", View.TAKE_ACTION],
        ["News", View.NEWS],
        ["Analyze Work", View.SENTIMENT_ANALYSIS],
    ]
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

    const displayList = () => {
        return <List>
            {currentItems.map((listItem, index) =>
                <ListItem key={index.toString()} selected={index === selected} size={ListItem.sizes.MEDIUM}
                          className="ellipsis"
                          onClick={() => {
                              setSelected(index);
                              handleToUpdate(listItem[1])
                          }}>

                    {listItem[0]}
                </ListItem>
            )}

        </List>
    }


    return <div className="side-nav">
        <Heading type={Heading.types.h1} value="Climatio" brandFont/>
        <Search className="search" placeholder="Search" onChange={filterList} size={Search.sizes.MEDIUM}/>
        <p/>
        {displayList()}
    </div>;
}

export default SideNav;
