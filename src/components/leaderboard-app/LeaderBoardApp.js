import React from "react";
import './LeaderboardApp.css'
import {Box, Flex, Heading, Loader} from "monday-ui-react-core";
import GreenBoardCreator from "../greenboard-creator/GreenBoardCreator";
import {UserContext} from "../../context/userContext";
import {fetchBoardService, findGreenBoardService} from "../../services/mondayService";
import getEmissionStatus from "../../utils/statusMapper";


class LeaderBoardApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { board: {}, boardId: -1};
    }

    componentDidMount() {
        this.findBoardId()
    }

    findBoardId =  () => {

        findGreenBoardService("Green Board").then((boardId)=>{
            if (boardId === null) {

            } else if (boardId === 'ComplexityException') {
                setTimeout(() => {
                    this.findBoardId()
                }, 10000);
            } else {
                this.context.setBoardId(boardId);
                if (boardId === -1) this.setState({boardId: 0})
                else {
                    this.setState({boardId: boardId}, ()=>{
                        this.fetchBoard(boardId)
                    });

                }
            }
        });



    }

    fetchBoard = async (boardId) => {

        const res = await fetchBoardService(boardId);
        if (res === null){

        } else if (res === 'ComplexityException'){
            setTimeout(()=> this.fetchBoard(boardId), 10000)
        } else if (res === -1){
            console.log("fetchBoard(): Board not found")
        } else {
            this.setState({board: res})
        }

    };

    renderCell = (board, column, item) => {
        const columnValue = item.column_values.find((columnValue) => columnValue.id === column.id);
        return column.type === "name" ? item.name : columnValue && columnValue.text;
    };

    getStatusColor = (cfp) => {
        const status = getEmissionStatus(cfp)
        if ( status=== 'Average') return "yellow"
        else if (status === 'Bad') return "red"
        else if (status === 'Good' || status === 'Great') return "green";
        return "gray";
    }

    renderItem = (color, board, item, index) => {
        const {columns} = board;
        const colorClass = this.getStatusColor(parseFloat(item.column_values[2].text))
        return (
                <div key={index} className="item">
                    {columns.map((column, index) => (
                        column.type === "name" ?
                            <div key={index} className="task-leaderboard"
                                 style={{borderLeft: `thick solid #057e4c`}}>{this.renderCell(board, column, item)}</div> :
                            column.id === "person" ?
                                <div key={index}/>:
                                column.id === "eco_status"?
                                    <div key={index} className={`cell-leaderboard ${colorClass}`}>{this.renderCell(board, column, item)}</div>:
                                    <div key={index} className="cell-leaderboard">{this.renderCell(board, column, item)}</div>

                    ))}
                </div>
        );
    };

    renderGroup = (board, group, index) => {
        const {columns} = board;
        return (
            <div key={index} className="group">
                <Heading type={Heading.types.h2} style={{color: "#057e4c"}} value={board.name}/>
                <Flex>
                    {columns.map((column, index) => (
                        column.type === "name" ?
                            <div key={index} className="task-leaderboard">Person</div> :
                            column.type !== "multiple-person" ?
                                <div key={index} className="cell-leaderboard">{column.title}</div> : <div key={index}/>
                    ))}
                </Flex>

                <div
                    className="row">{group.items.map((item, index) => this.renderItem(group.color, board, item, index))}
                </div>
            </div>
        );
    };

    getColumnValue(item, columnId) {
        return item.column_values.find((columnValue) => columnValue.id === columnId) || {};
    }

    getGroups = (board) => {
        const groupByColumnId =  null;

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
        const groups = this.getGroups(board);

        return (
            <div key={board.id} className="board" >
                <div className="board-groups">{groups.map((group, index) => this.renderGroup(board, group, index))}</div>
            </div>
        );
    };

    renderLoadingScreen = () => {
        return (
            <Box paddingX={Box.paddingXs.LARGE} margin={Box.margins.XL}>
                <Flex>
                    <Heading type={Heading.types.h1} value="Loading leaderboard..." brandFont/>
                    <Loader size={20}/>
                </Flex>
            </Box>
        );
    }

    renderBoardCreationScreen = () => {
        return (
            <div>
                <GreenBoardCreator findBoardId={this.findBoardId.bind(this)}/>
            </div>
        );
    }

    renderGreenBoard = () => {
        return (
            <Box paddingX={Box.paddingXs.MEDIUM} margin={Box.margins.XL}>
                <Heading type={Heading.types.h1} value="Green leaderboard" brandFont/>
                {Object.keys(this.state.board).length !== 0 ?
                <Box style={{minWidth: '50%'}} padding={Box.paddings.LARGE} border={Box.borders.DEFAULT}
                     rounded={Box.roundeds.MEDIUM}>
                    { this.renderBoard(this.state.board) }
                </Box>: <div/>}

            </Box>
        )
    }

    render() {
        return (
            <div className="monday-app">
                {this.state.boardId === -1 ?
                    this.renderLoadingScreen() : this.state.boardId === 0 ? this.renderBoardCreationScreen() :
                        this.renderGreenBoard()}

            </div>
        );
    }
}

LeaderBoardApp.contextType = UserContext;

export default LeaderBoardApp;
