import React from "react";
import "./Leaderboard.css";
import mondaySdk from "monday-sdk-js";
import {AttentionBox, Box, Button, Flex, Heading, LinearProgressBar} from "monday-ui-react-core";
import 'monday-ui-react-core/dist/main.css';
import {findByIds, updateRecord} from "../../../services/userDataService";
import {UserContext} from "../../../userContext";

// import {UserContext} from "../../../userContext";

const monday = mondaySdk();

class Leaderboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            context: {},
            boardId: -1,
            users: [],
            groupId: null,
            column_ids: [],
            item_ids: {},
            boards: [],
            success: false,
            loading: false,
            progressVal: 0,
            currentAction: "Initializing...",
            test: true
        }

    }

    componentDidMount() {
        monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');
        monday.listen("context", this.getContext);

    }

    getContext = (res) => {
        this.setState({context: res.data});
    };

    syncBoardData = () => {
        this.setState({loading: true})
        monday.api(
            `query {
                  users {
                  id
                  name
                  }
                  boards {
                    id
                    name
                  }
                }`
        ).then((res) => {
            if ('error_code' in res) {
                if (res.error_code === 'ComplexityException') {
                    throw 'Complexity Exception'
                }
            }
            this.setState({progressVal: 20, currentAction: "Creating board..."})
            this.setState({boards: res.data.boards, users: res.data.users}, () => {
                console.log(this.state.boards);
                const board = this.state.boards.find(board => board.name === "Green Board");

                if (typeof board !== 'undefined') {
                    this.setState({boardId: board.id,}, this.createBoard)
                    console.log(`Board Exists with ID: ${board.id}`);
                    this.context.setBoardId(board.id);
                } else {
                    console.log(`Board Doesn't exist}`);
                    this.setState({boardId: -1}, this.createBoard)

                }
            })
        }).catch((res) => {
            this.setState({success: false, currentAction: "Error in fetching data - Retrying"});
            setTimeout(this.syncBoardData, 10000);
        });
    }

    createBoard = () => {
        const userIds = this.state.users.map(user => parseInt(user.id))
        if (this.state.boardId !== -1) {
            console.log("Board already exists !")
        } else {
            const query = `mutation {
                        create_board (board_name: "Green Board", board_kind: public, board_subscriber_ids: [${userIds}]) {
                            id
                            }
                        }`;

            monday.api(query)
                .then((res) => {
                    if ('error_code' in res) {
                        if (res.error_code === 'ComplexityException') {
                            console.log("Here")
                            throw 'Complexity Exception'
                        }
                    }
                    console.log(res);
                    this.setState({progressVal: 40, currentAction: "Created board..."})
                    this.setState({boardId: res.data.create_board.id}, this.getTopGroup);
                    this.context.setBoardId(res.data.create_board.id);
                }).catch((res) => {
                this.setState({success: false, currentAction: "Error in creating board - Retrying "});
                setTimeout(this.createBoard, 10000);
            });
        }
    };

    getTopGroup = () => {
        const query = `query{
              boards (ids: ${this.state.boardId}){
                top_group {
                  id
                }
              }
            }`

        monday.api(query)
            .then((res) => {
                if ('error_code' in res) {
                    if (res.error_code === 'ComplexityException') {
                        console.log("Here")
                        throw 'Complexity Exception'
                    }
                }
                this.setState({progressVal: 50, currentAction: "Finding top group..."})
                this.deleteGroup(res.data.boards[0].top_group.id);
            }).catch((res) => {
            this.setState({success: false, currentAction: "Error in finding top group - Retrying "});
            setTimeout(this.getTopGroup, 10000);
        });
    }

    deleteGroup = (groupId) => {
        const query = `mutation {
                    delete_group (board_id: ${this.state.boardId}, group_id: ${groupId}) {
                        id
                    }
                }`

        monday.api(query)
            .then((res) => {
                if ('error_code' in res) {
                    if (res.error_code === 'ComplexityException') {
                        console.log("Here")
                        throw 'Complexity Exception'
                    }
                }
                this.setState({progressVal: 60, currentAction: "Deleting top group..."})
                console.log(res);
                this.createGroupAndColumns();
            }).catch((res) => {
            this.setState({success: false, currentAction: "Error in deleting group - Retrying"});
            setTimeout(() => {
                this.deleteGroup(groupId)
            }, 10000);
        });
    }

    createGroupAndColumns = () => {
        const query = `mutation {
                    create_group: create_group (board_id: ${this.state.boardId}, group_name: "Ranking") {
                        id
                    }
                    person: create_column(board_id: ${parseInt(this.state.boardId)}, title:"Person", description: "Person's profile picture", column_type:people) {
                        id
                      }
                 
                      eco_points: create_column(board_id: ${parseInt(this.state.boardId)}, title:"Eco Points", description: "Points gained by being green", column_type:text) {
                        id
                      }
                      carbon_emissions:create_column(board_id: ${parseInt(this.state.boardId)}, title:"Carbon Emissions", description: "Carbon emissions", column_type:text) {
                        id
                      }
                }`
        monday.api(query)
            .then((res) => {

                console.log(res);
                if ('error_code' in res) {
                    if (res.error_code === 'ComplexityException') {
                        console.log("Here")
                        throw 'Complexity Exception'
                    }
                }
                this.setState({progressVal: 70, currentAction: "Creating group and columns..."})
                this.setState({groupId: res.data.create_group.id, column_ids: res.data}, async () => {
                    const userInBoardIds = this.state.users.map((user) => user.id.toString());
                    const userRes = await findByIds(userInBoardIds);
                    const usersInDb = userRes.data.documents;

                    const allUsers = this.state.users.map((user) => {
                        console.log(user)
                        const userInDb = usersInDb.filter(obj => {
                            return obj.id === user.id.toString()
                        })
                        if (userInDb.length === 0) {
                            return {
                                ...user,
                                cfp: 0,
                                points: 0
                            }
                        } else return {
                            name: user.name,
                            cfp: 0,
                            points: 0,
                            ...userInDb[0]
                        };
                    })

                    console.log(allUsers)

                    Promise.all(allUsers.map(async (user, index) => await this.createItem(user))).then((items) => {
                        console.log(items);
                    });
                });

            }).catch((res) => {
            this.setState({success: false, currentAction: "Error creating group & columns - Retrying"});
            setTimeout(this.createGroupAndColumns, 10000);
        });
    }

    createItem = async (user) => {
        const query = `mutation {
                create_item (board_id: ${this.state.boardId}, group_id: "${this.state.groupId}", item_name: "${user.name}", 
                        column_values: "{ \\"person\\" : {\\"personsAndTeams\\":[{\\"id\\":${user.id},\\"kind\\":\\"person\\"}]}, \\"eco_points\\" : \\"${user.points}\\", \\"carbon_emissions\\" : \\"${user.cfp}\\" }" ) {
                            id
                }
        }`

        try {

            const res = await monday.api(query);
            console.log(res)
            if ('error_code' in res) {
                if (res.error_code === 'ComplexityException') {
                    console.log("Here")
                    throw 'Complexity Exception'
                }
            }
            const item = res.data.create_item.id;

            console.log(user);
            await updateRecord({
                id: user.id.toString(),
                name: user.name,
                itemId: item.toString(),
                cfp: user.cfp,
                points: user.points
            })


            const insertionProgress = 30 / this.state.users.length
            this.setState(previousState => ({
                progressVal: previousState.progressVal + insertionProgress,
                currentAction: "Creating items..."
            }))

            return res

        } catch (e) {
            this.setState({success: false, currentAction: "Error creating item - Retrying"});
            setTimeout(() => {
                this.createItem(user)
            }, 10000);
        }

    }


    render() {
        return (
            <div className="leaderboard">
                <Box style={{minWidth: '50%'}} padding={Box.paddings.LARGE} border={Box.borders.DEFAULT}
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
                    {this.state.progressVal < 99.5 ?
                        <Flex>
                            {this.state.loading ?
                                <LinearProgressBar value={this.state.progressVal} size={LinearProgressBar.sizes.LARGE}
                                                   barStyle={LinearProgressBar.styles.POSITIVE}/>
                                : <Button onClick={this.syncBoardData} loading={this.state.loading}>
                                    Create Board
                                </Button>}
                        </Flex>
                        : <div>{this.props.findBoardId()}</div>

                    }
                </Box>
            </div>
        );
    }

}
Leaderboard.contextType = UserContext;

export default Leaderboard;
