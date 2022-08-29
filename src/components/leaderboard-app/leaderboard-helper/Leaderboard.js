import React from "react";
import "./Leaderboard.css";
import mondaySdk from "monday-sdk-js";
import {AttentionBox, Box, Button, Flex, Heading, LinearProgressBar} from "monday-ui-react-core";
import 'monday-ui-react-core/dist/main.css';
import {findByIds, updateRecord} from "../../../services/userDataService";

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

    data = {
        "users": [
            {
                "": ""
            },
            {}
        ],

        "board_id": -1
    }

    componentDidMount() {
        monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3Nzg1NTE2MywidWlkIjozMzM4NzkzMywiaWFkIjoiMjAyMi0wOC0yOFQyMzo0NDo0MC42OTlaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.u7GMxmr8IbGIG-XIb4McmLKfSZ6cPTLQGL6uHtxnbCc');
        monday.listen("context", this.getContext);
        this.setState({boardId: this.data.board_id})
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
                    console.log("Here")
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

                } else {
                    console.log(`Board Doesn't exist}`);
                    this.setState({boardId: -1}, this.createBoard)
                }
            })
        }).catch((res) => {
            this.setState({success: false, currentAction: "Error in fetching data - Retrying"});
            setTimeout(this.syncBoardData, 5000);
        });
    }

    createBoard = () => {
        const userIds = this.state.users.map(user => parseInt(user.id))
        if (this.state.boardId !== -1) {
            console.log("Board already exists !")
            // this.getTopGroup()
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
                }).catch((res) => {
                this.setState({success: false, currentAction: "Error in creating board - Retrying "});
                setTimeout(this.createBoard, 5000);
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
            setTimeout(this.getTopGroup, 5000);
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
            }, 5000);
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
                        const userInDb = usersInDb.filter(obj => {
                            return obj.id === user.id.toString()
                        })
                        if (userInDb.length === 0) {
                            return {
                                ...user,
                                cfp: 0,
                                points: 0
                            }
                        } else return userInDb[0];
                    })
                    allUsers.sort(function (a, b) {
                        let x = a["points"];
                        let y = b["points"];
                        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                    });
                    console.log(allUsers)
                    Promise.all(allUsers.map(async (user, index) => await this.createItem(user, index + 1))).then((items) => {
                        console.log(items);
                    });
                });

            }).catch((res) => {
            this.setState({success: false, currentAction: "Error creating group & columns - Retrying"});
            setTimeout(this.createGroupAndColumns, 5000);
        });
    }

    // updateAllItems = async () => {
    //     const userIds = this.state.users.map((user) => user.id.toString());
    //     const res = await findByIds(userIds);
    //     const users = res.data.documents;
    //
    //     users.sort(function(a, b) {
    //         let x = a["points"]; let y = b["points"];
    //         return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    //     });
    //
    //     console.log(users);
    //     users.map((user, index) => this.updateItem(user, user.itemId, index+1));
    // }
    createItem = async (user, ranking) => {


        const query = `mutation {
                create_item (board_id: ${this.state.boardId}, group_id: "${this.state.groupId}", item_name: "${ranking}", 
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

            const updatedRes = await updateRecord({
                id: user.id.toString(),
                itemId: item.toString()
            })

            if (updatedRes.modifiedCount === 0) {
                await updateRecord({
                    id: user.id.toString(),
                    cfp: 0,
                    itemId: item.toString(),
                    points: 0,
                })
            }
            // this.setState({item_ids: {...this.state.item_ids, [`${user.id}`] : item}})

            const insertionProgress = 30 / this.state.users.length
            this.setState(previousState => ({
                progressVal: previousState.progressVal + insertionProgress,
                currentAction: "Creating items..."
            }))

            return res

        } catch (e) {
            this.setState({success: false, currentAction: "Error creating item - Retrying"});
            setTimeout(() => {
                this.createItem(user, ranking)
            }, 5000);
        }

    }

    // updateItem = async (user, itemId, ranking) => {
    //     if (user != null) {
    //         const query = `
    //                 mutation {
    //                   change_multiple_column_values(item_id:${parseInt(itemId)}, board_id:${this.state.boardId}, column_values: "{\\"name\\" : \\"${ranking}\\", \\"eco_points\\" : \\"${user.points}\\", \\"carbon_emissions\\" : \\"${user.cfp}\\"}") {
    //                     id
    //                   }
    //                 }`
    //         monday.api(query)
    //             .then((res) => {
    //                 if ('error_code' in res){
    //                     if (res.error_code === 'ComplexityException'){
    //                         console.log("Here")
    //                         throw 'Complexity Exception'
    //                     }
    //                 }
    //                 // eslint-disable-next-line no-unused-vars
    //                 const id = res.data.change_multiple_column_values.id
    //                 const insertionProgress = 15 / this.state.users.length
    //                 this.setState({progressVal: this.state.progressVal + insertionProgress, currentAction: "Inserting data..."},  console.log(this.state.progressVal))
    //
    //             }).catch((res) => {
    //             this.setState({success: false, currentAction: "Error inserting data - Retrying"});
    //             setTimeout(() => {
    //                 this.updateItem(user, itemId, ranking)
    //             }, 5000);
    //         });
    //     } else {
    //         const insertionProgress = 15 / this.state.users.length
    //         this.setState({progressVal: this.state.progressVal + insertionProgress})
    //     }
    // }


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

export default Leaderboard;
