import React from "react";
import "./boardList.css";
import mondaySdk from "monday-sdk-js";
import {Box, Clickable, Flex, Heading, Label, List, ListItem} from "monday-ui-react-core";
import Board from "../board/board";
import {Col, Row} from "antd";

const monday = mondaySdk();

class BoardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {settings: {}, context: {}, me: {}, boards: []};
    }

    componentDidMount() {
        monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');
        monday.listen("settings", this.getSettings);
        monday.listen("context", this.getContext);
    }

    getSettings = (res) => {
        this.setState({settings: res.data});
    };

    getContext = (res) => {
        this.setState({context: res.data}, this.fetchBoards);
    };

    fetchBoards = () => {
        const {context} = this.state;
        monday.api(
            `query {
                  
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
            .then((res) => this.setState({ boards: res.data.boards}));
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

export default BoardList;
