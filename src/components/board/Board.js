import React from "react";
import "./Board.css";
import mondaySdk from "monday-sdk-js";
import {Clickable, Flex, Heading, Label} from "monday-ui-react-core";

const monday = mondaySdk();

export default function Board(props) {

    const renderItem = (color, board, item) => {
        return (
            <Clickable className="item" onClick={() => monday.execute('openItemCard', {itemId: item.id})}>
                <div className="task" style={{borderLeft: `thick solid ${color}`}} >{item.name}</div>
                <Label className="sentiment" text="Neutral" color={Label.colors.POSITIVE}/>
            </Clickable>
        );
    };

    const renderGroup = (board, group) => {
        return (
            <div className="group">
                <Heading className={{}} style={{color: group.color}} type={Heading.types.h5} value={group.title}/>
                <Flex direction={Flex.directions.ROW}>
                    {<div className="task">Task</div>}
                    {<div className="sentiment">Sentiment</div>}
                </Flex>

                <div
                    className="group-items">{group.items.map((item) => renderItem(group.color, board, item))}</div>
            </div>
        );
    };

    function getColumnValue(item, columnId) {
        return item.column_values.find((columnValue) => columnValue.id === columnId) || {};
    }

    const getGroups = (board) => {
        const {groupByColumn} = props.settings;
        const groupByColumnId = groupByColumn ? Object.keys(groupByColumn)[0] : null;

        const groups = {};
        for (const item of board.items) {
            const groupId = groupByColumnId ? getColumnValue(item, groupByColumnId).text : item.group.id;
            if (!groups[groupId]) {
                const groupTitle = groupByColumnId ? groupId : board.groups.find((group) => group.id === groupId).title;
                const groupColor = groupByColumnId ? groupId : board.groups.find((group) => group.id === groupId).color;
                groups[groupId] = {items: [], id: groupId, title: groupTitle, color: groupColor};
            }
            groups[groupId].items.push(item);
        }

        return Object.values(groups);
    };


    const groups = getGroups(props.board);
    return (
        <div className="board">
            <Heading type={Heading.types.h2} value={props.board.name}/>
            <div className="board-groups">{groups.map((group) => renderGroup(props.board, group))}</div>
        </div>
    );
}
