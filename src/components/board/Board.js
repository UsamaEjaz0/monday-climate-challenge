import React, {useEffect, useState} from "react";
import "./Board.css";
import {Flex, Heading, Skeleton} from "monday-ui-react-core";
import {fetchBoardService} from "../../services/mondayService";
import Item from "./item/Item";


function Board(props) {

    const [render, setRender] = useState(false);
    const [board, setBoard] = useState({});


    useEffect(()=>{
        fetchBoard(props.boardId)
    }, [])

    function fetchBoard(boardId) {
        fetchBoardService(boardId).then((res) => {
            if (res == null){
                console.log("Something went wrong")
            }else if (res === 'ComplexityException'){
                setTimeout(()=> {
                    fetchBoard(boardId)
                }, 15000)
            }else if (res === -1){
                console.log("Board not found")
            }
            else {
                setBoard(res);
                setRender(true);
            }

        });

    }
    const renderItem = (color, item, sentiment) => {
        return (
            <Item color={color} item={item} sentiment={sentiment}/>
        );
    };

    const renderGroup = (board, group) => {
        return (
            <div className="group">
                <Heading style={{color: group.color}} type={Heading.types.h5} value={group.title}/>
                <Flex direction={Flex.directions.ROW}>
                    {<div className="task">Task</div>}
                    {<div className="sentiment">Sentiment</div>}
                </Flex>
                <div className="group-items">{group.items.map((item) => {

                    return renderItem(group.color, item, "N/A")
                })}</div>
            </div>
        );
    };

    function getColumnValue(item, columnId) {
        return item.column_values.find((columnValue) => columnValue.id === columnId) || {};
    }

    const getGroups = (board) => {
        const groupByColumnId = null;

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

    const renderGroups = () => {
        const groups = getGroups(board);
        return <div className="board-groups">
            <Heading type={Heading.types.h2} value={board.name} />
            {groups.map((group) => renderGroup(props.board, group))}
        </div>
    }

    return (
        <div className="board">
            {render ? renderGroups() : <div>
                <Skeleton type="text"/>
                <p/>
                <Skeleton width={2000}/>
            </div>}
        </div>
    );
}

export default Board
