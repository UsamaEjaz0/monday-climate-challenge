import React from "react";
import './leaderboardApp.css'
import mondaySdk from "monday-sdk-js";
import {AttentionBox, Box, Clickable, Flex, Heading, Loader} from "monday-ui-react-core";
import Leaderboard from "./leaderboard-helper/leaderboard";

const monday = mondaySdk();

class LeaderBoardApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {settings: {}, context: {}, boards: [], boardId: -1};
    }

    componentDidMount() {
        monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');
        monday.listen("settings", this.getSettings);
        // monday.listen("context", this.getContext);
        this.findBoardId()
    }

    getSettings = (res) => {
        this.setState({settings: res.data});
    };

    // getContext = (res) => {
    //     this.setState({context: res.data}, this.findBoardId);
    // };

    findBoardId = () => {
        monday.api(
            `query {
                  boards {
                    id
                    name
                    
                  }
                }`
        ).then((res) => {
            const board = res.data.boards.find(board => board.name === "Green Board");
            if (typeof board !== 'undefined') {
                this.setState({boardId: board.id}, this.fetchBoard)
                console.log(`Board Exists with ID: ${board.id}`);


            } else {
                console.log(`Board Doesn't exist}`);
                this.setState({boardId: 0})
            }

        });


    }

    fetchBoard = () => {
        const query = `
                query {
                  
                  
                  boards(ids: ${this.state.boardId}) {
                    name
                    
                    columns {
                      title
                      id
                      type
                    }
                    
                    groups {
                      title
                      color
                      id
                    }
                    
                    items {
                      name
                      group {
                        id
                      }
                      
                      column_values {
                        id
                        value
                        text
                      }
                    }
                  }
                } 
                
                `;
        monday.api(query)
            .then((res) => this.setState({boards: res.data.boards}));
    };

    renderCell = (board, column, item) => {
        const columnValue = item.column_values.find((columnValue) => columnValue.id === column.id);
        return column.type === "name" ? item.name : columnValue && columnValue.text;
    };

    renderItem = (color, board, item) => {
        const {columns} = board;
        return (

            <Clickable className="item" onClick={() => monday.execute('openItemCard', {itemId: item.id})}>
                <div className="item">
                    {columns.map((column) => (
                        column.type === "name" ?
                            <div className="task-leaderboard"
                                 style={{borderLeft: `thick solid ${color}`}}>{this.renderCell(board, column, item)}</div>
                            :
                            <div className="cell-leaderboard">{this.renderCell(board, column, item)}</div>
                    ))}
                </div>
            </Clickable>
        );
    };

    renderGroup = (board, group) => {
        const {columns} = board;
        return (
            <div className="group">
                <Flex>
                    {columns.map((column) => (
                        column.type === "name" ?
                            <div className="task-leaderboard">{group.title}</div> : <div className="cell-leaderboard">{column.title}</div>
                    ))}
                </Flex>
                <div
                    className="group-items">{group.items.map((item) => this.renderItem(group.color, board, item))}</div>
            </div>
        );
    };

    getColumnValue(item, columnId) {
        return item.column_values.find((columnValue) => columnValue.id === columnId) || {};
    }

    getGroups = (board) => {
        const {settings} = this.state;
        const {groupByColumn} = settings;
        const groupByColumnId = groupByColumn ? Object.keys(groupByColumn)[0] : null;

        const groups = {};
        for (const item of board.items) {
            const groupId = groupByColumnId ? this.getColumnValue(item, groupByColumnId).text : item.group.id;
            if (!groups[groupId]) {
                const groupTitle = groupByColumnId ? groupId : board.groups.find((group) => group.id === groupId).title;
                const groupColor = groupByColumnId ? groupId : board.groups.find((group) => group.id === groupId).color;
                groups[groupId] = {items: [], id: groupId, title: groupTitle, color: groupColor};
            }
            groups[groupId].items.push(item);
        }

        return Object.values(groups);
    };

    renderBoard = (board) => {
        const {settings} = this.state;
        const groups = this.getGroups(board);

        return (
            <div className="board" style={{background: settings.color}}>
                <Heading type={Heading.types.h2} value={board.name}/>
                <div className="board-groups">{groups.map((group) => this.renderGroup(board, group))}</div>
            </div>
        );
    };

    renderLoadingScreen = () => {
        return (
            <div className="center-item">
                <Flex direction={Flex.directions.COLUMN}>
                    <Heading type={Heading.types.h1} value="Loading leaderboard..."/>
                    <Loader  size={40} />
                </Flex>

            </div>
        );
    }

    renderBoardCreationScreen = () => {
        return (
            <div>

                <Leaderboard/>

            </div>
        );
    }

    renderGreenBoard = () => {
        return (
            <div>
                <Heading className="center-item" type={Heading.types.h1} value="Green leaderboard"/>
                {this.state.boards.map((board) => {
                    return <Box style={{minWidth: '50%'}} padding={Box.paddings.LARGE} border={Box.borders.DEFAULT}
                                rounded={Box.roundeds.MEDIUM}
                                margin={Box.margins.LARGE}>
                        {this.renderBoard(board)}
                    </Box>;
                })}
            </div>

        )
    }

    render() {
        return (
            <div className="monday-app">
                {this.state.boardId === -1 ?
                    this.renderLoadingScreen() : this.state.boardId === 0 ? this.renderBoardCreationScreen() :
                       this.renderGreenBoard()
                }

            </div>
        );
    }
}

export default LeaderBoardApp;
