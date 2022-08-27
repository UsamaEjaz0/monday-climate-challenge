import React from "react";
import "./leaderboard.css";
import mondaySdk from "monday-sdk-js";
import {AttentionBox, Box, Button, Flex, LinearProgressBar, Toast} from "monday-ui-react-core";

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
            item_ids: [],
            boards: [],
            success: false,
            loading: false,
            progressVal: 0
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
        monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');
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
                this.setState({progressVal: 20})
                this.setState({boards: res.data.boards,  users: res.data.users}, () => {
                    console.log(this.state.boards);
                    const board = this.state.boards.find(board => board.name === "Green Board");
                    if (typeof board !== 'undefined'){
                        this.setState({boardId: board.id,}, this.createBoard)
                        console.log(`Board Exists with ID: ${board.id}`);


                    }
                    else{
                        console.log(`Board Doesn't exist}`);
                        this.setState({boardId: -1}, this.createBoard)
                    }

                })
            }).catch((res) => {
            setTimeout(this.syncBoardData, 60000);
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
                    console.log(res);
                    this.setState({progressVal: 40})
                    this.setState({boardId: res.data.create_board.id}, this.getTopGroup);
                }).catch((res) => {
                this.setState({success: false});
                setTimeout(this.createBoard, 60000);
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
                this.setState({progressVal: 50})
                this.deleteGroup(res.data.boards[0].top_group.id);
            }).catch((res) => {
            this.setState({success: false});
            setTimeout(this.getTopGroup, 60000);
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
                this.setState({progressVal: 60})
                console.log(res);
                this.createGroupAndColumns();
            }).catch((res) => {
            this.setState({success: false});
            setTimeout(this.deleteGroup, 60000);
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
                this.setState({progressVal: 70})
                this.setState({groupId: res.data.create_group.id, column_ids: res.data}, () => {
                    this.state.users.map((user) => {
                            this.createItem(user)
                    });
                });

            }).catch((res) => {
            this.setState({success: false});
            setTimeout(this.createGroupAndColumns, 60000);
        });
    }

    saveBoard = () => {

    }

    createItem = (user) => {
        const query = `mutation {
                create_item (board_id: ${this.state.boardId}, group_id: "${this.state.groupId}", item_name: "Ranking", 
                        column_values: "{ \\"${this.state.column_ids.person.id}\\" : {\\"personsAndTeams\\":[{\\"id\\":${user.id},\\"kind\\":\\"person\\"}]} }" ) {
                            id
                }
        }`
        monday.api(query)
            .then((res) => {
                const itemId = res.data.create_item.id
                this.state.users.map((u) => {
                    if (u.id === user.id) u.itemId = itemId
                })
                this.updateItem(user.id, itemId)
            }).catch((res) => {
            this.setState({success: false});

            setTimeout(() => {this.createItem(user)}, 60000);
        });
    }

    updateItem = (userId, itemId) => {
        const userData = this.getUserData(userId)
        if (typeof userData !== "undefined"){
            const query = `
                    mutation {
                      change_multiple_column_values(item_id:${parseInt(itemId)}, board_id:${this.state.boardId}, column_values: "{\\"name\\" : \\"Ranking will appear here\\", \\"${this.state.column_ids.eco_points.id}\\" : \\"${userData.ecoPoints}\\", \\"${this.state.column_ids.carbon_emissions.id}\\" : \\"${userData.carbonEmissions}\\"}") {
                        id
                      }
                    }`

            monday.api(query)
                .then((res) => {
                    const insertionProgress = 30/this.state.users.length
                    this.setState({progressVal: this.state.progressVal + insertionProgress})
                    console.log(res)
                }).catch((res) => {
                this.setState({success: false});
                setTimeout(() => {this.updateItem(userId, itemId)}, 60000);
            });
        }else{
            const insertionProgress = 30/this.state.users.length
            this.setState({progressVal: this.state.progressVal + insertionProgress})
        }

    }

    getUserData = (userId) => {
        const users =
            [
                {
                    id: 33386038,
                    name: "Usama",
                    ecoPoints: 200,
                    carbonEmissions: 300
                },
                {
                    id: 33387933,
                    name: "Mubashir Ahmed",
                    ecoPoints: 100,
                    carbonEmissions: 350
                }
            ]

        return users.find(user => user.id === userId)

    }

    render() {
        return (
            <div className="leaderboard">
                <Box style={{minWidth: '50%'}} padding={Box.paddings.LARGE} border={Box.borders.DEFAULT} rounded={Box.roundeds.MEDIUM}
                     margin={Box.margins.LARGE}>
                    <AttentionBox className="attention-box"
                        description="Danger"
                        onClose={function noRefCheck(){}}
                        text="You have not created a leaderboard. Please create a leaderboard and try again."
                        title="Leaderboard not found"
                    />
                    {this.state.progressVal < 99.5 ?
                    <Flex>
                        {this.state.loading ?

                         <LinearProgressBar
                            className="linear-progress-bar_small-wrapper"
                            size="large"
                            value={this.state.progressVal}
                        />: <Button onClick={this.syncBoardData} loading={this.state.loading}>
                                Create Board
                            </Button>}
                    </Flex>
                        : <Toast open type={Toast.types.POSITIVE}  autoHideDuration={5000} >
                            Board created successfully
                        </Toast>

                    }
                </Box>
            </div>
        );
    }

}

export default Leaderboard;
