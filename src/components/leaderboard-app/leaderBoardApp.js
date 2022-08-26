import React from "react";
import "./leaderboardApp.css";
import mondaySdk from "monday-sdk-js";
import {Box, Clickable, Flex, Heading, Label, List, ListItem} from "monday-ui-react-core";
import Board from "../board/board";
import {Col, Row} from "antd";

const monday = mondaySdk();

class LeaderBoardApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {settings: {}, context: {}, me: {}, boards: []};
    }

    componentDidMount() {
        monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');
        monday.listen("context", this.getContext);
    }

    getSettings = (res) => {
        this.setState({settings: res.data});
    };

    getContext = (res) => {
        this.setState({context: res.data}, this.fetchBoard);
    };

    isBoardCreated = () => {
        const boardId = 3148729906;
        const {context} = this.state;
        return context.boardIds.include(boardId)
    }

    fetchBoard = () => {
        const {context} = this.state;

        if (this.isBoardCreated()){
            monday.api(
                `query {
                  me {
                    name
                  }
                  
                  boards(ids:[${context.boardIds}]) {
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
                      id
                      name
                      group {
                        id
                      }
                     
                    }
                  }
                } 
    `
            )
                .then((res) => this.setState({me: res.data.me, boards: res.data.boards}));
        }
        else{
            console.log("Board doesn't exist")
        }


    };


    renderItem = (color, board, item) => {

        return (
            <Clickable className="item" onClick={() => monday.execute('openItemCard', {itemId: item.id})}>

                <div className="task" style={{borderLeft: `thick solid ${color}`}} >{item.name}</div>
                <Label className="sentiment" text="Neutral" color={Label.colors.POSITIVE}/>
                {/*{<div className="sentiment">Neutral</div>}*/}
            </Clickable>
        );
    };

    renderGroup = (board, group) => {
        return (
            <div className="group">
                <Heading className={{}} style={{color: group.color}} type={Heading.types.h5} value={group.title}/>
                <Flex direction={Flex.directions.ROW}>
                    {<div className="task">Task</div>}
                    {<div className="sentiment">Sentiment</div>}
                </Flex>

                <div
                    className="group-items">{group.items.map((item) => this.renderItem(group.color, board, item))}</div>
            </div>
        );
    };

    getColumnValue(item, columnId) {
        return item.column_values.find((columnValue) => columnValue.id == columnId) || {};
    }

    getGroups = (board) => {
        const {groupByColumn} = this.props.settings;;
        const groupByColumnId = groupByColumn ? Object.keys(groupByColumn)[0] : null;

        const groups = {};
        for (const item of board.items) {
            const groupId = groupByColumnId ? this.getColumnValue(item, groupByColumnId).text : item.group.id;
            if (!groups[groupId]) {
                const groupTitle = groupByColumnId ? groupId : board.groups.find((group) => group.id == groupId).title;
                const groupColor = groupByColumnId ? groupId : board.groups.find((group) => group.id == groupId).color;
                groups[groupId] = {items: [], id: groupId, title: groupTitle, color: groupColor};
            }
            groups[groupId].items.push(item);
        }

        return Object.values(groups);
    };

    render() {
        return (
            <div className="monday-app">

                {/*<Row gutter={[16, 16]}>*/}
                {/*    {this.state.boards.map((board) => {*/}
                {/*        return <Col span={8}> <Box padding={Box.paddings.LARGE} border={Box.borders.DEFAULT} rounded={Box.roundeds.MEDIUM}*/}
                {/*                    margin={Box.margins.LARGE}>*/}
                {/*            {<Board board={board} settings={this.state.settings}/>}*/}
                {/*        </Box> </Col>;*/}
                {/*    })}*/}
                {/*</Row>*/}
                {/*<Row gutter={[16, 16]}>*/}
                {/*    <Col span={6} />*/}
                {/*    <Col span={6} />*/}
                {/*    <Col span={6} />*/}
                {/*    <Col span={6} />*/}
                {/*</Row>*/}
                {/*<Flex direction={Flex.directions.ROW}>*/}
                    {this.state.boards.map((board) => {
                        return <Box style={{minWidth: '50%'}} padding={Box.paddings.LARGE} border={Box.borders.DEFAULT} rounded={Box.roundeds.MEDIUM}
                                    margin={Box.margins.LARGE}>
                            {<Board board={board} settings={this.state.settings}/>}
                        </Box>;
                    })}
                {/*</Flex>*/}


            </div>
        );
    }


}

export default LeaderBoardApp;
