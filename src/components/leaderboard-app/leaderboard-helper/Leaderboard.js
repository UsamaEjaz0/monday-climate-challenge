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
                this.setState({progressVal: 20, currentAction: "Creating board..."})
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
            this.setState({success: false, currentAction: "Error in fetching data - Retrying in 60 seconds"});
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
                    this.setState({progressVal: 40, currentAction: "Created board..."})
                    this.setState({boardId: res.data.create_board.id}, this.getTopGroup);
                }).catch((res) => {
                this.setState({success: false, currentAction: "Error in creating board - Retrying in 60 seconds"});
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
                this.setState({progressVal: 50, currentAction: "Finding top group..."})
                this.deleteGroup(res.data.boards[0].top_group.id);
            }).catch((res) => {
            this.setState({success: false, currentAction: "Error in finding top group - Retrying in 60 seconds"});
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
                this.setState({progressVal: 60, currentAction: "Deleting top group..."})
                console.log(res);
                this.createGroupAndColumns();
            }).catch((res) => {
            this.setState({success: false, currentAction: "Error in deleting group - Retrying in 60 seconds"});
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
                this.setState({progressVal: 70, currentAction: "Creating group and columns..."})
                this.setState({groupId: res.data.create_group.id, column_ids: res.data}, () => {
                    Promise.all(this.state.users.map(async (user) => this.createItem(user))).then(()=>{
                        this.updateAllItems();
                    });
                });

            }).catch((res) => {
            this.setState({success: false, currentAction: "Error creating group & columns - Retrying in 60 seconds"});
            setTimeout(this.createGroupAndColumns, 60000);
        });
    }

    // saveBoard = () => {
    //
    // }
    updateAllItems = async () => {
        const userIds = this.state.users.map((user) => user.id.toString());
        const res = await findByIds(userIds);
        const users = res.data.documents;

        users.sort(function(a, b) {
            let x = a["points"]; let y = b["points"];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });

        console.log(users);
        users.map((user, index) => {this.updateItem(user, user.itemId, index+1)});



    }
    createItem = async (user) => {
        const query = `mutation {
                create_item (board_id: ${this.state.boardId}, group_id: "${this.state.groupId}", item_name: "-", 
                        column_values: "{ \\"person\\" : {\\"personsAndTeams\\":[{\\"id\\":${user.id},\\"kind\\":\\"person\\"}]} }" ) {
                            id
                }
        }`

        try{

            const res = await monday.api(query);
            const item = res.data.create_item.id;

            const updatedRes = await updateRecord({
                id: user.id.toString(),
                itemId: item.toString()
            })

            if (updatedRes.modifiedCount === 0){
                await updateRecord({
                    id: user.id.toString(),
                    cfp: -1,
                    itemId: item.toString(),
                    points: -1,
                })
            }
            // this.setState({item_ids: {...this.state.item_ids, [`${user.id}`] : item}})

            const insertionProgress = 15 / this.state.users.length
            this.setState({progressVal: this.state.progressVal + insertionProgress, currentAction: "Creating items..."})

        }catch (e){
            this.setState({success: false, currentAction: "Error creating item - Retrying in 60 seconds"});
            setTimeout(() => {this.createItem(user)}, 60000);
        }

    }

    updateItem = async (user, itemId, ranking) => {
        if (user != null) {
            const query = `
                    mutation {
                      change_multiple_column_values(item_id:${parseInt(itemId)}, board_id:${this.state.boardId}, column_values: "{\\"name\\" : \\"${ranking}\\", \\"eco_points\\" : \\"${user.points}\\", \\"carbon_emissions\\" : \\"${user.cfp}\\"}") {
                        id
                      }
                    }`
            monday.api(query)
                .then((res) => {
                    // eslint-disable-next-line no-unused-vars
                    const id = res.data.change_multiple_column_values.id
                    const insertionProgress = 30 / this.state.users.length
                    this.setState({progressVal: this.state.progressVal + insertionProgress, currentAction: "Inserting data..."},  console.log(this.state.progressVal))

                }).catch((res) => {
                this.setState({success: false, currentAction: "Error inserting data - Retrying in 60 seconds"});
                setTimeout(() => {
                    this.updateItem(user, itemId, ranking)
                }, 60000);
            });
        } else {
            const insertionProgress = 15 / this.state.users.length
            this.setState({progressVal: this.state.progressVal + insertionProgress})
        }
    }



    render() {
        return (
            <div className="leaderboard">
                <Box style={{minWidth: '50%'}} padding={Box.paddings.LARGE} border={Box.borders.DEFAULT} rounded={Box.roundeds.MEDIUM}
                     margin={Box.margins.LARGE}>
                    {this.state.loading ?  <Heading type={Heading.types.h2} value={this.state.currentAction}/>: <AttentionBox className="attention-box"
                        description="Danger"
                        onClose={function noRefCheck(){}}
                        text="You have not created a leaderboard. Please create a leaderboard and try again."
                        title="Leaderboard not found"
                    />}
                    {this.state.progressVal < 99.5 ?
                    <Flex>
                        {this.state.loading ?
                                <LinearProgressBar value={this.state.progressVal} size={LinearProgressBar.sizes.LARGE} barStyle={LinearProgressBar.styles.POSITIVE} />
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
