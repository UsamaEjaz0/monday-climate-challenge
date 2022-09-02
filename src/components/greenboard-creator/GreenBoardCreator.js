import React from "react";
import {AttentionBox, Box, Button, Flex, Heading, LinearProgressBar} from "monday-ui-react-core";

import "./GreenBoardCreator.css";
import 'monday-ui-react-core/dist/main.css';
import {findById} from "../../services/userDataService";
import {UserContext} from "../../context/userContext";
import {
    findGreenBoardService,
    createGreenBoardService,
    deleteGroupService,
    createGroupAndColumnsService,
    createItemService
} from "../../services/mondayService";
import getEmissionStatus from "../../utils/statusMapper";

class GreenBoardCreator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            loading: false,
            progressVal: 0,
            currentAction: "Initializing...",
        }
    }

    findGreenBoard = async (boardName) => {
        this.setState({progressVal: 10, currentAction: "Checking board existence..."})
        this.setState({loading: true})
        const boardId = await findGreenBoardService("Green Board");
        if (boardId === null) {
            this.setState({progressVal: 10, currentAction: "Something went wrong"})
        } else if (boardId === 'ComplexityException') {
            this.setState({currentAction: "Error in finding board, retying..."})
            setTimeout(() => {
                this.findGreenBoard(boardName)
            }, 10000);
        } else {
            this.context.setBoardId(boardId);
            if (boardId === -1) await this.createGreenBoard(boardId);
        }
    }

    createGreenBoard = async () => {

        this.setState({progressVal: 20, currentAction: "Creating board..."})
        const boardId = await createGreenBoardService();
        if (boardId === null) {
            this.setState({progressVal: 20, currentAction: "Something went wrong"})
        } else if (boardId === 'ComplexityException') {
            this.setState({currentAction: "Error in finding creating board, retying..."})
            setTimeout(() => {
                this.createGreenBoard()
            }, 10000);
        } else {
            await this.deleteGroup("topics", boardId)
            this.context.setBoardId(boardId);
        }
    };

    deleteGroup = async (groupId, boardId) => {

        this.setState({progressVal: 40, currentAction: "Deleting top group..."});
        const res = await deleteGroupService(groupId, boardId);
        if (res == null) {
            this.setState({progressVal: 40, currentAction: "Something went wrong"})
        } else if (res === 'ComplexityException') {
            this.setState({currentAction: "Error in finding deleting top group, retying..."})
            setTimeout(() => {
                this.deleteGroup(groupId, boardId)
            }, 10000);
        } else {
            await this.createGroupAndColumns(boardId);
        }

    }

    createGroupAndColumns = async (boardId) => {

        this.setState({progressVal: 70, currentAction: "Creating group and columns..."})
        const res = await createGroupAndColumnsService(boardId);
        if (res == null) {
            this.setState({progressVal: 70, currentAction: "Something went wrong"})
        } else if (res === 'ComplexityException') {
            this.setState({currentAction: "Error in creating groups & columns, retying..."})
            setTimeout(() => {
                this.createGroupAndColumns(boardId)
            }, 10000);
        } else {
            const res = await findById(this.context.id);
            if (res == null) {
                this.setState({progressVal: 70, currentAction: "Something went wrong"})
            } else {
                const userInDb = res.data.document;
                let user = {
                    id: this.context.id,
                    name: this.context.name,
                    cfp: 0,
                    points: 0,
                    status: ""
                }
                if (userInDb != null) {
                    user = {
                        ...user,
                        ...userInDb
                    }
                }
                console.log(user)
                user.status = getEmissionStatus(parseFloat(user.cfp));
                await this.createItem(user, "ranking", boardId);
            }
        }
    }



    createItem = async (user, groupId, boardId) => {

        this.setState({progressVal: 85, currentAction: "Inserting user..."})
        const res = await createItemService(user, groupId, boardId);
        if (res == null) {
            this.setState({currentAction: "Inserting user..."})
        } else if (res === 'ComplexityException') {
            this.setState({currentAction: "Error in inserting user, retying..."})
            setTimeout(() => {
                this.createItem(user, groupId, boardId)
            }, 10000);
        } else {
            this.setState({progressVal: 100})
        }
    }


    render() {
        return (
            <div className="leaderboard">
                <Box padding={Box.paddings.LARGE} border={Box.borders.DEFAULT}
                     rounded={Box.roundeds.MEDIUM}
                     margin={Box.margins.LARGE}>
                    {this.state.loading ?
                        <Heading type={Heading.types.h1} value={this.state.currentAction} brandFont/> :
                        <AttentionBox className="attention-box"
                                      description="Danger"
                                      onClose={function noRefCheck() {
                                      }}
                                      text="You have not created a leaderboard. Please create a leaderboard and try again."
                                      title="Leaderboard not found"
                        />}
                    {this.state.progressVal < 100 ?
                        <Flex>
                            {this.state.loading ? <LinearProgressBar value={this.state.progressVal}
                                                                     size={LinearProgressBar.sizes.LARGE}
                                                                     barStyle={LinearProgressBar.styles.POSITIVE}/>
                                : <Button onClick={ () => {
                                     this.findGreenBoard("Green Board")
                                }
                                }>Create Board</Button>
                            }
                        </Flex>
                        : <div>{this.props.findBoardId()}</div>
                    }
                </Box>
            </div>
        );
    }
}

GreenBoardCreator.contextType = UserContext;

export default GreenBoardCreator;
